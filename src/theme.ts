import { createTheme } from '@mui/material/styles';

// Dark "bonesack" look: near-black ground with the heavy bonesack behind
// everything (see RootLayout), translucent plum cards floating over it, bone
// text and a lavender accent taken from the sack.
export const colors = {
  ground: '#121016',
  card: 'rgba(30, 25, 37, 0.84)',
  glass: 'rgba(18, 15, 22, 0.82)',
  bone: '#ece8e1',
  boneSoft: '#cbc4b9',
  muted: '#a8a093',
  lavender: '#b9a7e0',
  lavenderText: '#ddd2f7',
  onLavender: '#17131c',
  tint: 'rgba(185, 167, 224, 0.14)',
  tintBorder: 'rgba(185, 167, 224, 0.38)',
  line: 'rgba(255, 255, 255, 0.10)',
  lineStrong: 'rgba(255, 255, 255, 0.22)',
  fill: 'rgba(255, 255, 255, 0.06)',
  track: 'rgba(255, 255, 255, 0.12)',
};

export const monoFont = '"IBM Plex Mono", ui-monospace, monospace';

/** Floating card: translucent, lightly blurred, with a deep soft shadow. */
export const cardSx = {
  bgcolor: colors.card,
  border: `1px solid ${colors.line}`,
  borderRadius: 3,
  boxShadow: '0 14px 36px rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(6px)',
} as const;

export const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
    primary: { main: colors.lavender, contrastText: colors.onLavender },
    background: { default: colors.ground, paper: colors.card },
    text: { primary: colors.bone, secondary: colors.muted },
    divider: colors.line,
  },
  typography: {
    fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        // Dark-mode Paper normally gets a white overlay; these cards are translucent instead.
        root: { backgroundImage: 'none', backdropFilter: 'blur(6px)' },
        outlined: { borderColor: colors.line },
      },
    },
  },
});
