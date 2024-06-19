import { Box } from "@mui/material";
import { useState, useEffect, useCallback } from "react";

import { useUser } from "@auth0/nextjs-auth0/client";

import AppointmentHeaderClient from "./appointmentHeaderClient/AppointmentHeaderClient";
import AppointmentHeaderPatient from "./appointmentHeaderPatient/AppointmentHeaderPatient";

function AppointmentHeaderClientPatient({}: {}) {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const [clientName, setClientName] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientPatients, setClientPatients] = useState<string[]>([]); // Updated this line

  const handleClientNameChange = (newClientName: string) => {
    setClientName(newClientName);
  };

  const handleClientIdChange = (newClientId: string) => {
    setClientId(newClientId);
  };

  const handleClientPatientsChange = (newClientPatients: string[]) => {
    setClientPatients(newClientPatients);
  };

  const [open, setOpen] = useState(false);

  const { user, error, isLoading } = useUser();

  function clearClientData() {
    setClientName("");
    setClientId("");
    setClientPatients([]);
  }

  function clearPatientData() {
    setClientPatients([]);
  }

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
      <AppointmentHeaderClient
        onClientNameChange={handleClientNameChange}
        onClientIdChange={handleClientIdChange}
        onClientPatientsChange={handleClientPatientsChange}
      />

      <AppointmentHeaderPatient
        clientName={clientName}
        clientId={clientId}
        clientPatients={clientPatients}
      />
    </Box>
  );
}

export default AppointmentHeaderClientPatient;
