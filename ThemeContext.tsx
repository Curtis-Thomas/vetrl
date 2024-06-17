// ThemeContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#ADF5F5",
    },
    text: {
      primary: "#2D2B42",
      secondary: "#555555",
    },
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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#ADF5F5",
          border: "1px solid black",
          borderRadius: "10px",
          color: "#2D2B42",
          "&:hover": {
            backgroundColor: "#81EFEF",
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
