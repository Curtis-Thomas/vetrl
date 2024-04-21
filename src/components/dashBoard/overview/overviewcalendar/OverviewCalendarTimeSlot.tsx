import { Box, Typography } from "@mui/material";

function OverviewCalendarTimeSlot({
  title,
  start,
  end,
  description,
}: {
  title: string;
  start: string;
  end: string;
  description: string;
}) {
  return (
    <Box
      sx={{
        backgroundColor: "#eefafa",
        p: 1,
        m: 1,
        display: "flex",
        borderRadius: "16px",
      }}
    >
      <Box sx={{ width: "30%" }}>
        <Box
          sx={{
            height: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{start}</Typography>
        </Box>
        <Box
          sx={{
            height: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">-</Typography>
        </Box>
        <Box
          sx={{
            height: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{end}</Typography>
        </Box>
      </Box>
      <Box sx={{ width: "70%" }}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="h5">{description}</Typography>
      </Box>
    </Box>
  );
}

export default OverviewCalendarTimeSlot;
