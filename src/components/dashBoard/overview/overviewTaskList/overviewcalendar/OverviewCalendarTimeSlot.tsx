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
        p: 1,
        mb: 1,
        display: "flex",
        borderLeft: "5px solid black",
        height: "100%",
        width: "100%",
      }}
    >
      <Box sx={{ width: "20%", height: "100%" }}>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        

          }}
        >
          <Typography variant="subtitle1" >
            {start}-{end}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: "80%", height: "100%",
        borderLeft:"2px solid #BDBEBD",
        pl:1
       }}>
        <Box
          sx={{
            height: "40%",
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color={"#444444"}>{title}</Typography>
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
          <Typography color={"#a6a6a6"}>{description}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default OverviewCalendarTimeSlot;
