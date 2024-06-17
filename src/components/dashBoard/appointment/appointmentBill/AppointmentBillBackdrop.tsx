import { Backdrop, Box, Button } from "@mui/material";
import AppointmentBillDocument from "./AppointmentBillDocument";
import React from "react";

function AppointmentBillBackdrop({
  backdropState,
  setBackdropState,
}: {
  backdropState: boolean;
  setBackdropState: (state: boolean) => void;
}) {
  const handleClickCloseBackdrop = () => {
    setBackdropState(false);
  };

  return (
    <Backdrop
      open={backdropState}
      sx={{
        zIndex: 100,
        ml: "15vw",
        minHeight: "110vh",
        width: "85vw",
        color: "white",
        display: "block",
        backdropFilter: "blur(15px)",
        overflowY: "auto",
      }}
    >
      <Box sx={{ height: "5vh", width: "100%" }}></Box>
      <Box
        sx={{
          height: "10vh",
          width: "85vw",
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          pr: "5vw",
        }}
      >
        <Button onClick={handleClickCloseBackdrop}>Close</Button>
      </Box>

      <Box
        sx={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppointmentBillDocument />
      </Box>
      <Box sx={{ height: "40vh", width: "100%" }}></Box>
    </Backdrop>
  );
}

export default AppointmentBillBackdrop;
