import { Box, Typography } from "@mui/material";

function AppointmentBillingBoxCell({
  text,
  justifyContent,
}: {
  text: string;
  justifyContent: "left" | "center" | "right";
}) {
  return (
    <Box
      sx={{
        width: "20%",
        height: "100%",
        display: "flex",
        justifyContent: justifyContent,
        alignItems: "center",
      }}
    >
      <Typography>{text}</Typography>
    </Box>
  );
}

export default AppointmentBillingBoxCell;
