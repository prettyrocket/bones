import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { ROUTE } from '@/data/bones';
import { tripBones } from '@/data/progress';
import { cardSx, colors, monoFont } from '@/theme';

export interface SidebarProps {
  view: 'trips' | 'shop';
  current: number;
  has: (bone: string) => boolean;
  shopping: { got: number; total: number };
  polished: { got: number; total: number };
  onShop: () => void;
  onGo: (sectionId: string) => void;
}

function Bar({ value }: { value: number }) {
  return (
    <Box sx={{ height: 4, bgcolor: colors.track, borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ height: '100%', width: `${value * 100}%`, bgcolor: colors.lavender }} />
    </Box>
  );
}

function Row({
  label,
  count,
  value,
  active,
  muted,
  onClick,
}: {
  label: string;
  count: string;
  value: number;
  active?: boolean;
  muted?: boolean;
  onClick: () => void;
}) {
  return (
    <ButtonBase
      onClick={onClick}
      aria-current={active ? 'true' : undefined}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 0.75,
        px: 1.5,
        py: 1.1,
        borderRadius: 2,
        textAlign: 'left',
        bgcolor: active ? colors.tint : 'transparent',
        '&:hover': { bgcolor: active ? colors.tint : colors.fill },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: active ? 700 : 500,
            color: active ? colors.lavenderText : muted ? colors.muted : colors.bone,
          }}
        >
          {label}
        </Typography>
        <Typography sx={{ fontFamily: monoFont, fontSize: 12, color: colors.muted }}>
          {count}
        </Typography>
      </Box>
      <Bar value={value} />
    </ButtonBase>
  );
}

function Chip({
  label,
  active,
  done,
  onClick,
}: {
  label: string;
  active?: boolean;
  done?: boolean;
  onClick: () => void;
}) {
  return (
    <ButtonBase
      onClick={onClick}
      aria-current={active ? 'true' : undefined}
      sx={{
        flex: 'none',
        minHeight: 40,
        px: 1.75,
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        ...(active
          ? { bgcolor: colors.lavender, color: colors.onLavender }
          : done
            ? { bgcolor: colors.tint, color: colors.lavenderText }
            : { border: `1px solid ${colors.lineStrong}`, color: colors.bone }),
      }}
    >
      {label}
    </ButtonBase>
  );
}

/** Desktop: a sticky card that fits the screen. Phone: a row of chips you swipe sideways. */
export function RouteSidebar({
  view,
  current,
  has,
  shopping,
  polished,
  onShop,
  onGo,
}: SidebarProps) {
  const trips = ROUTE.map((trip, i) => {
    const bones = tripBones(i);
    const got = bones.filter(has).length;
    return { id: `trip-${i + 1}`, label: `${i + 1}. ${trip.name}`, got, total: bones.length };
  });

  return (
    <Box component="aside" aria-label="Route overview" sx={{ flex: '1 1 260px', minWidth: 0 }}>
      <Paper
        component="nav"
        aria-label="Jump to"
        sx={{
          ...cardSx,
          display: { xs: 'none', md: 'block' },
          position: 'sticky',
          top: 16,
          maxHeight: 'calc(100vh - 32px)',
          overflowY: 'auto',
          p: 1.5,
        }}
      >
        <Row
          label="Shopping list"
          count={`${shopping.got}/${shopping.total}`}
          value={shopping.got / shopping.total}
          active={view === 'shop'}
          onClick={onShop}
        />
        {trips.map((trip, i) => (
          <Row
            key={trip.id}
            label={trip.label}
            count={`${trip.got}/${trip.total}`}
            value={trip.got / trip.total}
            active={view === 'trips' && i === current}
            muted={trip.got === trip.total}
            onClick={() => onGo(trip.id)}
          />
        ))}
        <Box sx={{ mt: 1 }}>
          <Row
            label="Polish all 30"
            count={`${polished.got}/${polished.total}`}
            value={polished.got / polished.total}
            onClick={() => onGo('polish')}
          />
        </Box>
        <ButtonBase
          onClick={() => onGo('finish')}
          sx={{ width: '100%', justifyContent: 'flex-start', px: 1.5, py: 1.25, borderRadius: 2 }}
        >
          <Typography sx={{ fontSize: 14, color: colors.muted }}>
            Back to the Odd Old Man
          </Typography>
        </ButtonBase>
      </Paper>

      <Box
        component="nav"
        aria-label="Trips"
        sx={{ display: { xs: 'flex', md: 'none' }, gap: 1, overflowX: 'auto', pb: 0.5 }}
      >
        <Chip
          label={`Shopping ${shopping.got}/${shopping.total}`}
          active={view === 'shop'}
          onClick={onShop}
        />
        {trips.map((trip, i) => (
          <Chip
            key={trip.id}
            label={`${i + 1} · ${ROUTE[i].name}`}
            active={view === 'trips' && i === current}
            done={trip.got === trip.total}
            onClick={() => onGo(trip.id)}
          />
        ))}
        <Chip label={`Polish ${polished.got}/${polished.total}`} onClick={() => onGo('polish')} />
      </Box>
    </Box>
  );
}
