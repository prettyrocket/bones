import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { BONES, ROUTE, type Stop } from '@/data/bones';
import { useBones } from '@/hooks/useProgress';

function stopDetails(stop: Stop) {
  return [stop.travel, stop.notes].filter(Boolean).join(' · ');
}

export function RoutePage() {
  const bones = useBones();
  const count = BONES.filter((bone) => bones.has(bone.name)).length;

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Just a few more bones!
      </Typography>
      <Typography sx={{ mb: 2 }}>
        The Odd Old Man’s displays are good, but with every bone on his wish list they’ll be
        fantastic. That’s all {BONES.length} of them, each one nicely polished. Here’s the whole lot
        in {ROUTE.length} tidy trips, with bank stops along the way. It should take no time at all!
      </Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Polishing:</strong> put vinegar in a pot, add the bone, and boil it on a fire or
        range. The Odd Old Man buys his vinegar from Fortunato, the wine merchant in Draynor.
      </Alert>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          {count} of {BONES.length} bones collected
          {count === BONES.length
            ? '. Every last one! The displays are going to be fantastic.'
            : count > 0
              ? `. Only ${BONES.length - count} to go!`
              : ''}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={(count / BONES.length) * 100}
          aria-label="Bones collected"
        />
      </Box>

      <Stack spacing={2}>
        {ROUTE.map((trip, index) => (
          <Card key={trip.name} variant="outlined">
            <CardContent sx={{ pb: 0 }}>
              <Typography variant="h6" component="h2">
                {index + 1}. {trip.name}
              </Typography>
            </CardContent>
            <List>
              {trip.stops.map((stop) =>
                stop.bone ? (
                  <ListItem key={stop.bone} disablePadding>
                    <ListItemButton dense onClick={() => bones.toggle(stop.bone!)}>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={bones.has(stop.bone)}
                          tabIndex={-1}
                          disableRipple
                          slotProps={{ input: { 'aria-label': stop.bone } }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${stop.bone} — ${stop.location}`}
                        secondary={stopDetails(stop)}
                      />
                    </ListItemButton>
                  </ListItem>
                ) : (
                  <ListItem key={stop.location} dense>
                    <ListItemIcon>
                      <AccountBalanceIcon color="action" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Bank: ${stop.location}`}
                      secondary={stopDetails(stop)}
                    />
                  </ListItem>
                ),
              )}
            </List>
          </Card>
        ))}
      </Stack>
    </>
  );
}
