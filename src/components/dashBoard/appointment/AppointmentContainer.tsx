import { Backdrop, Box, Button, Typography } from "@mui/material";
import React, { useState, useCallback } from "react";

import { useUser } from "@auth0/nextjs-auth0/client";
import AppointmentProcedures from "./appointmentCard/AppointmentProcedures";
import AppointmentDischargeNotes from "./appointmentCard/AppointmentDischargeNotes";
import AppointmentBillingBox from "./appointmentCard/AppointmentBillingBox";
import AppointmentCardHeader from "./appointmentCard/AppointmentCardHeader";

import AppointmentHeaderClientPatient from "./appointmentHeader/AppointmentHeaderClientPatient";
import AppointmentMedicine from "./appointmentCard/AppointmentMedicine";
import AppointmentSupplies from "./appointmentCard/AppointmentSupplies";
import AppointmentBillBackdrop from "./appointmentBill/AppointmentBillBackdrop";
import Link from "next/link";

interface Event {
  title: string;
  start: string;
  end: string;
  description: string;
  date: string;
  patientId: string;
  clientId: string;
}

type Appointment = {
  patientId: string;
};
type PatientData = {
  id: string;
  clientId: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  weight: string;
};

type ContextType = {
  appointmentCardAppointmentNo: string;
  setAppointmentCardAppointmentNo: React.Dispatch<React.SetStateAction<string>>;
  appointmentCardDate: string;
  setAppointmentCardDate: React.Dispatch<React.SetStateAction<string>>;
  appointmentCardTime: string;
  setAppointmentCardTime: React.Dispatch<React.SetStateAction<string>>;
  appointmentCardAnamnesis: string;
  setAppointmentCardAnamnesis: React.Dispatch<React.SetStateAction<string>>;
  appointmentCardDiagnosis: string;
  setAppointmentCardDiagnosis: React.Dispatch<React.SetStateAction<string>>;
  appointmentCardAdditionalNotes: string;
  setAppointmentCardAdditionalNotes: React.Dispatch<
    React.SetStateAction<string>
  >;
  appointmentCardProcedures: string;
  setAppointmentCardProcedures: React.Dispatch<React.SetStateAction<string>>;
  appointmentCardMedicine: string;
  setAppointmentCardMedicine: React.Dispatch<React.SetStateAction<string>>;
  appointmentCardSupplies: string;
  setAppointmentCardSupplies: React.Dispatch<React.SetStateAction<string>>;
  appointmentCardDischargeNotes: string;
  setAppointmentCardDischargeNotes: React.Dispatch<
    React.SetStateAction<string>
  >;
  appointmentCardTotalPrice: number;
  setAppointmentCardTotalPrice: React.Dispatch<React.SetStateAction<number>>;
};

export const Context = React.createContext<ContextType>({
  appointmentCardAppointmentNo: "",
  setAppointmentCardAppointmentNo: () => {},
  appointmentCardDate: "",
  setAppointmentCardDate: () => {},
  appointmentCardTime: "",
  setAppointmentCardTime: () => {},
  appointmentCardAnamnesis: "",
  setAppointmentCardAnamnesis: () => {},
  appointmentCardDiagnosis: "",
  setAppointmentCardDiagnosis: () => {},
  appointmentCardAdditionalNotes: "",
  setAppointmentCardAdditionalNotes: () => {},
  appointmentCardProcedures: "",
  setAppointmentCardProcedures: () => {},
  appointmentCardMedicine: "",
  setAppointmentCardMedicine: () => {},
  appointmentCardSupplies: "",
  setAppointmentCardSupplies: () => {},
  appointmentCardDischargeNotes: "",
  setAppointmentCardDischargeNotes: () => {},
  appointmentCardTotalPrice: 0,
  setAppointmentCardTotalPrice: () => {},
});

