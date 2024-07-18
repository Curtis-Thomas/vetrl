import { Backdrop, Box, Button, Typography } from "@mui/material";
import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { resetAppointmentData } from "../../../redux/actions/appointmentActions";

import { useUser } from "@auth0/nextjs-auth0/client";
import AppointmentProcedures from "./appointmentCard/appointmentCardCostSections/AppointmentProcedures";
import AppointmentDischargeNotes from "./appointmentCard/AppointmentDischargeNotes";
import AppointmentBillingBox from "./appointmentCard/billingBox/AppointmentBillingBox";
import AppointmentCardHeader from "./appointmentCard/AppointmentCardHeader";

import AppointmentHeaderClientPatient from "./appointmentHeader/AppointmentHeaderClientPatient";
import AppointmentMedicine from "./appointmentCard/appointmentCardCostSections/AppointmentMedicine";
import AppointmentSupplies from "./appointmentCard/appointmentCardCostSections/AppointmentSupplies";
import AppointmentBillBackdrop from "./appointmentBill/AppointmentBillBackdrop";

import axios from "axios";
import { get } from "http";
import CodexClient from "../codex/codexClient/CodexClient";

function AppointmentContainer() {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const { user, error, isLoading } = useUser();

  const [backdropState, setBackdropState] = useState(false);

  const [activeCodexBox, setActiveCodexBox] = useState("procedures");
  const [codexBoxBackgroundProcedures, setCodexBoxBackgroundProcedures] =
    useState("#81EFEF");
  const [codexBoxBackgroundMedicine, setCodexBoxBackgroundMedicine] =
    useState("#ADF5F5");
  const [codexBoxBackgroundSupplies, setCodexBoxBackgroundSupplies] =
    useState("#ADF5F5");

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

  const dispatch = useDispatch();

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all data? Everything will be reset."
      )
    ) {
      dispatch(resetAppointmentData());
      getNextId();
      // Reset active codex box

      setActiveCodexBox("medicine");
      setTimeout(() => {
        setActiveCodexBox("procedures");
      }, 1);
    }
  };

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
      <AppointmentBillBackdrop
        backdropState={backdropState}
        setBackdropState={setBackdropState}
      />
      <Box
        sx={{
          height: "100%",
          width: "100%",
          backgroundColor: "#eefafa",
          display: { xs: "block", md: "none" },
          p: 5,
        }}
      >
        <Typography>Please use desktop to access appointment screen</Typography>
      </Box>

      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: { xs: "none", md: "block" },
        }}
      >
        <Box
          sx={{
            height: "20%",
            width: "100%",
          }}
        >
          <AppointmentHeaderClientPatient />
        </Box>
        <Box
          sx={{
            height: "80%",
            width: "100%",
            pb: 1,
            pl: 1,
            pr: 1,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              height: "100%",
              width: "100%",
            }}
          >
            <Box sx={{ height: "10%", width: "100%" }}>
              <AppointmentCardHeader />
            </Box>

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
                  width: "35%",
                  height: "100%",
                  p: 1,
                }}
              >
                <Box
                  sx={{
                    height: "10%",
                    width: "100%",
                    display: "flex",
                  }}
                >
                  <Box sx={{ width: "33.33%", height: "100%" }}>
                    <Button
                      onClick={() => {
                        setActiveCodexBox("procedures");
                        setCodexBoxBackgroundProcedures("#81EFEF");
                        setCodexBoxBackgroundMedicine("#ADF5F5");
                        setCodexBoxBackgroundSupplies("#ADF5F5");
                      }}
                      sx={{
                        width: "100%",
                        height: "90%",
                        border: "solid 1px white",
                        borderRadius: "16px 0px 0px 0px",
                        backgroundColor: codexBoxBackgroundProcedures,
                      }}
                    >
                      Procedures
                    </Button>
                  </Box>
                  <Box sx={{ width: "33.33%", height: "100%" }}>
                    <Button
                      onClick={() => {
                        setActiveCodexBox("medicine");
                        setCodexBoxBackgroundMedicine("#81EFEF");
                        setCodexBoxBackgroundProcedures("#ADF5F5");
                        setCodexBoxBackgroundSupplies("#ADF5F5");
                      }}
                      sx={{
                        width: "100%",
                        height: "90%",
                        borderRadius: 0,
                        border: "solid 1px white",
                        backgroundColor: codexBoxBackgroundMedicine,
                      }}
                    >
                      Medicine
                    </Button>
                  </Box>
                  <Box sx={{ width: "33.33%", height: "100%" }}>
                    <Button
                      onClick={() => {
                        setActiveCodexBox("supplies");
                        setCodexBoxBackgroundSupplies("#81EFEF");
                        setCodexBoxBackgroundProcedures("#ADF5F5");
                        setCodexBoxBackgroundMedicine("#ADF5F5");
                      }}
                      sx={{
                        width: "100%",
                        height: "90%",
                        borderRadius: "0px 16px  0px 0px",
                        backgroundColor: codexBoxBackgroundSupplies,

                        border: "solid 1px white",
                      }}
                    >
                      Supplies
                    </Button>
                  </Box>
                </Box>
                <Box sx={{ height: "90%", p: 1 }}>
                  {activeCodexBox === "procedures" && <AppointmentProcedures />}
                  {activeCodexBox === "medicine" && <AppointmentMedicine />}
                  {activeCodexBox === "supplies" && <AppointmentSupplies />}
                </Box>
              </Box>

              <Box sx={{ width: "65%", height: "100%", p: 1 }}>
                <Box
                  sx={{
                    height: "55%",
                    backgroundColor: "#ADF5F5",
                    borderRadius: "16px",
                  }}
                >
                  <AppointmentDischargeNotes />
                </Box>
                <Box sx={{ height: "1%" }}></Box>
                <Box
                  sx={{
                    height: "45%",
                    backgroundColor: "#ADF5F5",
                    borderRadius: "16px",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "85%",
                      p: 1,
                    }}
                  >
                    <AppointmentBillingBox />
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      height: "15%",
                      backgroundColor: "#ADF5F5",
                      p: 0,
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      borderRadius: "0px 0px 16px 16px",
                    }}
                  >
                    <Button onClick={handleClickSave}>Save Record</Button>
                    <Button onClick={handleClickOpenBackdrop}>
                      Print / Download Record
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: "#F0544F",
                        "&:hover": {
                          backgroundColor: "red",
                          color: "white",
                        },
                      }}
                      onClick={handleReset}
                    >
                      Clear Appointment Card
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
