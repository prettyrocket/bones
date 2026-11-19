import type { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { Link as RouterLink } from 'react-router';

import { BONES, ROUTE } from '@/data/bones';
import { cardSx, colors } from '@/theme';

const WIKI_URL = 'https://oldschool.runescape.wiki/';

function ModeCard({
  title,
  to,
  action,
  children,
}: {
  title: string;
  to: string;
  action: string;
  children: ReactNode;
}) {
  return (
    <Box
      component="section"
      aria-label={title}
      sx={{ ...cardSx, p: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}
    >
      <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      <Box sx={{ color: colors.boneSoft, flexGrow: 1, '& p': { m: 0, mb: 1.25 } }}>{children}</Box>
      <Box>
        <Button component={RouterLink} to={to} variant="outlined">
          {action}
        </Button>
      </Box>
    </Box>
  );
}

export function AboutPage() {
  return (
    <Box sx={{ maxWidth: 900, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          About
        </Typography>
        <Typography sx={{ color: colors.boneSoft, fontSize: 17 }}>
          A helper for collecting all {BONES.length} bones on the Odd Old Man’s wish list in the Old
          School RuneScape quest Rag and Bone Man III. It’s for players who already meet the quest’s
          requirements and just want to get the bones in as few trips as possible. There are two
          ways to use it.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 3,
        }}
      >
        <ModeCard title="Guided" to="/" action="Open the guided route">
          <p>
            The full route in {ROUTE.length} trips. Each trip says where to go, what to bring and
            which bones you’ll pick up, and the next bone you need is highlighted as you go.
          </p>
          <p>
            Start with the shopping list, work down the trips, then polish all {BONES.length} bones
            at the end. The sidebar shows your progress and jumps to any trip.
          </p>
        </ModeCard>
        <ModeCard title="Unguided" to="/checklist" action="Open the checklist">
          <p>
            Just the two lists: everything to buy or bring, and the bones from A to Z. No route, no
            order.
          </p>
          <p>
            Handy if you already know where things are, are picking up where you left off, or want
            to plan your own trips.
          </p>
        </ModeCard>
      </Box>

      <Box sx={{ ...cardSx, p: 3 }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
          Good to know
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2.5, color: colors.boneSoft, '& li': { mb: 0.75 } }}>
          <li>No quest spoilers. It only covers where the bones are and what to bring.</li>
          <li>
            Guided and Unguided share the same ticks, so you can switch between them at any time.
          </li>
          <li>
            Your ticks are saved in this browser only. Clearing site data or using another device
            starts you fresh.
          </li>
          <li>The quest came out on 18 November 2026, so some details may still change.</li>
        </Box>
      </Box>

      <Typography sx={{ color: colors.muted, fontSize: 14 }}>
        Bone locations draw on the{' '}
        <Link href={WIKI_URL} target="_blank" rel="noopener noreferrer">
          Old School RuneScape Wiki
        </Link>
        . Item images are © Jagex, via the wiki.
      </Typography>
    </Box>
  );
}
