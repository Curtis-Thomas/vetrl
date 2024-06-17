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
        height: "100vh",
        width: "85vw",
        color: "white",
        display: "block",
        backgroundColor: "black",
        backdropFilter: "blur(7px)",
      }}
    >
      <Box
        sx={{
          height: "10vh",
          width: "85vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
    </Backdrop>
  );
}

export default AppointmentBillBackdrop;
