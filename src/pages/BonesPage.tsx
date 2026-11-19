import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { BONES, type Bone } from '@/data/bones';
import { useBones } from '@/hooks/useProgress';

function requirements(bone: Bone) {
  return [bone.slayer && `${bone.slayer} Slayer`, bone.quest].filter(Boolean).join(' · ');
}

export function BonesPage() {
  const bones = useBones();
  const count = BONES.filter((bone) => bones.has(bone.name)).length;

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        The wish list
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Every bone the Odd Old Man is waiting for, A to Z. {count} of {BONES.length} in the sack so
        far. Ticks here and on the route are the same.
      </Typography>
      <Paper variant="outlined">
        <List>
          {BONES.map((bone) => {
            const needs = requirements(bone);
            return (
              <ListItem key={bone.name} disablePadding>
                <ListItemButton dense onClick={() => bones.toggle(bone.name)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={bones.has(bone.name)}
                      tabIndex={-1}
                      disableRipple
                      slotProps={{ input: { 'aria-label': bone.name } }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${bone.name} — ${bone.location}`}
                    secondary={needs || undefined}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </>
  );
}
