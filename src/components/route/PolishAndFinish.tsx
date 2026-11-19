import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { BONES } from '@/data/bones';
import { cardSx, colors, monoFont } from '@/theme';

const STEPS = ['Put vinegar in a pot', 'Add a bone', 'Boil it on a fire or range'];

/** The last step: polish every bone. Tap a bone once it's polished. */
export function PolishCard({
  has,
  toggle,
}: {
  has: (id: string) => boolean;
  toggle: (id: string) => void;
}) {
  const got = BONES.filter((bone) => has(bone.name)).length;

  return (
    <Paper
      component="section"
      id="polish"
      aria-labelledby="polish-title"
      sx={{ ...cardSx, p: 3, scrollMarginTop: 84 }}
    >
      <Typography
        sx={{
          fontFamily: monoFont,
          fontSize: 12,
          letterSpacing: '0.08em',
          color: colors.lavender,
          mb: 0.5,
        }}
      >
        LAST STEP
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px 16px',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography id="polish-title" variant="h5" component="h2" sx={{ fontWeight: 700 }}>
          Polish all {BONES.length}
        </Typography>
        <Typography sx={{ fontFamily: monoFont, fontSize: 13, color: colors.muted }}>
          {got} / {BONES.length} polished
        </Typography>
      </Box>

      <Box
        component="ol"
        sx={{ listStyle: 'none', m: 0, mb: 2, p: 0, display: 'flex', flexWrap: 'wrap', gap: 1.5 }}
      >
        {STEPS.map((step, i) => (
          <Box
            component="li"
            key={step}
            sx={{
              flex: '1 1 180px',
              display: 'flex',
              gap: 1.5,
              alignItems: 'center',
              bgcolor: colors.fill,
              borderRadius: 2.5,
              px: 2,
              py: 1.75,
            }}
          >
            <Box
              sx={{
                flex: 'none',
                width: 28,
                height: 28,
                borderRadius: '50%',
                bgcolor: colors.lavender,
                color: colors.onLavender,
                fontWeight: 700,
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {i + 1}
            </Box>
            <span>{step}</span>
          </Box>
        ))}
      </Box>
      <Typography sx={{ color: colors.boneSoft, fontSize: 14, mb: 2 }}>
        Repeat for all {BONES.length}. Vinegar comes from Fortunato, the wine merchant in Draynor.
        Tap each bone once it's polished:
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
        {BONES.map((bone) => {
          const done = has(bone.name);
          return (
            <ButtonBase
              key={bone.name}
              onClick={() => toggle(bone.name)}
              aria-pressed={done}
              sx={{
                minHeight: 32,
                px: 1.5,
                borderRadius: 999,
                fontSize: 13,
                ...(done
                  ? { bgcolor: colors.lavender, color: colors.onLavender, fontWeight: 600 }
                  : { border: `1px solid ${colors.lineStrong}`, color: colors.bone }),
              }}
            >
              {bone.name}
            </ButtonBase>
          );
        })}
      </Box>
    </Paper>
  );
}

export function FinishCard({ collected, polished }: { collected: number; polished: number }) {
  const total = BONES.length;
  const allDone = collected === total && polished === total;

  return (
    <Paper
      component="section"
      id="finish"
      aria-labelledby="finish-title"
      sx={{ ...cardSx, border: `2px dashed ${colors.tintBorder}`, p: 3.5, scrollMarginTop: 84 }}
    >
      <Typography
        sx={{
          fontFamily: monoFont,
          fontSize: 12,
          letterSpacing: '0.08em',
          color: colors.lavender,
          mb: 1,
        }}
      >
        THE FINISH LINE
      </Typography>
      <Typography id="finish-title" variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
        Back to the Odd Old Man
      </Typography>
      <Typography sx={{ color: colors.boneSoft, maxWidth: 620 }}>
        Bring all {total} polished bones to his house in Silvarea, north-east of Varrock. The
        displays are going to be fantastic!
      </Typography>
      <Typography
        sx={{ mt: 1.5, fontWeight: 600, color: allDone ? colors.lavender : colors.muted }}
      >
        {allDone
          ? `Every last one! All ${total} collected and polished.`
          : `${total - collected} to collect · ${total - polished} to polish`}
      </Typography>
    </Paper>
  );
}
