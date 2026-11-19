import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { NavLink, Outlet } from 'react-router';

import { navItems } from '@/routes';
import { colors } from '@/theme';

const BONESACK = `${import.meta.env.BASE_URL}images/heavy-bonesack-detail.png`;

export function RootLayout() {
  return (
    <>
      {/* The heavy bonesack, huge and cropped by the lower-right corner, fixed behind the page. */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage: `url(${BONESACK})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: { xs: 'auto 95vh', md: 'auto 135vh' },
          backgroundPosition: {
            xs: 'right -30vw bottom -18vh',
            md: 'right -22vh bottom -38vh',
          },
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Static, so the Route page's own header can stick to the very top. */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: 'rgba(18, 15, 22, 0.72)',
            color: colors.bone,
            borderBottom: `1px solid ${colors.line}`,
            backdropFilter: 'blur(8px)',
          }}
        >
          <Toolbar sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Typography
              variant="h6"
              component="span"
              sx={{ mr: 2, fontWeight: 700, display: { xs: 'none', sm: 'block' } }}
            >
              {import.meta.env.VITE_APP_TITLE}
            </Typography>
            <Stack component="nav" direction="row" spacing={1} sx={{ flexGrow: 1 }}>
              {navItems.map(({ to, label }) => (
                <Button
                  key={to}
                  component={NavLink}
                  to={to}
                  end
                  color="inherit"
                  sx={{ '&.active': { bgcolor: 'rgba(185, 167, 224, 0.22)' } }}
                >
                  {label}
                </Button>
              ))}
            </Stack>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </>
  );
}