function AppointmentContainer() {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const { user, error, isLoading } = useUser();

  const [appointmentCardAppointmentNo, setAppointmentCardAppointmentNo] =
    useState("");
  const [appointmentCardDate, setAppointmentCardDate] = useState("1");
  const [appointmentCardTime, setAppointmentCardTime] = useState("1");
  const [appointmentCardAnamnesis, setAppointmentCardAnamnesis] = useState("1");
  const [appointmentCardDiagnosis, setAppointmentCardDiagnosis] = useState("1");
  const [appointmentCardAdditionalNotes, setAppointmentCardAdditionalNotes] =
    useState("1");
  const [appointmentCardProcedures, setAppointmentCardProcedures] =
    useState("1");
  const [appointmentCardMedicine, setAppointmentCardMedicine] = useState("1");
  const [appointmentCardSupplies, setAppointmentCardSupplies] = useState("1");
  const [appointmentCardDischargeNotes, setAppointmentCardDischargeNotes] =
    useState("1");
  const [appointmentCardTotalPrice, setAppointmentCardTotalPrice] = useState(0);

  const [proceduresTotalPrice, setProceduresTotalPrice] = useState(0);
  const [medicineTotalPrice, setMedicineTotalPrice] = useState(0);
  const [suppliesTotalPrice, setSuppliesTotalPrice] = useState(0);

  const [backdropState, setBackdropState] = useState(false);

  const [appointmentCardClientId, setAppointmentCardClientId] = useState("");
  const [appointmentCardPatientId, setAppointmentCardPatientId] = useState("");

  const [recordSavedBackdrop, setRecordSavedBackdrop] = useState(false);

  const handleAppointmentNo = useCallback((appointmentNo: string) => {
    setAppointmentCardAppointmentNo(appointmentNo);
  }, []);
  const handleAppointmentDate = useCallback((appointmentDate: string) => {
    setAppointmentCardDate(appointmentDate);
  }, []);
  const handleAppointmentTime = useCallback((appointmentTime: string) => {
    setAppointmentCardTime(appointmentTime);
  }, []);
  const handleAppointmentAnamnesis = useCallback((anamnesis: string) => {
    setAppointmentCardAnamnesis(anamnesis);
  }, []);
  const handleAppointmentDiagnosis = useCallback((diagnosis: string) => {
    setAppointmentCardDiagnosis(diagnosis);
  }, []);
  const handleAppointmentAdditionalNotes = useCallback(
    (additionalNotes: string) => {
      setAppointmentCardAdditionalNotes(additionalNotes);
    },
    []
  );

  const handleDischargeNotes = useCallback((dischargeNotes: string) => {
    setAppointmentCardDischargeNotes(dischargeNotes);
  }, []);

  const handleProceduresTotalPrice = useCallback((price: number) => {
    setProceduresTotalPrice(price);
  }, []);
  const handleMedicineTotalPrice = useCallback((price: number) => {
    setMedicineTotalPrice(price);
  }, []);
  const handleSuppliesTotalPrice = useCallback((price: number) => {
    setSuppliesTotalPrice(price);
  }, []);

  const handleTotalPrice = useCallback((totalPrice: number) => {
    setAppointmentCardTotalPrice(totalPrice);
  }, []);

  const handleClickSave = async () => {
    try {
      // Check for empty fields
      if (!user?.sub) {
        console.error("All fields are required");
        return;
      }

      const RecordData = {
        sub: user.sub,
        clientId: appointmentCardClientId,
        patientId: appointmentCardPatientId,
        appointmentNo: appointmentCardAppointmentNo,
        date: appointmentCardDate,
        time: appointmentCardTime,
        anamnesis: appointmentCardAnamnesis,
        diagnosis: appointmentCardDiagnosis,
        additionalNotes: appointmentCardAdditionalNotes,

        //not added to record yet
        procedures: appointmentCardProcedures,
        medicine: appointmentCardMedicine,
        supplies: appointmentCardSupplies,

        dischargeNotes: appointmentCardDischargeNotes,
        totalPrice: appointmentCardTotalPrice,
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
      <Context.Provider
        value={{
          appointmentCardAppointmentNo,
          setAppointmentCardAppointmentNo,
          appointmentCardDate,
          setAppointmentCardDate,
          appointmentCardTime,
          setAppointmentCardTime,
          appointmentCardAnamnesis,
          setAppointmentCardAnamnesis,
          appointmentCardDiagnosis,
          setAppointmentCardDiagnosis,
          appointmentCardAdditionalNotes,
          setAppointmentCardAdditionalNotes,
          appointmentCardProcedures,
          setAppointmentCardProcedures,
          appointmentCardMedicine,
          setAppointmentCardMedicine,
          appointmentCardSupplies,
          setAppointmentCardSupplies,
          appointmentCardDischargeNotes,
          setAppointmentCardDischargeNotes,
          appointmentCardTotalPrice,
          setAppointmentCardTotalPrice,
        }}
      >
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
          <Typography>
            Please use desktop to access appointment screen
          </Typography>
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
              <AppointmentCardHeader
                onAppointmentNoChange={handleAppointmentNo}
                onAppointmentDateChange={handleAppointmentDate}
                onAppointmentTimeChange={handleAppointmentTime}
                onAppointmentAnamnesisChange={handleAppointmentAnamnesis}
                onAppointmentDiagnosisChange={handleAppointmentDiagnosis}
                onAppointmentAdditionalNotesChange={
                  handleAppointmentAdditionalNotes
                }
              />

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
                    <AppointmentProcedures
                      onTotalPriceChange={handleProceduresTotalPrice}
                    />
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
                      <AppointmentMedicine
                        onTotalPriceChange={handleMedicineTotalPrice}
                      />
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
                    <AppointmentSupplies
                      onTotalPriceChange={handleSuppliesTotalPrice}
                    />
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
                    <AppointmentDischargeNotes
                      onAppointmentDischargeNotesChange={handleDischargeNotes}
                    />
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
                      <AppointmentBillingBox
                        proceduresTotalPrice={proceduresTotalPrice}
                        medicineTotalPrice={medicineTotalPrice}
                        suppliesTotalPrice={suppliesTotalPrice}
                        onTotalPriceChange={handleTotalPrice}
                      />
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
      </Context.Provider>
    </>
  );
}

export default AppointmentContainer;
