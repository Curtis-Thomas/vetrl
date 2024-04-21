import { Box, TextField } from "@mui/material";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

import axios from "axios";

function AppointmentCardHeader({
  onAppointmentAdditionalNotesChange,
  onAppointmentAnamnesisChange,
  onAppointmentDateChange,
  onAppointmentDiagnosisChange,
  onAppointmentNoChange,
  onAppointmentTimeChange,
}: {
  onAppointmentNoChange: (appointmentNo: string) => void;
  onAppointmentDateChange: (appointmentDate: string) => void;
  onAppointmentTimeChange: (appointmentTime: string) => void;
  onAppointmentAnamnesisChange: (anamnesis: string) => void;
  onAppointmentDiagnosisChange: (diagnosis: string) => void;
  onAppointmentAdditionalNotesChange: (additionalNotes: string) => void;
}) {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const { user } = useUser();
  const [anamnesis, setAnamnesis] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [appointmentNo, setAppointmentNo] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const handleAppointmentNoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAppointmentNo(event.target.value);
    onAppointmentNoChange(event.target.value);
  };

  const handleAppointmentDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAppointmentDate(event.target.value);
    onAppointmentDateChange(event.target.value);
  };

  const handleAppointmentTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAppointmentTime(event.target.value);
    onAppointmentTimeChange(event.target.value);
  };

  const handleAnamnesisChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAnamnesis(event.target.value);
    onAppointmentAnamnesisChange(event.target.value);
  };

  const handleDiagnosisChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDiagnosis(event.target.value);
    onAppointmentDiagnosisChange(event.target.value);
  };

  const handleAdditionalNotesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAdditionalNotes(event.target.value);
    onAppointmentAdditionalNotesChange(event.target.value);
  };

  const getNextId = useCallback(async () => {
    if (!user) return;
    try {
      const url = domainUrl + `/record/record/getNextId`;

      const headers = {
        sub: user.sub,
      };

      const response = await axios.get(url, { headers });
      setAppointmentNo(response.data.nextId);
      onAppointmentNoChange(response.data.nextId);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [user, domainUrl, onAppointmentNoChange]); // Added onAppointmentNoChange to the dependency array

  useEffect(() => {
    getNextId();
  }, [getNextId]);

  return (
    <Box sx={{ height: "10%" }}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box whiteSpace={{ width: "5%" }}></Box>

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
            />
          </Box>
        </Box>
        <Box whiteSpace={{ width: "5%" }}></Box>

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
              InputLabelProps={{
                shrink: true,
              }}
              value={appointmentDate}
              onChange={handleAppointmentDateChange}
              sx={{ width: "100%", height: "50%" }}
            />
          </Box>
          <Box sx={{ ml: 1 }}>
            <TextField
              autoComplete="off"
              size="small"
              label="Time"
              InputLabelProps={{
                shrink: true,
              }}
              value={appointmentTime}
              onChange={handleAppointmentTimeChange}
              sx={{ width: "100%", height: "50%" }}
            />
          </Box>
        </Box>
        <Box whiteSpace={{ width: "5%" }}></Box>

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
            value={anamnesis}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleAnamnesisChange}
            sx={{ width: "100%", height: "50%" }}
          />
        </Box>
        <Box whiteSpace={{ width: "5%" }}></Box>

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
            value={diagnosis}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleDiagnosisChange}
            sx={{ width: "100%", height: "50%" }}
          />
        </Box>
        <Box whiteSpace={{ width: "5%" }}></Box>

        <Box
          sx={{
            width: "25%",

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
            value={additionalNotes}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleAdditionalNotesChange}
            sx={{ width: "100%", height: "50%" }}
          />
        </Box>
        <Box whiteSpace={{ width: "5%" }}></Box>
      </Box>
    </Box>
  );
}

export default AppointmentCardHeader;
