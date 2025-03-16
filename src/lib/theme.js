import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FEAA4B",
      light: "#FEAA4B",
      dark: "#FEAA4B",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#E0E0E0",
      light: "#E0E0E0",
      dark: "#E0E0E0",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFE590",
    },
  },
  typography: {
    fontFamily: "'Jersey 25', sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "'Jersey 25', sans-serif",
          backgroundColor: "#FFE590",
          padding: "30px",
        },
      },
    },
  },
});

export default theme;