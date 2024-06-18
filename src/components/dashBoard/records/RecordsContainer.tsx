import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useState, useEffect, useCallback, useRef } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useReactToPrint } from "react-to-print";

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

  const [activeRecordId, setActiveRecordId] = useState(null);
  const [backdropState, setBackdropState] = useState(false);

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
  const handlePrintClick = (id: any) => {
    setActiveRecordId(id);
  };

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Appointment Bill",
    onAfterPrint: () => console.log("Printed bill successfully!"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <Box
      sx={{
        height: "100%",
        width: { xs: "70v%", md: "100%" },
        p: 1,
      }}
    >
      <Box
        sx={{
          height: "10%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "dotted 1px black",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5">Records</Typography>
      </Box>
      <Box sx={{ height: "90%", overflow: "auto", pl: "25%", pr: "25%" }}>
        {(records || [])
          .sort((a, b) => parseInt(b.id) - parseInt(a.id))
          .map((record, index) => (
            <Card
              sx={{ border: "dotted 1px black", mt: 1, ml: 1, mr: 1 }}
              key={index}
            >
              <CardContent sx={{ pl: "12.5%", pr: "12.5%", pt: "10%" }}>
                <Backdrop
                  key={index}
                  open={backdropState && activeRecordId === record.id}
                  sx={{
                    zIndex: 100,
                    ml: "15vw",
                    minHeight: "110vh",
                    width: "85vw",
                    color: "white",
                    display: "block",
                    backdropFilter: "blur(15px)",
                    overflowY: "auto",
                  }}
                >
                  <Box>
                    <Button
                      onClick={() => setBackdropState(false)}
                      style={{ float: "right" }}
                    >
                      Close
                    </Button>
                  </Box>
                  <div>
                    <div
                      style={{
                        textAlign: "center",
                        paddingTop: "7.5vh",
                        paddingBottom: "2.5vh",
                      }}
                    >
                      <button
                        style={{
                          width: "100px",
                          height: "50px",
                          fontSize: "20px",
                          backgroundColor: "#4CAF50",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={handlePrint}
                      >
                        Print Bill
                      </button>
                    </div>
                    <style>
                      {`@media print {
          @page {
            size: A4 portrait;
            margin: 20mm;
          }
          body {
            width: 100%;
          }
        }`}
                    </style>
                    <div
                      ref={record.id === activeRecordId ? componentRef : null}
                      style={{
                        width: "794px", // A4 width in pixels
                        minHeight: "1123px", // A4 height in pixels, minHeight to allow content to expand
                        margin: "auto", // Center the invoice on the page
                        padding: "25.4mm", // Adjust padding to create standard invoice formatting style
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Optional: add a shadow to make it pop a bit on screen
                        backgroundColor: "white", // Ensure background is white for printing
                        color: "#000", // Use black for text for better print contrast
                        fontFamily: "'Helvetica', 'Arial', sans-serif", // Use a standard, professional font
                      }}
                    >
                      {/* Header */}

                      <div
                        style={{ textAlign: "center", marginBottom: "20px" }}
                      >
                        <h1>Appointment Bill</h1>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <div>
                          <p>
                            <strong>Appointment No:</strong> {record.id}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Date:</strong> {record.date}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Time:</strong> {record.time}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <div>
                          <p>
                            <strong>Anamnesis:</strong> {record.anamnesis}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Diagnosis:</strong> {record.diagnosis}
                          </p>
                        </div>
                      </div>

                      {/* Appointment Details */}
                      <table style={{ width: "100%", marginBottom: "20px" }}>
                        <thead>
                          <tr>
                            <th style={{ textAlign: "left" }}>Description</th>
                            <th style={{ textAlign: "right" }}>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Procedures</td>
                            <td style={{ textAlign: "right" }}>
                              €{record.procedures}
                            </td>
                          </tr>
                          <tr>
                            <td>Medicine</td>
                            <td style={{ textAlign: "right" }}>
                              €{record.medicine}
                            </td>
                          </tr>
                          <tr>
                            <td>Supplies</td>
                            <td style={{ textAlign: "right" }}>
                              €{record.supplies}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Total Price</strong>
                            </td>
                            <td style={{ textAlign: "right" }}>
                              <strong>
                                €
                                {(
                                  parseFloat(record.procedures) +
                                  parseFloat(record.medicine) +
                                  parseFloat(record.supplies)
                                ).toFixed(2)}
                              </strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div>
                        <p>
                          {" "}
                          <strong>Additional Notes:</strong>{" "}
                          {record.additionalNotes}
                        </p>
                      </div>
                      <div>
                        <p>
                          {" "}
                          <strong>Discharge Notes:</strong>{" "}
                          {record.dischargeNotes}
                        </p>
                      </div>
                    </div>
                  </div>
                </Backdrop>
                <Box
                  sx={{
                    display: "flex",

                    pb: 1,
                    alignItems: "center",
                    borderBottom: "dotted 1px grey",
                  }}
                >
                  <Box
                    sx={{
                      width: "25%",
                      display: "flex",
                      justifyContent: "left",
                    }}
                  >
                    <Typography variant="body2" component="div">
                      <strong>Record ID:</strong> {record.id}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "25%",
                      display: "flex",
                      justifyContent: "left",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      <strong>Appointment No:</strong> {record.appointmentNo}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "25%",
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      <strong>Date:</strong> {record.date}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: "25%",
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      <strong>Time:</strong> {record.time}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    pt: 1,
                    pb: 1,

                    alignItems: "center",
                    borderBottom: "dotted 1px grey",
                  }}
                >
                  <Box
                    sx={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "left",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      <strong>Client ID:</strong> {record.clientId}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      <strong>Patient ID:</strong> {record.patientId}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    pt: 1,
                    pb: 1,
                    alignItems: "center",
                    borderBottom: "dotted 1px grey",
                  }}
                >
                  <Box
                    sx={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "left",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      <strong>Anamnesis:</strong> {record.anamnesis}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      <strong>Diagnosis:</strong> {record.diagnosis}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    pt: 1,
                    pb: 1,
                    alignItems: "center",
                    borderBottom: "dotted 1px grey",
                  }}
                >
                  <Box
                    sx={{
                      width: "33.33%",
                      display: "flex",
                      justifyContent: "left",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      <strong>Medicine:</strong> €{record.medicine}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "33.33%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      <strong>Procedures:</strong> €{record.procedures}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "33.33%",
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      <strong>Supplies:</strong> €{record.supplies}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    pt: 1,
                    pb: 1,
                    alignItems: "dashed",
                    borderBottom: "dotted 1px grey",
                  }}
                >
                  <Box sx={{ width: "33.33%" }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Total Price:</strong> €{" "}
                      {(
                        parseFloat(record.procedures) +
                        parseFloat(record.medicine) +
                        parseFloat(record.supplies)
                      ).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    pt: 1,
                    pb: 1,
                    alignItems: "dashed",
                    borderBottom: "dotted 1px grey",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    <strong>Additional Notes:</strong> {record.additionalNotes}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    pb: "5%",
                    pt: 1,
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    <strong>Discharge Notes:</strong> {record.dischargeNotes}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    onClick={() => {
                      handlePrintClick(record.id), setBackdropState(true);
                    }}
                  >
                    Print Record No. {record.id}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
      </Box>
    </Box>
  );
}

export default RecordsContainer;
