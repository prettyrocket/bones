import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { SHOPPING } from '@/data/bones';
import { useShopping } from '@/hooks/useProgress';

export function ShoppingPage() {
  const got = useShopping();
  const count = SHOPPING.filter((entry) => got.has(entry.item)).length;

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping list
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Everything you need to fetch and polish all 30 bones in one happy sweep. {count} of{' '}
        {SHOPPING.length} items ready.
      </Typography>
      <Paper variant="outlined">
        <List>
          {SHOPPING.map((entry) => (
            <ListItem key={entry.item} disablePadding>
              <ListItemButton dense onClick={() => got.toggle(entry.item)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={got.has(entry.item)}
                    tabIndex={-1}
                    disableRipple
                    slotProps={{ input: { 'aria-label': entry.item } }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`${entry.item} (${entry.qty})`}
                  secondary={`${entry.neededFor} · Load at: ${entry.loadAt} · Get from: ${entry.source}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
}
