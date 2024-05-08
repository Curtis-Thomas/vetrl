// _app.tsx

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Provider } from "react-redux";
import store from "../src/redux/store";

const theme = createTheme({
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
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UserProvider>
    </Provider>
  );
}

export default MyApp;
