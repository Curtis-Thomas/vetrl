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

  function randomColor(){
    let colors = ["#f94144", "#f3722c", "#f8961e", "#f9844a", "#f9c74f", "#90be6d", "#43aa8b", "#4d908e", "#577590", "#277da1"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const borderColor = randomColor();
  return (
    <Box
      sx={{
        p: 1,
        mb: 1.5,
        display: "flex",
        borderLeft: "2px solid " + borderColor,
        height: "65%",
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
        borderLeft:"1px solid #BDBEBD",
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
