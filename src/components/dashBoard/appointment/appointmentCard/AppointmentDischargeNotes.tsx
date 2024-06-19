import { Box, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store"; // import your store type

function AppointmentDischargeNotes() {
  const dispatch = useDispatch();
  const dischargeNotes = useSelector(
    (state: RootState) => state.appointment.appointmentCardDischargeNotes
  );

  const handleDischargeNotesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "SET_APPOINTMENT",
      payload: { appointmentCardDischargeNotes: event.target.value },
    });
  };

  return (
    <Box sx={{ height: "100%", width: "100%", p: 1 }}>
      <Box sx={{ height: "15%", p: 1, display: "flex", alignItems: "center" }}>
        <Typography variant="body2">Discharge notes</Typography>
      </Box>
      <Box
        sx={{
          height: "85%",
          backgroundColor: "white",
          p: 1,
          borderRadius: "16px",

          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <TextField
          InputProps={{
            style: {
              backgroundColor: "#ffffff",
              height: "100%",
            },
          }}
          value={dischargeNotes}
          onChange={handleDischargeNotesChange}
          multiline
          fullWidth
        />
      </Box>
    </Box>
  );
}

export default AppointmentDischargeNotes;
