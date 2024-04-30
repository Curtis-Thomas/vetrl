import { Backdrop, Box, Button, Typography } from "@mui/material";
import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import { useUser } from "@auth0/nextjs-auth0/client";
import AppointmentProcedures from "./appointmentCard/AppointmentProcedures";
import AppointmentDischargeNotes from "./appointmentCard/AppointmentDischargeNotes";
import AppointmentBillingBox from "./appointmentCard/AppointmentBillingBox";
import AppointmentCardHeader from "./appointmentCard/AppointmentCardHeader";

import AppointmentHeaderClientPatient from "./appointmentHeader/AppointmentHeaderClientPatient";
import AppointmentMedicine from "./appointmentCard/AppointmentMedicine";
import AppointmentSupplies from "./appointmentCard/AppointmentSupplies";
import AppointmentBillBackdrop from "./appointmentBill/AppointmentBillBackdrop";

function AppointmentContainer() {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const { user, error, isLoading } = useUser();

  const [backdropState, setBackdropState] = useState(false);

  const appointmentNo = useSelector(
    (state: RootState) => state.appointment.appointmentCardAppointmentNo
  );

  const clientId = useSelector(
    (state: RootState) => state.appointment.appointmentCardClientId
  );

  const patientId = useSelector(
    (state: RootState) => state.appointment.appointmentCardPatientId
  );

  const date = useSelector(
    (state: RootState) => state.appointment.appointmentCardDate
  );

  const time = useSelector(
    (state: RootState) => state.appointment.appointmentCardTime
  );

  const anamnesis = useSelector(
    (state: RootState) => state.appointment.appointmentCardAnamnesis
  );

  const diagnosis = useSelector(
    (state: RootState) => state.appointment.appointmentCardDiagnosis
  );

  const additionalNotes = useSelector(
    (state: RootState) => state.appointment.appointmentCardAdditionalNotes
  );

  const procedures = useSelector(
    (state: RootState) => state.appointment.appointmentCardProceduresPrice
  );

  const medicine = useSelector(
    (state: RootState) => state.appointment.appointmentCardMedicinePrice
  );

  const supplies = useSelector(
    (state: RootState) => state.appointment.appointmentCardSuppliesPrice
  );

  const dischargeNotes = useSelector(
    (state: RootState) => state.appointment.appointmentCardDischargeNotes
  );

  const totalPrice = useSelector(
    (state: RootState) => state.appointment.appointmentCardTotalPrice
  );

  const [recordSavedBackdrop, setRecordSavedBackdrop] = useState(false);

  const handleClickSave = async () => {
    try {
      // Check for empty fields
      if (!user?.sub) {
        console.error("All fields are required");
        return;
      }

      const RecordData = {
        sub: user.sub,

        appointmentNo: appointmentNo,
        clientId: clientId,
        patientId: patientId,
        date: date,
        time: time,
        anamnesis: anamnesis,
        diagnosis: diagnosis,
        additionalNotes: additionalNotes,
        dischargeNotes: dischargeNotes,

        procedures: procedures,
        medicine: medicine,
        supplies: supplies,
        totalPrice: totalPrice,
      };

      const response = await fetch(domainUrl + `/record/record/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(RecordData),
      });

      setRecordSavedBackdrop(true);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickOpenBackdrop = () => {
    setBackdropState(true);
  };

  return (
    <>
      <Backdrop open={recordSavedBackdrop} sx={{ zIndex: 100, ml: "15vw" }}>
        <Box
          sx={{
            height: "90%",
            width: "90%",
            backgroundColor: "#eefafa",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Record Saved </Typography>
        </Box>
      </Backdrop>
      <Box
        sx={{
          height: "100vh",
          width: "70vw",
          backgroundColor: "#eefafa",
          display: { xs: "block", md: "none" },
          p: 5,
        }}
      >
        <Typography>Please use desktop to access appointment screen</Typography>
      </Box>
      <Box
        sx={{
          height: "100vh",
          width: "85vw",
          backgroundColor: "#eefafa",
          display: { xs: "none", md: "block" },
        }}
      >
        <AppointmentBillBackdrop
          backdropState={backdropState}
          setBackdropState={setBackdropState}
        />
        <Box
          sx={{
            height: "20vh",
            width: "85vw",

            display: "flex",
          }}
        >
          <AppointmentHeaderClientPatient />
        </Box>
        <Box sx={{ height: "80vh", width: "85vw", pb: 1, pl: 1, pr: 1 }}>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              pt: 1,

              height: "100%",
              width: "100%",
            }}
          >
            <AppointmentCardHeader />

            <Box
              sx={{
                height: "90%",
                width: "100%",
                p: 1,
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: "15%",
                  height: "100%",

                  p: 1,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#eefafa",
                    height: "100%",
                    width: "100%",
                    borderRadius: "16px",
                    p: 1,
                  }}
                >
                  <AppointmentProcedures />
                </Box>
              </Box>
              <Box
                sx={{
                  width: "15%",
                  p: 1,
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "16px",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#eefafa",
                      height: "100%",
                      width: "100%",
                      borderRadius: "16px",
                      p: 1,
                    }}
                  >
                    <AppointmentMedicine />
                  </Box>
                  <Box sx={{ height: "1%" }}></Box>
                </Box>
              </Box>
              <Box sx={{ width: "15%", p: 1 }}>
                <Box
                  sx={{
                    backgroundColor: "#eefafa",
                    height: "100%",
                    width: "100%",
                    borderRadius: "16px",
                    p: 1,
                  }}
                >
                  <AppointmentSupplies />
                </Box>
              </Box>

              <Box sx={{ width: "55%", p: 1 }}>
                <Box
                  sx={{
                    height: "30%",
                    backgroundColor: "#eefafa",
                    borderRadius: "16px",
                  }}
                >
                  <AppointmentDischargeNotes />
                </Box>
                <Box sx={{ height: "1%" }}></Box>
                <Box
                  sx={{
                    height: "70%",
                    backgroundColor: "#eefafa",
                    borderRadius: "16px",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "80%",

                      p: 1,
                    }}
                  >
                    <AppointmentBillingBox />
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      height: "20%",
                      backgroundColor: "black",
                      p: 1,
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      onClick={handleClickSave}
                      sx={{
                        backgroundColor: "black",
                        color: "#94ddde",
                        borderRadius: "16px",
                        border: "solid 1px ",
                      }}
                    >
                      Save Record
                    </Button>

                    <Button
                      onClick={handleClickOpenBackdrop}
                      sx={{
                        backgroundColor: "#ffffff",
                        color: "#94ddde",
                        borderRadius: "16px",
                        border: "solid 1px ",
                      }}
                    >
                      Print / Download Record
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AppointmentContainer;
