import Typography from '@mui/material/Typography';

export function AboutPage() {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        About
      </Typography>
      <Typography sx={{ mb: 2 }}>
        A route for collecting every bone on the Odd Old Man’s wish list in the Old School RuneScape
        quest Rag and Bone Man III. It’s for players who already meet the requirements. Your ticks
        are saved in this browser only.
      </Typography>
      <Typography>
        Bone locations draw on the OSRS Wiki. The quest came out on 18 November 2026, so details may
        still change.
      </Typography>
    </>
  );
}
