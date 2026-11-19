import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { keyframes } from '@mui/material/styles';

import { BONES } from '@/data/bones';
import { useBones } from '@/hooks/useProgress';

const BONESACK = `${import.meta.env.BASE_URL}images/bonesack.png`;

/** What the old `::bank` "cheat" made you shout overhead. */
export const SILLY_LINE = 'Hey, everyone, I just tried to do something very silly!';

/** The line's words, each with the index of its first letter in the whole line. */
const WORDS = SILLY_LINE.split(' ').map((word, i, words) => ({
  word,
  start: words.slice(0, i).join(' ').length + (i > 0 ? 1 : 0),
}));

/** How long the overhead text stays up, like chat above a player's head. */
const SHOW_MS = 4000;

// The game's `wave:` effect bobs each letter on a sine wave, a little behind the
// one before it. The client advances 50 cycles a second and moves the phase 1/5
// radian per cycle, so a full wave is 2π/10 ≈ 0.63s. Neighbouring letters are
// half a radian apart, which is 0.05s of that.
const WAVE_PERIOD_S = 0.63;
const LETTER_LAG_S = 0.05;

const visuallyHidden = {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
} as const;

const bob = keyframes`
  from { transform: translateY(-0.2em); }
  to { transform: translateY(0.2em); }
`;

/** Bones you need ticked before the bonesack shows up. */
export const EGG_BONES = 2;

/**
 * Easter egg: once two bones are ticked, the regular bonesack shows up in the
 * top-right corner. Clicking it makes you say something silly, in wavy yellow
 * overhead chat.
 */
export function SillyBonesack() {
  const bones = useBones();
  // Bumped on each click so a second click restarts the text and its timer.
  const [shownAt, setShownAt] = useState<number | null>(null);

  useEffect(() => {
    if (shownAt === null) return;
    const timer = setTimeout(() => setShownAt(null), SHOW_MS);
    return () => clearTimeout(timer);
  }, [shownAt]);

  if (BONES.filter((bone) => bones.has(bone.name)).length < EGG_BONES) return null;

  return (
    // Pinned to the window's top-right, so it stays put when the app bar scrolls
    // away. It starts out lined up with the app bar's toolbar (56px tall on
    // phones, 64px from sm, with 16/24px side gutters), and sits above the Route
    // page's sticky header (z-index 2).
    <Box
      sx={{
        position: 'fixed',
        top: { xs: 6, sm: 10 },
        right: { xs: 16, sm: 24 },
        zIndex: 3,
      }}
    >
      {/* No hover circle or ripple, so it reads as the sack itself; keyboard focus still shows. */}
      <IconButton
        aria-label="Bonesack"
        onClick={() => setShownAt(Date.now())}
        disableRipple
        sx={{
          p: 0.5,
          '&:hover': { bgcolor: 'transparent' },
          '&.Mui-focusVisible': { outline: '2px solid currentColor' },
        }}
      >
        <Box
          component="img"
          src={BONESACK}
          alt=""
          sx={{ height: 36, width: 'auto', display: 'block', imageRendering: 'pixelated' }}
        />
      </IconButton>
      <Box
        role="status"
        sx={{
          position: 'absolute',
          top: '100%',
          right: 0,
          mt: 1,
          zIndex: 10,
          pointerEvents: 'none',
          // One line where it fits; on phones it wraps to stay on screen.
          width: { xs: 'calc(100vw - 32px)', sm: 'max-content' },
          textAlign: 'right',
          fontFamily: '"Pixelify Sans", monospace',
          fontWeight: 700,
          fontSize: { xs: 16, sm: 20 },
          // Overhead chat: pure yellow with a hard black drop shadow.
          color: '#ffff00',
          textShadow: '2px 2px 0 #000',
        }}
      >
        {shownAt !== null && (
          <span key={shownAt}>
            {/* Screen readers get the line whole; the wavy letters are for show. */}
            <Box component="span" sx={visuallyHidden}>
              {SILLY_LINE}
            </Box>
            {/* Each word stays whole, so on phones the line only breaks between words. */}
            {WORDS.map(({ word, start }) => (
              <span key={start} aria-hidden="true">
                {start > 0 && ' '}
                <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
                  {Array.from(word, (char, j) => (
                    <Box
                      key={j}
                      component="span"
                      sx={{
                        display: 'inline-block',
                        animation: `${bob} ${WAVE_PERIOD_S / 2}s ease-in-out infinite alternate`,
                        animationDelay: `${-(start + j) * LETTER_LAG_S}s`,
                        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
                      }}
                    >
                      {char}
                    </Box>
                  ))}
                </Box>
              </span>
            ))}
          </span>
        )}
      </Box>
    </Box>
  );
}
