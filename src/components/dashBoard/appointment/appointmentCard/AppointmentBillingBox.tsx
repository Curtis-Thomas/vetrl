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
    <Box sx={{ width: "100%", height: "100%", p: 1 }}>
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
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Tax%</Typography>
        </Box>
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Tax sum</Typography>
        </Box>
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Price tax 0%</Typography>
        </Box>
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Price + tax</Typography>
        </Box>
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
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <Typography>Procedures</Typography>
        </Box>
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            sx={{ width: "70%", backgroundColor: "#ADF5F5" }}
            type="number"
            value={taxProcedures}
            onChange={(e) => setTaxProcedures(Number(e.target.value))}
          />
        </Box>
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>
            {((appointmentCardProceduresPrice * taxProcedures) / 100).toFixed(
              2
            )}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>
            {(
              appointmentCardProceduresPrice -
              (appointmentCardProceduresPrice * taxProcedures) / 100
            ).toFixed(2)}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>{appointmentCardProceduresPrice.toFixed(2)}</Typography>
        </Box>
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
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <Typography>Medicine</Typography>
        </Box>
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            sx={{ width: "70%", backgroundColor: "#ADF5F5" }}
            type="number"
            value={taxMedicine}
            onChange={(e) => setTaxMedicine(Number(e.target.value))}
          />
        </Box>
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>
            {((appointmentCardMedicinePrice * taxMedicine) / 100).toFixed(2)}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>
            {(
              appointmentCardMedicinePrice -
              (appointmentCardMedicinePrice * taxMedicine) / 100
            ).toFixed(2)}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>{appointmentCardMedicinePrice.toFixed(2)}</Typography>
        </Box>
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
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <Typography>Supplies</Typography>
        </Box>
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            sx={{ width: "70%", backgroundColor: "#ADF5F5" }}
            type="number"
            value={taxSupplies}
            onChange={(e) => setTaxSupplies(Number(e.target.value))}
          />
        </Box>
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>
            {((appointmentCardSuppliesPrice * taxSupplies) / 100).toFixed(2)}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>
            {(
              appointmentCardSuppliesPrice -
              (appointmentCardSuppliesPrice * taxSupplies) / 100
            ).toFixed(2)}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>{appointmentCardSuppliesPrice.toFixed(2)}</Typography>
        </Box>
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
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <Typography>Total</Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}></Box>{" "}
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
