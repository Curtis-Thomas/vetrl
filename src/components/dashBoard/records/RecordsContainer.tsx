import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

import axios from "axios";

interface Record {
  id: string;
  date: string;
  description: string;
  additionalNotes: string;
  anamnesis: string;
  appointmentNo: string;
  clientId: string;
  diagnosis: string;
  dischargeNotes: string;
  medicine: string;
  patientId: string;
  procedures: string;
  supplies: string;
  time: string;
  totalPrice: string;
}

function RecordsContainer() {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const { user, error, isLoading } = useUser();

  const [records, setRecords] = useState<Record[]>([]);

  const getRecordsData = useCallback(async () => {
    if (!user) return;
    try {
      const url = `${domainUrl}/record/record/get`;

      const headers = {
        sub: user.sub,
      };

      const response = await axios.get(url, { headers });
      setRecords(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [user, domainUrl]);

  useEffect(() => {
    getRecordsData();
  }, [getRecordsData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <Box
      sx={{
        height: "100vh",
        width: { xs: "70vw", md: "85vw" },
        backgroundColor: "#ffffff",
      }}
    >
      <Box
        sx={{
          height: "10vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "solid 1px black",
        }}
      >
        <Typography>Records</Typography>
      </Box>
      <Box sx={{ height: "90vh", overflow: "auto" }}>
        {(records || [])
          .sort((a, b) => parseInt(b.id) - parseInt(a.id))
          .map((record, index) => (
            <Card
              sx={{ border: "solid 1px black", mt: 1, ml: 1, mr: 1 }}
              key={index}
            >
              <CardContent>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ width: "33.33%" }}>
                    <Typography variant="h5" component="div">
                      Record ID: {record.id}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "33.33%" }}>
                    <Typography variant="body2" color="text.secondary">
                      Date: {record.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Time: {record.time}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "33.33%" }}>
                    <Typography variant="body2" color="text.secondary">
                      Additional Notes: {record.additionalNotes}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ width: "33.33%" }}>
                    <Typography variant="body2" color="text.secondary">
                      Anamnesis: {record.anamnesis}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "33.33%" }}>
                    <Typography variant="body2" color="text.secondary">
                      Appointment No: {record.appointmentNo}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "33.33%" }}>
                    <Typography variant="body2" color="text.secondary">
                      Client ID: {record.clientId}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ width: "33.33%" }}>
                    <Typography variant="body2" color="text.secondary">
                      Diagnosis: {record.diagnosis}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "33.33%" }}>
                    <Typography variant="body2" color="text.secondary">
                      Discharge Notes: {record.dischargeNotes}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "33.33%" }}>
                    <Typography variant="body2" color="text.secondary">
                      Medicine: {record.medicine}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ width: "33.33%" }}>
                    <Typography variant="body2" color="text.secondary">
                      Patient ID: {record.patientId}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "33.33%" }}>
                    <Typography variant="body2" color="text.secondary">
                      Procedures: {record.procedures}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "33.33%" }}>
                    <Typography variant="body2" color="text.secondary">
                      Supplies: {record.supplies}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ width: "33.33%" }}></Box>
                  <Box sx={{ width: "33.33%" }}>
                    <Typography variant="body2" color="text.secondary">
                      Total Price: {record.totalPrice}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "33.33%" }}></Box>
                </Box>
              </CardContent>
            </Card>
          ))}
      </Box>
    </Box>
  );
}

export default RecordsContainer;
