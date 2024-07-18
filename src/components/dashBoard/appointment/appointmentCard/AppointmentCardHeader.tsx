import { Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store"; // import your store type

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

import axios from "axios";

function AppointmentCardHeader() {
  const dispatch = useDispatch();

  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const { user } = useUser();

  const appointmentNo = useSelector(
    (state: RootState) => state.appointment.appointmentCardAppointmentNo
  );
  const appointmentCardAnamnesis = useSelector(
    (state: RootState) => state.appointment.appointmentCardAnamnesis
  );
  const appointmentCardDiagnosis = useSelector(
    (state: RootState) => state.appointment.appointmentCardDiagnosis
  );
  const appointmentCardAdditionalNotes = useSelector(
    (state: RootState) => state.appointment.appointmentCardAdditionalNotes
  );

  const appointmentCardDate = useSelector(
    (state: RootState) => state.appointment.appointmentCardDate
  );
  const appointmentCardTime = useSelector(
    (state: RootState) => state.appointment.appointmentCardTime
  );

  const handleAppointmentNoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "SET_APPOINTMENT",
      payload: { appointmentCardAppointmentNo: event.target.value },
    });
  };

  const handleAppointmentDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "SET_APPOINTMENT",
      payload: { appointmentCardDate: event.target.value },
    });
  };

  const handleAppointmentTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "SET_APPOINTMENT",
      payload: { appointmentCardTime: event.target.value },
    });
  };

  const handleAnamnesisChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "SET_APPOINTMENT",
      payload: { appointmentCardAnamnesis: event.target.value },
    });
  };

  const handleDiagnosisChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "SET_APPOINTMENT",
      payload: { appointmentCardDiagnosis: event.target.value },
    });
  };

  const handleAdditionalNotesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "SET_APPOINTMENT",
      payload: { appointmentCardAdditionalNotes: event.target.value },
    });
  };

  const getNextId = useCallback(async () => {
    if (!user) return;
    try {
      const url = domainUrl + `/record/record/getNextId`;

      const headers = {
        sub: user.sub,
      };

      const response = await axios.get(url, { headers });
      dispatch({
        type: "SET_APPOINTMENT",
        payload: { appointmentCardAppointmentNo: response.data.nextId },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }, [user, domainUrl]);

  useEffect(() => {
    getNextId();
  }, [getNextId]);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Box
        sx={{
          width: "15%",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <TextField
            autoComplete="off"
            label="Appointment No."
            value={appointmentNo}
            onChange={handleAppointmentNoChange}
            size="small"
            disabled
            sx={{ width: "100%", height: "150%" }}
            inputProps={{
              style: { height: "10%" },
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: "15%",

          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <TextField
            autoComplete="off"
            size="small"
            label="Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={appointmentCardDate}
            onChange={handleAppointmentDateChange}
            sx={{ width: "100%", height: "50%" }}
            inputProps={{
              style: { height: "10%" },
            }}
          />
        </Box>
        <Box>
          <TextField
            autoComplete="off"
            size="small"
            label="Time"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            value={appointmentCardTime}
            onChange={handleAppointmentTimeChange}
            sx={{ width: "100%", height: "50%" }}
            inputProps={{
              style: { height: "10%" },
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: "15%",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          autoComplete="off"
          size="small"
          label="Anamnesis"
          value={appointmentCardAnamnesis}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleAnamnesisChange}
          sx={{ width: "100%", height: "50%" }}
          inputProps={{
            style: { height: "10%" },
          }}
        />
      </Box>

      <Box
        sx={{
          width: "15%",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          autoComplete="off"
          size="small"
          label="Diagnosis"
          value={appointmentCardDiagnosis}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleDiagnosisChange}
          sx={{ width: "100%", height: "50%" }}
          inputProps={{
            style: { height: "10%" },
          }}
        />
      </Box>

      <Box
        sx={{
          width: "15%",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          autoComplete="off"
          size="small"
          label="Additional Notes"
          value={appointmentCardAdditionalNotes}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleAdditionalNotesChange}
          sx={{ width: "100%", height: "50%" }}
          inputProps={{
            style: { height: "10%" },
          }}
        />
      </Box>
    </Box>
  );
}

export default AppointmentCardHeader;
