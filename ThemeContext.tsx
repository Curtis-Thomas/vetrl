// ThemeContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { Urbanist } from "next/font/google";

// https://fonts.google.com/specimen/Urbanist
// Load the Urbanist font
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

   {/* <Box sx={{minHeight:"100vh", p:5}}>
  <Typography>Test Box</Typography>

  <Typography variant="h1">H1 - Vetrl - Testing text</Typography>
  <Typography variant="h2">H2 - Vetrl - Testing text</Typography>
  <Typography variant="h3">H3 - Vetrl - Testing text</Typography>
  <Typography variant="h4">H4 - Vetrl - Testing text</Typography>
  <Typography variant="h5">H5 - Vetrl - Testing text</Typography>
  <Typography variant="h6">H6 - Vetrl - Testing text</Typography>
  <Typography variant="subtitle1">subtitle1 - Vetrl - Testing text</Typography>
  <Typography variant="subtitle2">subtitle2 - Vetrl - Testing text</Typography>
  <Typography variant="body1">body1 - Vetrl - Testing text</Typography>
  <Typography variant="body2">body2 - Vetrl - Testing text</Typography>
  <Typography variant="caption">caption - Vetrl - Testing text</Typography>
  <Typography variant="overline">overline - Vetrl - Testing text</Typography>





</Box> */}

const defaultTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#3F769D",
    },
    text: {
      primary: "#2D2B42",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: `${urbanist.style.fontFamily}, sans-serif`,
    h1: {
      fontFamily: `${urbanist.style.fontFamily}, sans-serif`,
            fontWeight: 500,
      fontSize: "1.1em",
    },
    h2: {
      fontFamily: `${urbanist.style.fontFamily}, sans-serif`,
            fontWeight: 500,
      fontSize: "1.1em",
    },
    h3: {
      fontFamily: `${urbanist.style.fontFamily}, sans-serif`,
            fontWeight: 500,
      fontSize: "1.1em",
    },
    h4: {
      fontFamily: `${urbanist.style.fontFamily}, sans-serif`,
            fontWeight: 500,
      fontSize: "1.1em",
    },
    h5: {
      fontFamily: `${urbanist.style.fontFamily}, sans-serif`,
            fontWeight: 900,
      fontSize: "1em",
    },
    h6: {
      fontFamily: `${urbanist.style.fontFamily}, sans-serif`,
            fontWeight: 900,
      fontSize: "1em",
    },
    subtitle1: {
      fontFamily: `${urbanist.style.fontFamily}, sans-serif`,
            fontWeight: 500,
      fontSize: "1em",
    },
    subtitle2: {
      fontFamily: `${urbanist.style.fontFamily}, sans-serif`,
            fontWeight: 500,
      fontSize: "1em",
    },
    body1: {
      fontFamily: `${urbanist.style.fontFamily}, sans-serif`,
            fontWeight: 500,
      fontSize: "1em",
    },
    body2: {
      fontFamily: `${urbanist.style.fontFamily}, sans-serif`,
            fontWeight: 500,
      fontSize: "1em",
    },
    caption: {
      fontFamily: `${urbanist.style.fontFamily}, sans-serif`,
            fontWeight: 500,
      fontSize: "1em",
    },
    overline: {
      fontFamily: `${urbanist.style.fontFamily}, sans-serif`,
            fontWeight: 500,
      fontSize: "1em",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#ADF5F5",
          // border: "1px solid black",
          // borderRadius: "10px",
          color: "#2D2B42",
          "&:hover": {
            backgroundColor: "#7AA7BA",
          },
        },
      },
    },
  },
});
const ThemeContext = createContext({
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      createTheme({
        palette: {
          mode: currentTheme.palette.mode === "light" ? "dark" : "light",
          ...(currentTheme.palette.mode === "light"
            ? {
                // Dark theme settings
                background: {
                  default: "#121212", // Dark mode background color
                  paper: "#1e1e1e", // Dark mode paper components background color
                },
                text: {
                  primary: "#ffffff", // Dark mode primary text color
                  secondary: "#bbbbbb", // Dark mode secondary text color
                },
              }
            : {
                // Light theme settings (as previously defined)
                background: {
                  default: "#f4f6f8",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#333333",
                  secondary: "#555555",
                },
              }),
        },
        typography: {
          fontFamily: '"Teachers", sans-serif',
          h1: {
            fontFamily: '"Oswald", sans-serif',
          },
          h2: {
            fontFamily: '"Oswald", sans-serif',
          },
          h3: {
            fontFamily: '"Oswald", sans-serif',
          },
          h4: {
            fontFamily: '"Oswald", sans-serif',
          },
          h5: {
            fontFamily: '"Oswald", sans-serif',
          },
          h6: {
            fontFamily: '"Oswald", sans-serif',
          },
        },
      })
    );
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
