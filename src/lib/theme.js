import { createTheme } from "@mui/material";

/** @type {import("@mui/material").ThemeOptions} */
const theme = {
  typography: {
    fontFamily: ['"Jersey 25"', "sans-serif"].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: ['"Jersey 25"', "sans-serif"].join(","),
          backgroundColor: "#FFE590",
          lineHeight: 1.25,
        },
      },
    },
  },
};

export default createTheme(theme);
