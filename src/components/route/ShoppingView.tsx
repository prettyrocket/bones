import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { SHOPPING } from '@/data/bones';
import { EVERY_BANK, SHOPPING_GROUPS, itemLabel } from '@/data/progress';
import { cardSx, colors, monoFont } from '@/theme';

export function ShoppingView({
  has,
  toggle,
}: {
  has: (id: string) => boolean;
  toggle: (id: string) => void;
}) {
  const got = SHOPPING.filter((item) => has(item.item)).length;

  return (
    <Paper component="section" aria-labelledby="shop-title" sx={{ ...cardSx, p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px 16px',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          mb: 2.5,
        }}
      >
        <Typography id="shop-title" variant="h5" component="h2" sx={{ fontWeight: 700 }}>
          Shopping list
        </Typography>
        <Typography sx={{ fontFamily: monoFont, fontSize: 13, color: colors.muted }}>
          {got} / {SHOPPING.length} ready
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '20px 28px',
        }}
      >
        {SHOPPING_GROUPS.map((group) => {
          const groupGot = group.items.filter((item) => has(item.item)).length;
          const packed = groupGot === group.items.length;
          return (
            <Box
              key={group.title}
              sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, minWidth: 0 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 1,
                  alignItems: 'baseline',
                  borderBottom: `1px solid ${colors.line}`,
                  pb: 0.75,
                  mb: 0.5,
                }}
              >
                <Typography component="h3" sx={{ fontWeight: 600, fontSize: 14 }}>
                  {group.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: packed ? colors.lavender : colors.muted,
                  }}
                >
                  {packed ? 'Packed!' : `${groupGot}/${group.items.length}`}
                </Typography>
              </Box>
              {group.items.map((item) => {
                const checked = has(item.item);
                return (
                  <Box
                    key={item.item}
                    component="label"
                    sx={{
                      display: 'flex',
                      gap: 1,
                      alignItems: 'flex-start',
                      fontSize: 14,
                      cursor: 'pointer',
                    }}
                  >
                    <Checkbox
                      size="small"
                      checked={checked}
                      onChange={() => toggle(item.item)}
                      sx={{ p: 0.25 }}
                    />
                    <Box
                      component="span"
                      sx={{
                        pt: '2px',
                        ...(checked && { color: colors.muted, textDecoration: 'line-through' }),
                      }}
                    >
                      {itemLabel(item)}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>

      <Box
        role="note"
        sx={{
          mt: 3,
          display: 'flex',
          gap: 1.5,
          alignItems: 'flex-start',
          bgcolor: colors.tint,
          border: `1px solid ${colors.tintBorder}`,
          borderRadius: 2.5,
          px: 2,
          py: 1.75,
        }}
      >
        <LightbulbOutlinedIcon sx={{ fontSize: 20, color: colors.lavender, mt: '1px' }} />
        <Typography sx={{ fontSize: 14 }}>
          <Box component="strong" sx={{ color: colors.lavenderText }}>
            Tip:
          </Box>{' '}
          bring {EVERY_BANK.map((item) => item.item.toLowerCase()).join(', ')} on every trip, and
          top up at each bank along the way.
        </Typography>
      </Box>
    </Paper>
  );
}
