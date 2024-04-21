import { Box } from "@mui/material";

import OverviewCalender from "./overviewcalendar/OverviewCalendar";
import OverviewTaskList from "./overviewTaskList/OverviewTaskList";

function Overview() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: { xs: "70vw", md: "85vw" },
        backgroundColor: "#eefafa",
      }}
    >
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          width: { xs: "70vw", md: "85vw" },
          height: "100vh",
          p: 1,
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: { xs: "65vw", md: "35vw" },

            backgroundColor: "#ffffff",
            overflow: "auto",
            borderRadius: "10px",

            mr: 1,
          }}
        >
          <OverviewCalender />
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "50vw",
            backgroundColor: "#ffffff",

            display: { xs: "none", md: "block" },

            borderRadius: "10px",
            p: 1,
          }}
        >
          <OverviewTaskList />
        </Box>
      </Box>
    </Box>
  );
}

export default Overview;
