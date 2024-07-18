import { Box, Typography } from "@mui/material";

import OverviewCalender from "./overviewTaskList/overviewcalendar/OverviewCalendar";
import OverviewTaskList from "./overviewTaskList/OverviewTaskList";

function Overview() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: { xs: "70vw", md: "85vw" },
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
            width: { xs: "65vw", md: "75%" },
            backgroundColor: "#ffffff",
            overflow: "auto",
            borderRadius: "16px",
            mr: 1,
          }}
        >
          <OverviewCalender />
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "25%",
            backgroundColor: "#ffffff",
            display: { xs: "none", md: "block" },
            borderRadius: "16px",
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
