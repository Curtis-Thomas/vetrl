import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import AppointmentHeaderPatientBackdrop from "./AppointmentHeaderPatientBackdrop";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";

interface Patient {
  ownerId: string;
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  weight: string;
  microchip: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

type PatientData = {
  message: string;
  patients: any[];
  patient: Patient;
};
function AppointmentHeaderPatient({
  clientName,
  clientId,
  clientPatients,
}: {
  clientName: string;
  clientId: string;
  clientPatients: string[];
}) {
  const dispatch = useDispatch();

  const { user, error, isLoading } = useUser();

  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const patientId = useSelector(
    (state: RootState) => state.appointment.appointmentCardPatientId
  );

  const handlePatientIDChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "SET_APPOINTMENT",
      payload: { appointmentCardPatientId: event.target.value },
    });
  };

  const [patientName, setPatientName] = useState("");
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [patientsArray, setPatientsArray] = useState<Patient[]>([]);

  const [patient, setPatient] = useState<Patient | null>(null);

  const [backdropState, setBackdropState] = useState(false);
  const SearchPatientData = useCallback(
    async (clientPatients: string[]) => {
      try {
        if (clientPatients[0] === "No patients") {
          setPatientsArray([]); // Set the state variable with an empty array
          return;
        }

        let patientsArray = []; // Create an empty array to store the patients

        for (const patientId of clientPatients) {
          const PatientData = {
            id: patientId,
          };

          const response = await fetch(domainUrl + `/patient/patient/search`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(PatientData),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const responseData = await response.json();

          // If a patient was found, add it to the patientsArray
          if (responseData.patient) {
            patientsArray.push(responseData.patient);
          }
        }

        setPatientsArray(patientsArray); // Set the state variable with the populated array
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [domainUrl, setPatientsArray]
  );

  useEffect(() => {
    if (clientPatients.length > 0) {
      SearchPatientData(clientPatients);
    } else {
      SearchPatientData(["No patients"]);
    }
  }, [clientPatients, backdropState, SearchPatientData]);

  const selectPatient = (patient: Patient) => {
    setPatient(patient);
    dispatch({
      type: "SET_APPOINTMENT",
      payload: { appointmentCardPatientId: patient.id },
    });

    console.log(patientId);
  };

  return (
    <>
      <AppointmentHeaderPatientBackdrop
        backdropState={backdropState}
        setBackdropState={setBackdropState}
        clientId={clientId}
        searchPatientData={SearchPatientData}
      />
      <Box
        sx={{
          width: "25vw",
          height: "20vh",
          p: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",

            height: "100%",
            width: "100%",
            p: 1,
          }}
        >
          <Box sx={{ width: "100%", height: "33.33%", display: "flex" }}>
            <Box sx={{ width: "33.33%" }}>
              {patient && (
                <>
                  <Typography>Name: {patient.name}</Typography>
                </>
              )}
            </Box>
            <Box sx={{ width: "33.33%" }}>
              {patient && (
                <>
                  <Typography>Species: {patient.species}</Typography>
                </>
              )}
            </Box>
            <Box sx={{ width: "33.33%" }}>
              {patient && (
                <>
                  <Typography>Breed: {patient.breed}</Typography>
                </>
              )}
            </Box>
          </Box>
          <Box sx={{ width: "100%", height: "33.33%", display: "flex" }}>
            <Box sx={{ width: "33.33%" }}>
              {patient && (
                <>
                  <Typography>Weight Kg: {patient.weight}</Typography>
                </>
              )}
            </Box>
            <Box sx={{ width: "33.33%" }}>
              {patient && (
                <>
                  <Typography>Weight Kg: {patient.weight}</Typography>
                </>
              )}
            </Box>
            <Box sx={{ width: "33.33%" }}>
              {patient && (
                <>
                  <Typography>Microchip Id: {patient.microchip}</Typography>
                </>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "33.33%",
              display: "flex",
            }}
          >
            <Box sx={{ width: "75%" }}>
              {patientsArray.length > 0 ? (
                patientsArray.map((patient, index) => (
                  <Button
                    sx={{
                      backgroundColor: "black",
                      color: "#94ddde",
                      border: "solid 1px ",
                      height: "50%",
                      width: "20%",
                    }}
                    onClick={() => selectPatient(patient)}
                    key={index}
                  >
                    {patient.name}
                  </Button>
                ))
              ) : (
                <Typography>No patients</Typography>
              )}
            </Box>
            <Box
              sx={{ display: "flex", width: "25%", justifyContent: "right" }}
            >
              <Button
                sx={{
                  backgroundColor: "#94ddde",
                  color: "#ffffff",
                  borderRadius: "16px",
                  width: "80%",
                  "&:hover": {
                    backgroundColor: "#C1EBEC",
                  },
                }}
                onClick={() => setBackdropState(true)}
              >
                + New Patient
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AppointmentHeaderPatient;
