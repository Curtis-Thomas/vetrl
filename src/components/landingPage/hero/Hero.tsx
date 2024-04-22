import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import GitHubButton from "react-github-btn";

function Hero() {
  return (
    <Box
      sx={{
        minHeight: "40vh",

        pb: 15,

        backgroundColor: "#ffffff",
        color: "#0000001",
      }}
    >
      <Box
        sx={{
          backgroundColor: "orange",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          mb: 15,
          border: "solid 1px black",
        }}
      >
        <Box>
          <Typography>
            Please note that our website is currently in the alpha testing
            phase.
          </Typography>
          <Typography>
            This means that while you can explore and use some of our features,
            the site is still under active development.
          </Typography>
          <Typography>
            As a result, you may encounter bugs, incomplete features, or
            unexpected behavior.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "20vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pl: { xs: 1, md: 0 },
          pr: { xs: 1, md: 0 },
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontSize: { xs: 35, md: 65 },
            textAlign: { xs: "center", md: "" },
          }}
        >
          Free Online Veterinary Client Management
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "10vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: { xs: "center", md: "" },

          mb: 5,
          pl: { xs: 2, md: 0 },
          pr: { xs: 2, md: 0 },
        }}
      >
        <Typography sx={{ fontSize: { xs: 20, md: 25 } }}>
          Keep on top of your workload in one easily accessible location
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "10vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Link href="/api/auth/login">
            <Button
              sx={{
                backgroundColor: "#2b2d42",
                color: "#ffffff",
                borderRadius: "16px",
                "&:hover": {
                  backgroundColor: "#404363",
                },
                p: 3,
              }}
            >
              Sign-Up
            </Button>
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          height: "100%",
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
    </Box>
  );
}

export default Hero;
