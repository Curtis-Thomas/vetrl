import { Avatar, Backdrop, Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import packageJson from "../../../../package.json";
import GuideMain from "../guide/GuideMain";
import Image from "next/image";
import logo from "../../../../vetrl logo.png";

function DashboardSideBar({
  onDisplayChange,
}: {
  onDisplayChange: (location: string) => void;
}) {
  const [guideBackdropState, setGuideBackdropState] = useState(false);
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

  const handleCloseBackdrop = () => {
    setFeedbackBackdrop(false);
  };

  return (
    <Box>
      <Box
        sx={{
          height: "15vh",
          p: 1,
        }}
      >
        <Box sx={{ height: "40%", width: "100%", display: "flex" }}>
          <Box sx={{ height: "100%", width: "30%" }}>
            <Image src={logo} alt="VetRL Logo" width={50} height={50} />
          </Box>
          <Box sx={{ height: "100%", width: "70%" }}>
            <Typography
              sx={{ color: "#ffffff", fontSize: "2rem", fontWeight: "600" }}
            >
              vetrl
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            height: "30%",
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            color={"#ffffff"}
            variant="subtitle1"
            sx={{ textAlign: "right", width: "100%" }}
          >
            Logged in: {user?.nickname}
          </Typography>
        </Box>
        <Box
          sx={{
            height: "30%",
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            color={"#ffffff"}
            variant="body2"
            sx={{ textAlign: "right", width: "100%" }}
          >
            Version: {packageJson.version}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          height: "70vh",
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
          <Box key={location} sx={{ height: "10%" }}>
            <Button
              sx={{
                backgroundColor:
                  activeButton === location ? "#33577A" : "#3F769D",
                color: activeButton === location ? "#ffffff" : "#ffffff",
                height: "100%",
                width: "100%",
                border: "none",
                borderRadius: "0px",
              }}
              onClick={() => handleLocationClick(location)}
            >
              <Typography variant="h6">
                {location.charAt(0).toUpperCase() + location.slice(1)}
              </Typography>
            </Button>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          height: "15vh",
          p: 3,
          display: "flex",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            p: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              height: "70%",
              width: "70%",

              borderRadius: "18px",
            }}
            onClick={() => setGuideBackdropState(true)}
          >
            Need Help?
          </Button>
        </Box>
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
      <GuideMain
        guideBackdropState={guideBackdropState}
        setGuideBackdropState={setGuideBackdropState}
      />
    </Box>
  );
}

export default DashboardSideBar;
