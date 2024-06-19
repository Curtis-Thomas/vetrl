import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store"; // import your store type

interface Supplies {
  name: string;
  price: number;
  description: string;
  sub: string;
}

interface SuppliesUsed {
  name: string;
  price: number;
  amount: string;
}

function AppointmentSupplies() {
  const dispatch = useDispatch();

  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const { user, error, isLoading } = useUser();

  const [supplies, setSupplies] = useState<Supplies[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suppliesUsed, setSuppliesUsed] = useState<SuppliesUsed[]>([]);

  const [suppliesUsedSupplies, setSuppliesUsedSupplies] = useState("");
  const [suppliesUsedAmount, setSuppliesUsedAmount] = useState("");
  const [suppliesUsedPrice, setSuppliesUsedPrice] = useState("");
  const [suppliesBtnClicked, setSuppliesBtnClicked] = useState(false);

  const appointmentCardSuppliesPrice = useSelector(
    (state: RootState) => state.appointment.appointmentCardSuppliesPrice
  );

  const formatNumber = (num: number) => num.toFixed(2);

  const getSuppliesData = useCallback(async () => {
    if (!user) return;
    try {
      const url = domainUrl + `/supplies/supplies/get`;

      const headers = {
        sub: user.sub,
      };

      const response = await axios.get(url, { headers });
      setSupplies(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [user, domainUrl]);

  useEffect(() => {
    getSuppliesData();
  }, [getSuppliesData]);

  const filteredSupplies = supplies.filter((supplies) =>
    supplies.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSuppliesUsed = () => {
    if (!user) return;
    const newSupply = {
      name: suppliesUsedSupplies,
      price: parseInt(suppliesUsedPrice),
      amount: suppliesUsedAmount,
    };
    setSuppliesUsed([...suppliesUsed, newSupply]);
    setSuppliesUsedSupplies("");
    setSuppliesUsedAmount("");
    setSuppliesUsedPrice("");
    dispatch({
      type: "SET_APPOINTMENT",
      payload: {
        appointmentCardSuppliesPrice:
          appointmentCardSuppliesPrice + newSupply.price,
      },
    });
  };

  const handleRemoveLastSupply = () => {
    if (suppliesUsed.length > 0) {
      // Ensure there is at least one supply to remove
      const lastSupply = suppliesUsed[suppliesUsed.length - 1];
      if (lastSupply && typeof lastSupply.price === "number") {
        // Check if lastSupply is defined and has a numeric price
        setSuppliesUsed(suppliesUsed.slice(0, -1));
        dispatch({
          type: "SET_APPOINTMENT",
          payload: {
            appointmentCardSuppliesPrice:
              appointmentCardSuppliesPrice - lastSupply.price,
          },
        });
      }
    }
  };

  const handleClearSuppliesUsed = () => {
    setSuppliesUsed([]);
    dispatch({
      type: "SET_APPOINTMENT",
      payload: { appointmentCardSuppliesPrice: 0 },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  function btnClickAddSupplies() {
    if (suppliesUsedSupplies && suppliesUsedPrice && suppliesBtnClicked) {
      setTimeout(() => {
        console.log(
          `Adding Supplies: ${suppliesUsedSupplies} with price: ${suppliesUsedPrice}`
        );
        handleAddSuppliesUsed();
        setSuppliesBtnClicked(false);
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
            label="Search"
            value={searchTerm}
            autoComplete="off"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => setSearchTerm(event.target.value)}
            size="small"
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
            <Typography>Supplies</Typography>
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
            {filteredSupplies.map((supplies, index) => (
              <Button
                key={`${supplies.name}-${index}`} // Generate a unique id by combining name and index
                onClick={() => {
                  setSuppliesBtnClicked(true);
                  setSuppliesUsedSupplies(supplies.name);
                  setSuppliesUsedPrice(supplies.price.toString());
                  btnClickAddSupplies();
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
                  <Typography>{supplies.name}</Typography>
                </Box>
                <Box>
                  <Typography>{supplies.price}</Typography>
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
            {suppliesUsed.map((supplies, index) => (
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
                  <Typography>{supplies.name}</Typography>
                </Box>
                <Box>
                  <Typography>{supplies.amount}</Typography>
                </Box>
                <Box>
                  <Typography>{supplies.price}</Typography>
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
            onClick={handleRemoveLastSupply}
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
            onClick={handleClearSuppliesUsed}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AppointmentSupplies;
