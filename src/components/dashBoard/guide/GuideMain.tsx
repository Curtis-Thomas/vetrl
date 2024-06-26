import { Backdrop, Box, Button } from "@mui/material";
import { useState } from "react";
import GuideOverview from "./components/GuideOverview";
import GuideAppointment from "./components/GuideAppointment";
import GuideCalendar from "./components/GuideCalendar";
import GuideRecords from "./components/GuideRecords";
import GuideCodex from "./components/GuideCodex";
import GuideSettings from "./components/GuideSettings";

function GuideMain({
  guideBackdropState,
  setGuideBackdropState,
}: {
  guideBackdropState: boolean;
  setGuideBackdropState: (state: boolean) => void;
}) {
  const [displaySection, setDisplaySection] = useState("overview");
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: "#fff",
        backdropFilter: "blur(10px)",
        height: "100vh",
        width: "100vw",
      }}
      open={guideBackdropState}
    >
      <Box sx={{ height: "100%", width: "100%" }}>
        <Box
          sx={{
            height: "10%",
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            backgroundColor: "black",
          }}
        >
          <Box sx={{ height: "100%", width: "14.2%" }}>
            <Button
              onClick={() => setDisplaySection("overview")}
              sx={{ height: "100%", width: "100%" }}
            >
              Overview
            </Button>
          </Box>
          <Box sx={{ height: "100%", width: "14.2%" }}>
            <Button
              onClick={() => setDisplaySection("appointment")}
              sx={{ height: "100%", width: "100%" }}
            >
              Appointment
            </Button>
          </Box>
          <Box sx={{ height: "100%", width: "14.2%" }}>
            <Button
              onClick={() => setDisplaySection("calendar")}
              sx={{ height: "100%", width: "100%" }}
            >
              Calendar
            </Button>
          </Box>
          <Box sx={{ height: "100%", width: "14.2%" }}>
            <Button
              onClick={() => setDisplaySection("records")}
              sx={{ height: "100%", width: "100%" }}
            >
              Records
            </Button>
          </Box>
          <Box sx={{ height: "100%", width: "14.2%" }}>
            <Button
              onClick={() => setDisplaySection("codex")}
              sx={{ height: "100%", width: "100%" }}
            >
              Codex
            </Button>
          </Box>
          <Box sx={{ height: "100%", width: "14.2%" }}>
            <Button
              onClick={() => setDisplaySection("settings")}
              sx={{ height: "100%", width: "100%" }}
            >
              Settings
            </Button>
          </Box>
          <Box sx={{ height: "100%", width: "14.2%" }}>
            <Button
              onClick={() => setGuideBackdropState(false)}
              sx={{
                height: "100%",
                width: "100%",
                border: "solid 1px red",
                color: "red",
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "red",
                  color: "black",
                },
              }}
            >
              Exit
            </Button>
          </Box>
        </Box>
        <Box sx={{ minHeight: "90%", width: "100%", overflow: "auto" }}>
          {displaySection === "overview" && <GuideOverview />}
          {displaySection === "appointment" && <GuideAppointment />}
          {displaySection === "calendar" && <GuideCalendar />}
          {displaySection === "records" && <GuideRecords />}
          {displaySection === "codex" && <GuideCodex />}
          {displaySection === "settings" && <GuideSettings />}
        </Box>
      </Box>
    </Backdrop>
  );
}

export default GuideMain;
