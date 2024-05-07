import { Avatar, Backdrop, Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import packageJson from "../../../../package.json";

function DashboardSideBar({
  onDisplayChange,
}: {
  onDisplayChange: (location: string) => void;
}) {
  const [activeButton, setActiveButton] = useState("overview");
  const [feedbackBackdrop, setFeedbackBackdrop] = useState(false);

  const { user, error, isLoading } = useUser();
  // Log user details when user is logged in
  if (user) {
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const handleLocationClick = (location: string) => {
    setActiveButton(location);
    onDisplayChange(location);
  };

  const buttonStyle = (location: string) => ({
    height: "13vh",
    width: "100%",
    backgroundColor: activeButton === location ? "#94ddde" : "#ffffff",

    "&:hover": {
      backgroundColor: "#C1EBEC",
    },
  });

  const handleCloseBackdrop = () => {
    setFeedbackBackdrop(false);
  };

  return (
    <Box>
      <Box
        sx={{
          boxShadow: "0px 0px 1px black inset",

          height: "10vh",
          p: 1,
        }}
      >
        <Box sx={{ height: "40%", width: "100%" }}>
          <Avatar
            src={user?.picture || undefined}
            alt="User"
            style={{ height: "auto", width: "10%" }}
          />
        </Box>
        <Box sx={{ height: "30%", display: "flex", alignItems: "center" }}>
          <Typography>{user?.nickname}</Typography>
        </Box>
        <Box sx={{ height: "30%", display: "flex", alignItems: "center" }}>
          <Typography>Version: {packageJson.version}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          boxShadow: "0px 0px 1px black inset",

          height: "80vh",
        }}
      >
        {[
          "overview",
          "appointment",
          "calendar",
          "records",
          "codex",
          "settings",
        ].map((location) => (
          <Box key={location} sx={buttonStyle(location)}>
            <Button
              sx={{
                color: activeButton === location ? "#ffffff" : "#231915",
                height: "100%",
                width: "100%",
              }}
              onClick={() => handleLocationClick(location)}
            >
              {location.charAt(0).toUpperCase() + location.slice(1)}
            </Button>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          p: 3,
        }}
      >
        <Button
          sx={{
            height: "100%",
            width: "100%",
            backgroundColor: "#94ddde",
            color: "#ffffff",
            borderRadius: "26px",
            p: 1,

            "&:hover": {
              backgroundColor: "#C1EBEC",
            },
          }}
          onClick={() => setFeedbackBackdrop(true)}
        >
          Feedback
        </Button>
      </Box>

      <Backdrop
        open={feedbackBackdrop}
        sx={{ zIndex: "300", backgroundColor: "black", color: "white" }}
      >
        <Box sx={{ width: "100vw", height: "100vh" }}>
          <Box sx={{ height: "10vh", display: "flex" }}>
            <Box sx={{ width: "20vw" }}></Box>
            <Box
              sx={{ width: "60vw", display: "flex", justifyContent: "center" }}
            >
              <Typography variant="h3">Feedback</Typography>
            </Box>
            <Box
              sx={{ width: "20vw", display: "flex", justifyContent: "center" }}
            >
              <Button
                onClick={handleCloseBackdrop}
                sx={{
                  color: "#ffffff",
                  backgroundColor: "#f26b70",
                  height: "100%",
                  width: "100%",
                }}
              >
                Close
              </Button>
            </Box>
          </Box>
          <Box sx={{ height: "90vh" }}>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSelloDtisRnorbhWo8djqqnzC-hsQXsPrq_eFJ0F1xjJejOuQ/viewform?embedded=true"
              width="100%"
              height="100%"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
            >
              Loading…
            </iframe>
          </Box>
        </Box>
      </Backdrop>
    </Box>
  );
}

export default DashboardSideBar;
