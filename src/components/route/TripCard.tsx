import type { ReactNode } from 'react';

import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { type Stop, type Trip, wikiUrl } from '@/data/bones';
import { itemLabel, shoppingItem } from '@/data/progress';
import { cardSx, colors, monoFont } from '@/theme';

interface Checked {
  has: (id: string) => boolean;
  toggle: (id: string) => void;
}

export interface TripCardProps {
  trip: Trip;
  index: number;
  open: boolean;
  onToggleOpen: () => void;
  isCurrent: boolean;
  next: string | null;
  bones: Checked;
  shopping: Checked;
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <Box
      component="span"
      sx={{ bgcolor: colors.fill, fontSize: 12, px: 1.25, py: 0.25, borderRadius: 999 }}
    >
      {children}
    </Box>
  );
}

function StopRow({
  stop,
  last,
  next,
  bones,
  shopping,
}: {
  stop: Stop;
  last: boolean;
  next: string | null;
  bones: Checked;
  shopping: Checked;
}) {
  const collected = stop.bone ? bones.has(stop.bone) : false;
  const title = stop.bone ?? 'Bank';

  return (
    <Box component="li" sx={{ display: 'flex', gap: 2, position: 'relative', pb: 2.5 }}>
      {/* The timeline rail between stops. */}
      {!last && (
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            left: 13,
            top: 30,
            bottom: 0,
            width: 2,
            bgcolor: colors.line,
          }}
        />
      )}
      {stop.bone ? (
        <Checkbox
          checked={collected}
          onChange={() => bones.toggle(stop.bone!)}
          slotProps={{ input: { 'aria-label': stop.bone } }}
          sx={{
            p: 0,
            alignSelf: 'flex-start',
            position: 'relative',
            zIndex: 1,
            '& svg': { fontSize: 28 },
          }}
        />
      ) : (
        <Box
          sx={{
            flex: 'none',
            width: 28,
            height: 28,
            borderRadius: 1.5,
            bgcolor: colors.fill,
            border: `1px solid ${colors.lineStrong}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <AccountBalanceOutlinedIcon sx={{ fontSize: 16, color: colors.boneSoft }} />
        </Box>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, minWidth: 0 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px 8px', alignItems: 'baseline' }}>
          <Typography
            component="span"
            sx={{
              fontWeight: 600,
              fontSize: 16,
              ...(collected
                ? { color: colors.muted, textDecoration: 'line-through' }
                : { color: stop.bone ? colors.bone : colors.boneSoft }),
            }}
          >
            {stop.bone ? (
              <Link
                href={wikiUrl(stop.bone)}
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                underline="hover"
                title={`${stop.bone} on the OSRS Wiki`}
              >
                {title}
              </Link>
            ) : (
              title
            )}
          </Typography>
          <Typography component="span" sx={{ color: colors.muted }}>
            {stop.location}
          </Typography>
          {stop.bone && stop.bone === next && (
            <Box
              component="span"
              sx={{
                bgcolor: colors.lavender,
                color: colors.onLavender,
                fontFamily: monoFont,
                fontSize: 11,
                px: 1,
                borderRadius: 1,
              }}
            >
              NEXT
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 0.75,
            alignItems: 'flex-start',
            color: colors.boneSoft,
            fontSize: 14,
          }}
        >
          <ArrowForwardIcon sx={{ fontSize: 14, mt: '4px', color: colors.lavender }} />
          <span>{stop.travel}</span>
        </Box>
        {stop.loads.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, alignItems: 'center', mt: 0.5 }}>
            <Typography
              component="span"
              sx={{ fontFamily: monoFont, fontSize: 11, color: colors.muted, mr: 0.25 }}
            >
              LOAD HERE
            </Typography>
            {stop.loads.map((name) => {
              const got = shopping.has(name);
              return (
                <Box
                  key={name}
                  component="label"
                  sx={{
                    display: 'inline-flex',
                    gap: 0.75,
                    alignItems: 'center',
                    fontSize: 12,
                    pl: 0.5,
                    pr: 1.25,
                    borderRadius: 999,
                    cursor: 'pointer',
                    border: `1px solid ${got ? colors.tintBorder : colors.lineStrong}`,
                    bgcolor: got ? colors.tint : colors.fill,
                    color: got ? colors.lavenderText : colors.bone,
                  }}
                >
                  <Checkbox
                    size="small"
                    checked={got}
                    onChange={() => shopping.toggle(name)}
                    sx={{ p: 0.25, '& svg': { fontSize: 16 } }}
                  />
                  {itemLabel(shoppingItem(name))}
                </Box>
              );
            })}
          </Box>
        )}
        {stop.notes.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 0.25 }}>
            {stop.notes.map((note) => (
              <Tag key={note}>{note}</Tag>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export function TripCard({
  trip,
  index,
  open,
  onToggleOpen,
  isCurrent,
  next,
  bones,
  shopping,
}: TripCardProps) {
  const names = trip.stops.flatMap((stop) => (stop.bone ? [stop.bone] : []));
  const got = names.filter(bones.has).length;
  const done = got === names.length;

  const badge = done
    ? { text: 'Done!', sx: { bgcolor: colors.lavender, color: colors.onLavender } }
    : isCurrent
      ? {
          text: `In progress · ${got} of ${names.length}`,
          sx: { bgcolor: colors.tint, color: colors.lavenderText },
        }
      : { text: `${names.length} bones`, sx: { bgcolor: colors.fill, color: colors.boneSoft } };

  return (
    <Paper
      component="section"
      id={`trip-${index + 1}`}
      aria-labelledby={`trip-${index + 1}-title`}
      sx={{
        ...cardSx,
        px: 3,
        py: 2.75,
        scrollMarginTop: 84,
        ...(isCurrent && { border: `2px solid ${colors.lavender}` }),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px 16px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          id={`trip-${index + 1}-title`}
          variant="h5"
          component="h2"
          sx={{ fontWeight: 700, fontSize: 22 }}
        >
          <Box
            component="span"
            sx={{ fontFamily: monoFont, fontWeight: 500, color: colors.lavender, mr: 1.25 }}
          >
            {String(index + 1).padStart(2, '0')}
          </Box>
          {trip.name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'center' }}>
          <Box
            component="span"
            sx={{ fontSize: 13, fontWeight: 600, px: 1.5, py: 0.5, borderRadius: 999, ...badge.sx }}
          >
            {badge.text}
          </Box>
          <Button
            size="small"
            variant="outlined"
            color="inherit"
            onClick={onToggleOpen}
            aria-expanded={open}
            aria-controls={`trip-${index + 1}-stops`}
            sx={{ borderColor: colors.lineStrong, textTransform: 'none' }}
          >
            {open ? 'Hide stops' : 'Show stops'}
          </Button>
        </Box>
      </Box>

      {open ? (
        <Box
          component="ol"
          id={`trip-${index + 1}-stops`}
          sx={{ listStyle: 'none', m: 0, mt: 2.5, p: 0 }}
        >
          {trip.stops.map((stop, i) => (
            <StopRow
              key={stop.bone ?? `bank-${stop.location}`}
              stop={stop}
              last={i === trip.stops.length - 1}
              next={next}
              bones={bones}
              shopping={shopping}
            />
          ))}
        </Box>
      ) : (
        <Typography sx={{ mt: 1.25, color: colors.muted, fontSize: 14 }}>
          {names.join(', ')}
          {done ? ' · all in the sack' : ''}
        </Typography>
      )}
    </Paper>
  );
}
