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
        backgroundColor: "#ADF5F5",
        p: 1,
        mb: 1,
        display: "flex",
        borderRadius: "16px",
        height: "100%",
        width: "100%",
      }}
    >
      <Box sx={{ width: "20%", height: "100%" }}>
        <Box
          sx={{
            height: "40%",
            width: "100%",
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
            width: "100%",
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
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{end}</Typography>
        </Box>
      </Box>
      <Box sx={{ width: "80%", height: "100%" }}>
        <Box
          sx={{
            height: "40%",
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">{title}</Typography>
        </Box>
        <Box sx={{ height: "10%", width: "100%" }}></Box>

        <Box
          sx={{
            height: "40%",
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography>{description}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default OverviewCalendarTimeSlot;
