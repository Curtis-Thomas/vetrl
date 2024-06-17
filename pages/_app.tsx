// _app.tsx

import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import { CustomThemeProvider } from "../ThemeContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <UserProvider>
        <CustomThemeProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </CustomThemeProvider>
      </UserProvider>
    </Provider>
  );
}

export default MyApp;
