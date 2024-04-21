// _app.tsx

import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
