import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store"; // import your store type

interface Medicine {
  name: string;
  price: number;
  description: string;
  sub: string;
}

interface MedicineUsed {
  name: string;
  price: number;
  amount: string;
}

function AppointmentMedicine() {
  const dispatch = useDispatch();

  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const { user, error, isLoading } = useUser();

  const [medicine, setMedicine] = useState<Medicine[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [medicineUsed, setMedicineUsed] = useState<MedicineUsed[]>([]);

  const [medicineUsedMedicine, setMedicineUsedMedicine] = useState("");
  const [medicineUsedAmount, setMedicineUsedAmount] = useState("");
  const [medicineUsedPrice, setMedicineUsedPrice] = useState("");
  const [medicineBtnClicked, setMedicineBtnClicked] = useState(false);

  const appointmentCardMedicinePrice = useSelector(
    (state: RootState) => state.appointment.appointmentCardMedicinePrice
  );

  const formatNumber = (num: number) => num.toFixed(2);

  const getMedicineData = useCallback(async () => {
    if (!user) return;
    try {
      const url = domainUrl + `/drugs/drugs/get`;

      const headers = {
        sub: user.sub,
      };

      const response = await axios.get(url, { headers });
      setMedicine(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [user, domainUrl]);

  useEffect(() => {
    getMedicineData();
  }, [getMedicineData]);

  const filteredMedicine = medicine.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMedicineUsed = () => {
    if (!user) return;
    const newMedicine = {
      name: medicineUsedMedicine,
      price: parseInt(medicineUsedPrice),
      amount: medicineUsedAmount,
    };
    setMedicineUsed([...medicineUsed, newMedicine]);
    setMedicineUsedMedicine("");
    setMedicineUsedAmount("");
    setMedicineUsedPrice("");
    dispatch({
      type: "SET_APPOINTMENT",
      payload: {
        appointmentCardMedicinePrice:
          appointmentCardMedicinePrice + newMedicine.price,
      },
    });
  };

  const handleRemoveLastMedicine = () => {
    if (medicineUsed.length > 0) {
      // Ensure there is at least one medicine to remove
      const lastMedicine = medicineUsed[medicineUsed.length - 1];
      if (lastMedicine && typeof lastMedicine.price === "number") {
        // Check if lastMedicine is defined and has a numeric price
        setMedicineUsed(medicineUsed.slice(0, -1));
        dispatch({
          type: "SET_APPOINTMENT",
          payload: {
            appointmentCardMedicinePrice:
              appointmentCardMedicinePrice - lastMedicine.price,
          },
        });
      }
    }
  };

  const handleClearMedicineUsed = () => {
    setMedicineUsed([]);
    dispatch({
      type: "SET_APPOINTMENT",
      payload: { appointmentCardMedicinePrice: 0 },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  function btnClickAddMedicine() {
    if (medicineUsedMedicine && medicineUsedPrice && medicineBtnClicked) {
      setTimeout(() => {
        console.log(
          `Adding medicine: ${medicineUsedMedicine} with price: ${medicineUsedPrice}`
        );
        handleAddMedicineUsed();
        setMedicineBtnClicked(false);
      }, 10);
    }
  }

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Box
        sx={{
          height: "10%",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ height: "60%" }}>
          <TextField
            autoComplete="off"
            label="Search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: 200, backgroundColor: "#ffffff" }}
            inputProps={{
              style: { height: "10%" },
            }}
          />
        </Box>
      </Box>
      <Box sx={{ height: "35%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "20%",
          }}
        >
          <Box>
            <Typography>Medicine</Typography>
          </Box>
          <Box>
            <Typography>Price</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            height: "80%",
            overflowX: "hidden",

            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "0.4em",
            },
            "&::-webkit-scrollbar-track": {
              background: "#ffffff",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#000000",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#2F2621",
            },
          }}
        >
          <Box
            sx={{
              borderRadius: "16px",
            }}
          >
            {filteredMedicine.map((medicine, index) => (
              <Button
                key={`${medicine.name}-${index}`} // Generate a unique id by combining name and index
                onClick={() => {
                  setMedicineBtnClicked(true);
                  setMedicineUsedMedicine(medicine.name);
                  setMedicineUsedPrice(medicine.price.toString());
                  btnClickAddMedicine();
                }}
                sx={{
                  width: "100%",
                  borderRadius: 0,
                  backgroundColor: "#ffffff",
                  border: "none",
                  borderBottom: "1px solid grey",
                  display: "flex",
                  justifyContent: "space-between",
                  p: 1,
                }}
              >
                <Box>
                  <Typography>{medicine.name}</Typography>
                </Box>
                <Box>
                  <Typography>{medicine.price}</Typography>
                </Box>
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: "40%" }}>
        <Box sx={{ border: "solid 1px #94ddde", height: "100%" }}>
          <Box
            sx={{
              height: "100%",
              overflowX: "hidden",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-track": {
                background: "#ffffff",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#000000",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#2F2621",
              },
            }}
          >
            {medicineUsed.map((medicine, index) => (
              <Box
                key={index}
                sx={{
                  borderBottom: "1px solid grey",
                  display: "flex",
                  justifyContent: "space-between",
                  p: 1,
                }}
              >
                <Box>
                  <Typography>{medicine.name}</Typography>
                </Box>
                <Box>
                  <Typography>{medicine.amount}</Typography>
                </Box>
                <Box>
                  <Typography>{medicine.price}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: "15%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              backgroundColor: "#ffffff",
              color: "black",
              border: "solid 1px ",
              width: "45%",
              height: "50%",
            }}
            onClick={handleRemoveLastMedicine}
          >
            Remove Last
          </Button>
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              backgroundColor: "#ffffff",
              color: "black",
              border: "solid 1px ",
              width: "45%",
              height: "50%",
            }}
            onClick={handleClearMedicineUsed}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AppointmentMedicine;
