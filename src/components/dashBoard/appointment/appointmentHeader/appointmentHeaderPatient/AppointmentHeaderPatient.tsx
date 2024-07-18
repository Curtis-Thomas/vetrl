import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import AppointmentHeaderPatientBackdrop from "./AppointmentHeaderPatientBackdrop";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";

import axios from "axios";

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

  const [patientBoxFontSize, setPatientBoxFontSize] = useState("0.8rem");

  const [backdropState, setBackdropState] = useState(false);
  const SearchPatientData = useCallback(
    async (clientPatients: string[]) => {
      try {
        if (!user) return;
        const headers = {
          sub: user.sub,
          "Content-Type": "application/json",
        };

        if (clientPatients[0] === "No patients") {
          setPatientsArray([]); // Set the state variable with an empty array
          return;
        }

        let patientsArray = []; // Create an empty array to store the patients

        for (const patientId of clientPatients) {
          const PatientData = {
            id: patientId,
          };

          const response = await axios.post(
            `${domainUrl}/patient/patient/search`,
            PatientData,
            { headers }
          );

          if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const responseData = response.data;

          // If a patient was found, add it to the patientsArray
          if (responseData.patient) {
            patientsArray.push(responseData.patient);
          }
        }

        setPatientsArray(patientsArray); // Set the state variable with the populated array
      } catch (error) {
        console.error("Error fetching patient data:", error);
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
          <Box
            sx={{
              height: "70%",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "50%",
                width: "100%",
              }}
            >
              <Box sx={{ width: "33.33%" }}>
                <Typography
                  sx={{
                    fontSize: patientBoxFontSize,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Name:
                </Typography>
                {patient && (
                  <Typography
                    sx={{
                      fontSize: patientBoxFontSize,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {patient.name}
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: "33.33%" }}>
                <Typography
                  sx={{
                    fontSize: patientBoxFontSize,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Species:
                </Typography>
                {patient && (
                  <Typography
                    sx={{
                      fontSize: patientBoxFontSize,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {patient.species}
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: "33.33%" }}>
                <Typography
                  sx={{
                    fontSize: patientBoxFontSize,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Breed:
                </Typography>
                {patient && (
                  <Typography
                    sx={{
                      fontSize: patientBoxFontSize,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {patient.breed}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "50%",
                width: "100%",
              }}
            >
              <Box sx={{ width: "33.33%" }}>
                <Typography
                  sx={{
                    fontSize: patientBoxFontSize,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Age:
                </Typography>
                {patient && (
                  <Typography
                    sx={{
                      fontSize: patientBoxFontSize,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {" "}
                    {patient.age}
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: "33.33%" }}>
                <Typography
                  sx={{
                    fontSize: patientBoxFontSize,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Weight:
                </Typography>
                {patient && (
                  <Typography
                    sx={{
                      fontSize: patientBoxFontSize,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {patient.weight}
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: "33.33%" }}>
                <Typography
                  sx={{
                    fontSize: patientBoxFontSize,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Microchip:
                </Typography>
                {patient && (
                  <Typography
                    sx={{
                      fontSize: patientBoxFontSize,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {patient.microchip}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              height: "30%",
              width: "100%",
            }}
          >
            <Box sx={{ width: "75%" }}>
              {patientsArray.length > 0 ? (
                patientsArray.map((patient, index) => (
                  <Button
                    sx={{
                      height: "100%",
                      width: "20%",
                    }}
                    onClick={() => selectPatient(patient)}
                    key={index}
                  >
                    {patient.name}
                  </Button>
                ))
              ) : (
                <Typography
                  sx={{
                    fontSize: patientBoxFontSize,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  No patients
                </Typography>
              )}
            </Box>
            <Box
              sx={{ display: "flex", width: "25%", justifyContent: "right" }}
            >
              <Button
                sx={{
                  width: "80%",
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
