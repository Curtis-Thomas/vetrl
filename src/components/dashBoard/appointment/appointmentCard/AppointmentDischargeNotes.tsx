import { Box, TextField, Typography } from "@mui/material";

import { useState } from "react";

function AppointmentDischargeNotes({
  onAppointmentDischargeNotesChange,
}: {
  onAppointmentDischargeNotesChange: (dischargeNotes: string) => void;
}) {
  const [dischargeNotes, setDischargeNotes] = useState("");

  const handleDischargeNotesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDischargeNotes(event.target.value);
    onAppointmentDischargeNotesChange(event.target.value);
  };
  return (
    <>
      <Box sx={{ height: "10%", p: 1 }}>
        <Typography>Discharge notes</Typography>
      </Box>
      <Box
        sx={{ height: "90%", p: 2, display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            flexDirection: "column",
          }}
        >
          <TextField
            sx={{ width: "100%", height: "100%" }}
            InputProps={{
              style: { backgroundColor: "#ffffff" },
            }}
            value={dischargeNotes}
            onChange={handleDischargeNotesChange}
            multiline
            rows={4}
          />
        </Box>
      </Box>
    </>
  );
}

export default AppointmentDischargeNotes;
