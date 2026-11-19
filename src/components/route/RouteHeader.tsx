import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

import { EGG_BONES } from '@/components/SillyBonesack';
import { BONES } from '@/data/bones';
import { colors } from '@/theme';

const HELM = `${import.meta.env.BASE_URL}images/ram-skull-helm-detail.png`;
const ease = 'all 220ms ease';

/**
 * Big header at the top that shrinks to a one-line bar once you scroll, sticking
 * to the top. Its height is fixed in both states and the margin below grows by
 * exactly what it loses, so shrinking never moves the page (no flicker, and
 * jump links still land in the right place).
 */
export function RouteHeader({ compact, collected }: { compact: boolean; collected: number }) {
  return (
    <Box
      component="div"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2.5,
        boxSizing: 'border-box',
        overflow: 'hidden',
        mt: '-14px',
        bgcolor: colors.glass,
        backdropFilter: 'blur(8px)',
        transition: ease,
        borderBottom: '1px solid',
        ...(compact
          ? {
              height: 60,
              mb: '50px',
              py: 1,
              borderColor: colors.line,
              boxShadow: '0 6px 12px -10px rgba(0, 0, 0, 0.55)',
              // Keep the bone count clear of the pinned bonesack once it shows up.
              ...(collected >= EGG_BONES && { pr: { md: 7 } }),
            }
          : { height: 120, mb: '-10px', py: 1.75, borderColor: 'transparent' }),
      }}
    >
      <Box
        component="img"
        src={HELM}
        alt="Ram skull helm"
        sx={{
          display: 'block',
          flex: 'none',
          width: 'auto',
          transition: ease,
          height: compact ? { xs: 30, md: 40 } : { xs: 56, md: 90 },
        }}
      />
      <Box
        sx={{
          flex: '1 1 auto',
          minWidth: 0,
          display: 'flex',
          ...(compact
            ? { flexDirection: 'row', alignItems: 'center', gap: 2.5 }
            : { flexDirection: 'column', gap: 1.75 }),
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            m: 0,
            lineHeight: 1.1,
            fontWeight: 700,
            transition: ease,
            whiteSpace: compact ? 'nowrap' : { xs: 'normal', md: 'nowrap' },
            fontSize: compact ? { xs: 20, md: 24 } : { xs: 30, md: 44 },
          }}
        >
          {/* Cheerful at the top; a little weary once you're scrolling through the trips. */}
          Just a few more bones{compact ? '...' : '!'}
        </Typography>
        <Box
          sx={{
            display: compact ? { xs: 'none', md: 'flex' } : 'flex',
            alignItems: 'center',
            gap: 2,
            flex: '1 1 auto',
            minWidth: 0,
          }}
        >
          <LinearProgress
            variant="determinate"
            value={(collected / BONES.length) * 100}
            aria-label="Bones collected"
            sx={{ flex: '1 1 120px', height: 10, borderRadius: 5, bgcolor: colors.track }}
          />
          <Typography sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
            {collected} of {BONES.length} bones
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
