import { Box, Typography } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useCallback, useState, useEffect } from "react";
import axios from "axios";

interface Patient {
  name: string;
  age: number;
  breed: string;
  weight: number;
  species: string;
  id: number;
  clientId: number;
  sub: string;
}

function CodexPatient() {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const { user, error, isLoading } = useUser();

  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");

  const [patient, setPatient] = useState<Patient[]>([]);

  const getPatientsData = useCallback(async () => {
    if (!user) return;
    try {
      const url = domainUrl + `/patient/patient/all`;

      const headers = {
        sub: user.sub,
      };

      const response = await axios.get(url, { headers });
      setPatient(response.data.patients[0].patients);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [user, domainUrl]);

  useEffect(() => {
    getPatientsData();
  }, [getPatientsData]);

  return (
    <>
      <Box
        sx={{
          height: "95vh",
          width: "85vw",
          overflowY: "scroll",
        }}
      >
        <Box sx={{ display: "flex", pl: 5, pt: 5, pr: 5 }}></Box>

        <Box>
          <Typography sx={{ mb: 1, p: 5 }}>Patient List</Typography>
          <Box sx={{ borderTop: "solid 1px black" }}>
            {patient.map((patientItem, index) => (
              <Box
                sx={{
                  display: "flex",
                  borderBottom: "solid 1px black",
                  justifyContent: "center",
                  alignItems: "center",
                  pt: 1,
                  pb: 1,
                }}
                key={index}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ width: "16.66%" }}>
                    <Typography textAlign={"center"}>
                      Id: {patientItem.id}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "16.66%" }}>
                    <Typography textAlign={"center"}>
                      ClientId: {patientItem.clientId}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "16.66%" }}>
                    <Typography textAlign={"center"}>
                      Name: {patientItem.name}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "16.66%" }}>
                    <Typography textAlign={"center"}>
                      Species: {patientItem.species}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "16.66%" }}>
                    <Typography textAlign={"center"}>
                      Age: {patientItem.age}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "16.66%" }}>
                    <Typography textAlign={"center"}>
                      Breed: {patientItem.breed}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "16.66%" }}>
                    <Typography textAlign={"center"}>
                      Weight: {patientItem.weight}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ width: "10%" }}></Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CodexPatient;
