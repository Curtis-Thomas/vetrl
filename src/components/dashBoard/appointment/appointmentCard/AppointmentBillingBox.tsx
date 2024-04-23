import { Box, TextField, Typography } from "@mui/material";
import { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store"; // import your store type

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
    <Box sx={{ width: "100%", p: 1 }}>
      <Box
        sx={{
          display: "flex",
          height: "10%",
          width: "100%",
          border: "solid 1px black",
          p: 1,
        }}
      >
        <Box sx={{ width: "20%", height: "100%" }}></Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>Tax%</Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>Tax sum</Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>Price tax 0%</Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>Price + tax</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "15%",
          width: "100%",
          border: "solid 1px black",
          p: 1,
        }}
      >
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>Procedures</Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <TextField
            size="small"
            type="number"
            value={taxProcedures}
            onChange={(e) => setTaxProcedures(Number(e.target.value))}
          />
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>
            {((appointmentCardProceduresPrice * taxProcedures) / 100).toFixed(
              2
            )}
          </Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>
            {(
              appointmentCardProceduresPrice -
              (appointmentCardProceduresPrice * taxProcedures) / 100
            ).toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>{appointmentCardProceduresPrice.toFixed(2)}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "15%",
          width: "100%",
          border: "solid 1px black",
          p: 1,
        }}
      >
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>Medicine</Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <TextField
            size="small"
            type="number"
            value={taxMedicine}
            onChange={(e) => setTaxMedicine(Number(e.target.value))}
          />
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>
            {((appointmentCardMedicinePrice * taxMedicine) / 100).toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>
            {(
              appointmentCardMedicinePrice -
              (appointmentCardMedicinePrice * taxMedicine) / 100
            ).toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>{appointmentCardMedicinePrice.toFixed(2)}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "15%",
          width: "100%",
          border: "solid 1px black",
          p: 1,
        }}
      >
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>Supplies</Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <TextField
            size="small"
            type="number"
            value={taxSupplies}
            onChange={(e) => setTaxSupplies(Number(e.target.value))}
          />
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>
            {((appointmentCardSuppliesPrice * taxSupplies) / 100).toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>
            {(
              appointmentCardSuppliesPrice -
              (appointmentCardSuppliesPrice * taxSupplies) / 100
            ).toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>{appointmentCardSuppliesPrice.toFixed(2)}</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          height: "15%",
          width: "100%",
          border: "solid 1px black",
          p: 1,
        }}
      >
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>Total</Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}></Box>{" "}
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>
            {(
              ((appointmentCardProceduresPrice * taxProcedures) / 100 +
                (appointmentCardMedicinePrice * taxMedicine) / 100 +
                (appointmentCardSuppliesPrice * taxSupplies) / 100) *
              1
            ).toFixed(2)}
          </Typography>
        </Box>{" "}
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>
            {/* {appointmentCardProceduresPrice -
              (appointmentCardProceduresPrice * taxProcedures) / 100 +
              +(
                appointmentCardMedicinePrice -
                (appointmentCardMedicinePrice * taxMedicine) / 100
              ) +
              +(
                appointmentCardSuppliesPrice -
                (appointmentCardSuppliesPrice * taxSupplies) / 100
              )} */}
          </Typography>
        </Box>{" "}
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>
            {(
              appointmentCardProceduresPrice +
              appointmentCardMedicinePrice +
              appointmentCardSuppliesPrice
            ).toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default AppointmentBillingBox;
