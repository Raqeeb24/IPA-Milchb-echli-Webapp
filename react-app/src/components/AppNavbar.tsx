import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";

const AppNavbar = () => {


  return (
    <AppBar position="static" color="primary" sx={{p: 1}}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Linker Bereich – Logo oder Titel */}
          <Typography
            variant="h6"
          >
            Milchbüechli
          </Typography>

          {/* Rechter Bereich – Menütexte */}
          <Box sx={{ display: 'flex', gap: 4, ml: 'auto' }}>
            <Typography
              variant="body1"
              sx={{ color: 'white', cursor: 'pointer' }}
              onClick={() => console.log("Buchungen clicked")}
            >
              Buchungen
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'white', cursor: 'pointer' }}
              onClick={() => console.log("Berichte clicked")}
            >
              Berichte
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppNavbar;