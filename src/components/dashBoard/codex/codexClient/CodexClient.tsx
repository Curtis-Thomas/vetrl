import { Box, Typography } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useCallback, useState, useEffect } from "react";
import axios from "axios";

interface Client {
  events: {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    patients: string[];
  }[];
}
interface Patient {
  id: string;
  clientId: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
}

function CodexClient() {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const { user, error, isLoading } = useUser();

  const [boxWidth, setBoxWidth] = useState("20%");

  const [client, setClient] = useState<Client[]>([]);
  const [patient, setPatient] = useState<Patient[]>([]);

  const getClientsData = useCallback(async () => {
    if (!user) return;
    try {
      const url = domainUrl + `/client/client/searchAll`;

      const headers = {
        sub: user.sub,
      };

      const response = await axios.get(url, { headers });
      setClient(response.data.clients);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [user, domainUrl]);

  const getPatientData = useCallback(async () => {
    if (!user) return;
    try {
      const url = domainUrl + `/patient/patient/all`;

      const headers = {
        sub: user.sub,
      };

      const response = await axios.get(url, { headers });
      setPatient(response.data.patients[0].patients);
      // console.log("response.data.patients", response.data.patients);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [user, domainUrl]);

  useEffect(() => {
    getClientsData();
    getPatientData();
  }, [getClientsData, getPatientData]);

  return (
    <>
      <Box
        sx={{
          height: "95vh",
          width: "85vw",
          overflowY: "scroll",
        }}
      >
        <Box>
          <Typography sx={{ mb: 1, p: 5 }}>Client + Patient List</Typography>

          <Box sx={{ borderRadius: "16px" }}>
            {client[0] &&
              client[0].events.map((clientItem, index) => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    pt: 2,
                    pb: 2,
                    borderTop: "solid 5px #ADF5F5",
                    borderBottom: "solid 5px #ADF5F5",
                  }}
                  key={index}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "50%",
                        display: "flex",
                        borderBottom: " 1px dashed black",

                        p: 1,
                      }}
                    >
                      <Box sx={{ width: boxWidth }}>
                        <Typography textAlign={"left"}>
                          Id: <strong>{clientItem.id}</strong>
                        </Typography>
                      </Box>
                      <Box sx={{ width: boxWidth }}>
                        <Typography textAlign={"left"}>
                          Name:<strong> {clientItem.name}</strong>
                        </Typography>
                      </Box>
                      <Box sx={{ width: boxWidth }}>
                        <Typography textAlign={"left"}>
                          Email: <strong>{clientItem.email}</strong>
                        </Typography>
                      </Box>

                      <Box sx={{ width: boxWidth }}>
                        <Typography textAlign={"left"}>
                          Address: <strong>{clientItem.address}</strong>
                        </Typography>
                      </Box>
                      <Box sx={{ width: boxWidth }}>
                        <Typography textAlign={"left"}>
                          Phone No.: <strong>{clientItem.phone}</strong>
                        </Typography>
                      </Box>
                      <Box sx={{ width: boxWidth }}>
                        <Typography textAlign={"left"}>
                          Patients: <strong>{clientItem.patients}</strong>
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        pt: 2,
                        pb: 2,
                      }}
                    >
                      {patient
                        .filter(
                          (patientItem) =>
                            patientItem.clientId === clientItem.id.toString()
                        )
                        .map((patientItem, index) => (
                          <Box
                            key={index}
                            sx={{
                              width: "80%",
                              height: "50%",
                              ml: "auto",
                              mr: "auto",
                              display: "flex",
                              pl: 1,
                              pt: 2,
                              pr: 1,
                            }}
                          >
                            <Box sx={{ height: "100%", width: "16.66%" }}>
                              <Typography textAlign={"left"}>
                                Client ID:{" "}
                                <strong>{patientItem.clientId}</strong>
                              </Typography>
                            </Box>
                            <Box sx={{ height: "100%", width: "16.66%" }}>
                              <Typography textAlign={"left"}>
                                Patient Name:{" "}
                                <strong>{patientItem.name}</strong>
                              </Typography>
                            </Box>
                            <Box sx={{ height: "100%", width: "16.66%" }}>
                              <Typography textAlign={"left"}>
                                Species: <strong>{patientItem.species}</strong>
                              </Typography>
                            </Box>
                            <Box sx={{ height: "100%", width: "16.66%" }}>
                              <Typography textAlign={"left"}>
                                Breed: <strong>{patientItem.breed}</strong>
                              </Typography>
                            </Box>
                            <Box sx={{ height: "100%", width: "16.66%" }}>
                              <Typography textAlign={"left"}>
                                Age: <strong>{patientItem.age}</strong>
                              </Typography>
                            </Box>
                            <Box sx={{ height: "100%", width: "16.66%" }}>
                              <Typography textAlign={"left"}>
                                Weight: <strong>{patientItem.weight}</strong>
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                    </Box>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CodexClient;
