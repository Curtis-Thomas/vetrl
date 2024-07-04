import { useState } from "react";
import DashboardSideBar from "@/components/dashBoard/layout/DashboardSideBar";
import { Box, CssBaseline } from "@mui/material";
import Overview from "@/components/dashBoard/overview/Overview";
import Settings from "@/components/dashBoard/settings/Settings";
import CalendarContainer from "@/components/dashBoard/calendar/Calendarcontainer";
import { useUser } from "@auth0/nextjs-auth0/client";
import CodexContainer from "@/components/dashBoard/codex/CodexContainer";
import AppointmentContainer from "@/components/dashBoard/appointment/AppointmentContainer";
import RecordsContainer from "@/components/dashBoard/records/RecordsContainer";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "../src/redux/store";

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    const savedSettings = localStorage.getItem("userSettings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      dispatch({
        type: "SET_USER_SETTINGS",
        payload: settings,
      });
    }
  }, [dispatch]);
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

  // The display state sets which component will be shown in the main area of the dashboard.
  const [display, setDisplay] = useState("overview");
  const [loading, setLoading] = useState(false); // State to control loading state

  // Function to change the display state
  const handleDisplayChange = (newDisplay: string) => {
    setDisplay(newDisplay);
  };

  const { user, error, isLoading } = useUser();

  if (user) {
    return (
      <Box>
        <CssBaseline />

        <Box sx={{ height: "100vh", width: "100vw", display: "flex" }}>
          {/* The sidebar is the main navigation, and the main are displays the relevant content based on the sidebar selection which updates the display state. */}
          <Box sx={{ width: { xs: "30vw", md: "15%" } }}>
            <DashboardSideBar onDisplayChange={handleDisplayChange} />
          </Box>
          {/* The main area displays the relevant content based on the sidebar selection which updates the display state which is passed up through the side bar props, to add more screens, add another display with a unique state name and the relevant component to be rendered. */}
          <Box sx={{ width: "85%", height: "100%" }}>
            {display === "overview" && <Overview />}
            {display === "calendar" && <CalendarContainer />}
            {display === "records" && <RecordsContainer />}
            {display === "codex" && <CodexContainer />}
            {display === "appointment" && <AppointmentContainer />}
            {display === "settings" && <Settings />}
          </Box>
        </Box>
      </Box>
    );
  }

  if (isLoading || loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
}

export default Dashboard;
