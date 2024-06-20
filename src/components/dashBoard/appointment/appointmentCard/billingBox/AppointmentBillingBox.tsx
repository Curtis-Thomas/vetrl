import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store"; // import your store type
import AppointmentBillingBoxCell from "./AppointmentBillingBoxCell";

function AppointmentBillingBox() {
  const dispatch = useDispatch();

  const [taxProcedures, setTaxProcedures] = useState(24);
  const [taxMedicine, setTaxMedicine] = useState(10);
  const [taxSupplies, setTaxSupplies] = useState(24);

  const appointmentCardProceduresPrice = useSelector(
    (state: RootState) => state.appointment.appointmentCardProceduresPrice
  );

  const appointmentCardMedicinePrice = useSelector(
    (state: RootState) => state.appointment.appointmentCardMedicinePrice
  );

  const appointmentCardSuppliesPrice = useSelector(
    (state: RootState) => state.appointment.appointmentCardSuppliesPrice
  );

  // Helper function to format numbers to 2 decimal places
  const formatNumber = (num: number) => num.toFixed(2);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          height: "20%",
          width: "100%",
          borderTop: "solid 3px #ADF5F5",
          borderLeft: "solid 3px #ADF5F5",
          borderRight: "solid 3px #ADF5F5",
          p: 1,
          backgroundColor: "white",
          borderRadius: "16px 16px 0px 0px",
        }}
      >
        <Box sx={{ width: "20%", height: "100%" }}></Box>
        <AppointmentBillingBoxCell justifyContent="center" text="Tax%" />
        <AppointmentBillingBoxCell justifyContent="center" text="Tax sum" />
        <AppointmentBillingBoxCell
          justifyContent="center"
          text="Price tax 0%"
        />
        <AppointmentBillingBoxCell justifyContent="center" text="Price + tax" />
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          height: "20%",
          width: "100%",
          borderTop: "solid 3px #ADF5F5",
          borderLeft: "solid 3px #ADF5F5",
          borderRight: "solid 3px #ADF5F5",
          p: 1,
        }}
      >
        <AppointmentBillingBoxCell justifyContent="left" text="Procedures" />
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            sx={{ width: "70%" }}
            type="number"
            size="small"
            value={taxProcedures}
            onChange={(e) => setTaxProcedures(Number(e.target.value))}
          />
        </Box>
        <AppointmentBillingBoxCell
          justifyContent="center"
          text={(
            (appointmentCardProceduresPrice * taxProcedures) /
            100
          ).toFixed(2)}
        />
        <AppointmentBillingBoxCell
          justifyContent="center"
          text={(
            appointmentCardProceduresPrice -
            (appointmentCardProceduresPrice * taxProcedures) / 100
          ).toFixed(2)}
        />
        <AppointmentBillingBoxCell
          justifyContent="center"
          text={appointmentCardProceduresPrice.toFixed(2)}
        />
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          height: "20%",
          width: "100%",
          borderTop: "solid 3px #ADF5F5",
          borderLeft: "solid 3px #ADF5F5",
          borderRight: "solid 3px #ADF5F5",
          p: 1,
        }}
      >
        <AppointmentBillingBoxCell justifyContent="left" text="Medicine" />
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            sx={{ width: "70%" }}
            type="number"
            size="small"
            value={taxMedicine}
            onChange={(e) => setTaxMedicine(Number(e.target.value))}
          />
        </Box>
        <AppointmentBillingBoxCell
          justifyContent="center"
          text={((appointmentCardMedicinePrice * taxMedicine) / 100).toFixed(2)}
        />
        <AppointmentBillingBoxCell
          justifyContent="center"
          text={(
            appointmentCardMedicinePrice -
            (appointmentCardMedicinePrice * taxMedicine) / 100
          ).toFixed(2)}
        />
        <AppointmentBillingBoxCell
          justifyContent="center"
          text={appointmentCardMedicinePrice.toFixed(2)}
        />
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          height: "20%",
          width: "100%",
          borderTop: "solid 3px #ADF5F5",
          borderLeft: "solid 3px #ADF5F5",
          borderRight: "solid 3px #ADF5F5",
          p: 1,
        }}
      >
        <AppointmentBillingBoxCell justifyContent="left" text="Supplies" />
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            sx={{ width: "70%" }}
            type="number"
            size="small"
            value={taxSupplies}
            onChange={(e) => setTaxSupplies(Number(e.target.value))}
          />
        </Box>
        <AppointmentBillingBoxCell
          justifyContent="center"
          text={((appointmentCardSuppliesPrice * taxSupplies) / 100).toFixed(2)}
        />
        <AppointmentBillingBoxCell
          justifyContent="center"
          text={(
            appointmentCardSuppliesPrice -
            (appointmentCardSuppliesPrice * taxSupplies) / 100
          ).toFixed(2)}
        />
        <AppointmentBillingBoxCell
          justifyContent="center"
          text={appointmentCardSuppliesPrice.toFixed(2)}
        />
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          height: "20%",
          width: "100%",
          border: "solid 3px #ADF5F5",
          p: 1,
          borderRadius: "0px 0px 16px 16px",
        }}
      >
        <AppointmentBillingBoxCell justifyContent="left" text="Total" />
        <Box sx={{ width: "20%", height: "100%" }}></Box>{" "}
        <AppointmentBillingBoxCell
          justifyContent="center"
          text={(
            ((appointmentCardProceduresPrice * taxProcedures) / 100 +
              (appointmentCardMedicinePrice * taxMedicine) / 100 +
              (appointmentCardSuppliesPrice * taxSupplies) / 100) *
            1
          ).toFixed(2)}
        />
        <AppointmentBillingBoxCell
          justifyContent="center"
          text={(
            appointmentCardProceduresPrice -
            (appointmentCardProceduresPrice * taxProcedures) / 100 +
            appointmentCardMedicinePrice -
            (appointmentCardMedicinePrice * taxMedicine) / 100 +
            appointmentCardSuppliesPrice -
            (appointmentCardSuppliesPrice * taxSupplies) / 100
          ).toFixed(2)}
        />
        <AppointmentBillingBoxCell
          justifyContent="center"
          text={(
            appointmentCardProceduresPrice +
            appointmentCardMedicinePrice +
            appointmentCardSuppliesPrice
          ).toFixed(2)}
        />
      </Box>
    </Box>
  );
}

export default AppointmentBillingBox;
