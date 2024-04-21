import Hero from "@/components/landingPage/hero/Hero";
import Benefits from "@/components/landingPage/benefits/Benefits";
import ContactForm from "@/components/landingPage/ContactForm";
import Features from "@/components/landingPage/Features";

import { Box, Button, Card, Typography } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useState } from "react";
import GitHubButton from "react-github-btn";

function Main() {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const [loading, setLoading] = useState(false); // State to control loading state
  const { user, error, isLoading } = useUser();

  // Log user details when user is logged in
  if (user && loading) {
    return (
      <Box>
        <Hero />
        <Benefits />
        <Features />
        <ContactForm />
      </Box>
    );
  }

  if (user) {
    return (
      <Box
        sx={{
          height: "80vh",
          width: "100%",
          p: 1,
        }}
      >
        <Box
          sx={{
            width: " 100% ",
            height: " 10vh",
            p: 1,
          }}
        >
          <Typography sx={{ color: "#ffffff" }}>
            Welcome {user.nickname}
          </Typography>
        </Box>
        <Box
          sx={{
            height: "20vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <GitHubButton
            href="https://github.com/Curtis-Thomas/vertl"
            data-icon="octicon-star"
            aria-label="Star buttons/github-buttons on GitHub"
            data-show-count="true"
            data-size="large"
          >
            Star
          </GitHubButton>
        </Box>
        <Box sx={{ width: "100%", height: "50vh" }}>
          <>
            <Box
              sx={{
                p: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link href="/dashboard">
                <Button
                  sx={{
                    color: "#16140C",
                    border: "solid 1px #16140C",
                    borderRadius: "16px",
                    backgroundColor: "#f26b70",
                    height: "7vh",
                    width: "40vw",
                    p: 5,
                    mt: 5,
                    mb: 5,
                    "&:hover": {
                      backgroundColor: "#F58E92",
                    },
                  }}
                >
                  <Typography variant="h5" component="h2">
                    ENTER
                  </Typography>
                </Button>
              </Link>
            </Box>
          </>
        </Box>
      </Box>
    );
  }

  if (isLoading)
    return (
      <Box>
        <Hero />
        <Benefits />
        <Features />
        <ContactForm />
      </Box>
    );
  if (error) return <div>{error.message}</div>;

  return (
    <Box>
      <Hero />
      <Benefits />
      <Features />
      <ContactForm />
    </Box>
  );
}

export default Main;
