import React from "react";
import Header from "@/core/Header";
import Main from "@/core/Main";
import Head from "next/head";

import { Box } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";

interface HomeProps {
  user: any; // Modify this type based on your user data structure
  setUser: React.Dispatch<React.SetStateAction<null>>;
}

const Home: React.FC<HomeProps> = () => {
  const { user, error, isLoading } = useUser();

  // Log user details when user is logged in
  if (user) {
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Box sx={{ backgroundColor: "#2d2b42", color: "#16140C" }}>
      <Head>
        <title>vetrl - online veterinary software </title>
        <meta
          name="description"
          content="Online Veterinary client management."
        />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
      </Head>
      <Box
        component="header"
        sx={{
          height: "10vh",
          position: "sticky",
          top: 0,
          backgroundColor: "#2D2B42",
          color: "#ffffff",
          zIndex: 100,
        }}
      >
        <Header />
      </Box>
      <Box component="main" sx={{ minHeight: "90vh" }}>
        <Main />
      </Box>
    </Box>
  );
};

export default Home;
