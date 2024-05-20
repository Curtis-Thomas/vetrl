import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import GitHubButton from "react-github-btn";

function Hero() {
  return (
    <Box
      sx={{
        minHeight: "40vh",
        pb: 15,
        backgroundColor: "#2D2B42",
        color: "#ffffff",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#434063",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          mb: 10,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 20,
              textAlign: "center",
              color: "#AAA9C7",
            }}
          >
            Phase: Alpha Testing - Under active development
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
            color: "#F6E8EA",
          }}
        >
          Online Veterinary Management Solution
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
        <Typography
          // component="h2"
          variant="body1"
          sx={{ fontSize: { xs: 20, md: 25 }, color: "#F6E8EA" }}
        >
          Free veterinary software - Keep on top of your workload in one easily
          accessible location.
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
                backgroundColor: "#434063",
                borderRadius: "26px",
                color: "#AAA9C7",
                "&:hover": {
                  border: "solid 1px #AAA9C7",
                },
                p: 3,
              }}
            >
              <Typography variant="subtitle1">Sign-Up</Typography>
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
          pt: 5,
        }}
      >
        <GitHubButton
          href="https://github.com/Curtis-Thomas/vertl"
          data-icon="octicon-star"
          aria-label="Star buttons/github-buttons on GitHub"
          data-show-count="true"
          data-size="large"
          data-color-scheme="no-preference: light; light: light; dark: dark;"
        >
          Star
        </GitHubButton>
      </Box>
    </Box>
  );
}

export default Hero;
