import type { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

import { BONES, SHOPPING } from '@/data/bones';
import { useBones, useShopping } from '@/hooks/useProgress';

interface CheckItem {
  id: string;
  primary: string;
  secondary?: string;
}

function CheckList({
  items,
  checked,
  wrap = false,
  sx,
}: {
  items: CheckItem[];
  checked: ReturnType<typeof useBones>;
  /**
   * Short items (like bone names) run down the box and wrap into the next column
   * when they reach its bottom, so the first column fills before the second
   * starts. Only side by side, where the box has a fixed height; stacked on
   * phones it's one long column.
   */
  wrap?: boolean;
  sx?: SxProps<Theme>;
}) {
  return (
    <Paper
      variant="outlined"
      sx={[...(Array.isArray(sx) ? sx : [sx]), wrap && { overflowX: { md: 'auto' } }]}
    >
      <List
        dense
        disablePadding
        sx={
          wrap
            ? {
                display: { md: 'flex' },
                flexDirection: 'column',
                flexWrap: 'wrap',
                alignContent: 'flex-start',
                height: { md: '100%' },
              }
            : undefined
        }
      >
        {items.map((item) => (
          <ListItem key={item.id} disablePadding sx={wrap ? { width: { md: 200 } } : undefined}>
            {/* Tighter rows: small checkbox with little padding, no extra row gap. */}
            <ListItemButton dense onClick={() => checked.toggle(item.id)} sx={{ py: 0, px: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Checkbox
                  edge="start"
                  size="small"
                  checked={checked.has(item.id)}
                  tabIndex={-1}
                  disableRipple
                  sx={{ py: 0.5 }}
                  slotProps={{ input: { 'aria-label': item.id } }}
                />
              </ListItemIcon>
              <ListItemText primary={item.primary} secondary={item.secondary} sx={{ my: 0.25 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

const shoppingItems: CheckItem[] = SHOPPING.map((entry) => ({
  id: entry.item,
  // A count of 1 goes without saying, so only larger amounts get a prefix.
  primary: entry.qty && entry.qty !== '1' ? `${entry.qty}x ${entry.item}` : entry.item,
}));

const boneItems: CheckItem[] = BONES.map((bone) => ({
  id: bone.name,
  primary: bone.name,
}));

/** Side by side, a list's box takes the rest of its column and scrolls if needed. */
const fillAndScroll: SxProps<Theme> = { flex: { md: 1 }, minHeight: 0, overflowY: { md: 'auto' } };

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box component="section" sx={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

export function ChecklistPage() {
  const got = useShopping();
  const bones = useBones();

  return (
    <>
      {/* Side by side from the md breakpoint up, the lists fill the screen's height
          and each scrolls inside its box only if it doesn't fit. The height is the
          viewport minus the app bar (64px at md) and the layout's top and bottom
          padding (32px each). Stacked on phones, they're normal full-length lists.
          The bone names are short, so they wrap into columns. */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          height: { md: 'calc(100dvh - 128px)' },
          minHeight: { md: 240 },
          columnGap: 3,
          rowGap: 4,
        }}
      >
        <Section title="Shopping list">
          <CheckList items={shoppingItems} checked={got} sx={fillAndScroll} />
        </Section>
        <Section title="Bone list">
          <CheckList items={boneItems} checked={bones} wrap sx={fillAndScroll} />
        </Section>
      </Box>
    </>
  );
}
