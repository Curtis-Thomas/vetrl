import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store"; // import your store type

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
    const lastSupply = suppliesUsed[suppliesUsed.length - 1];
    setSuppliesUsed(suppliesUsed.slice(0, -1));
    dispatch({
      type: "SET_APPOINTMENT",
      payload: {
        appointmentCardSuppliesPrice:
          appointmentCardSuppliesPrice - lastSupply.price,
      },
    });
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

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Box sx={{ height: "10%", width: "100%" }}>
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

      <Box sx={{ height: "25%" }}>
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
              <Box
                key={index}
                sx={{
                  backgroundColor: "#ffffff",
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
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: "65%" }}>
        <Box sx={{ border: "solid 1px #94ddde", height: "45%" }}>
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
        <Box sx={{ height: "10%" }}></Box>
        <Box sx={{ height: "45%", display: "flex" }}>
          <Box sx={{ width: "70%", height: "100%" }}>
            <Box sx={{ height: "33.33%" }}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ backgroundColor: "#ffffff" }}
                value={suppliesUsedSupplies}
                label="Supplies"
                size="small"
                autoComplete="off"
                onChange={(event) =>
                  setSuppliesUsedSupplies(event.target.value)
                }
                inputProps={{
                  style: { height: "10%" },
                }}
              />
            </Box>
            <Box sx={{ height: "33.33%" }}>
              {/* <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ backgroundColor: "#ffffff" }}
                value={suppliesUsedAmount}
                label="Amount - Num"
                size="small"
                type="number"
                autoComplete="off"
                onChange={(event) => setSuppliesUsedAmount(event.target.value)}
              /> */}
            </Box>
            <Box sx={{ height: "33.33%" }}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ backgroundColor: "#ffffff" }}
                value={suppliesUsedPrice}
                label="Price - Num"
                type="number"
                size="small"
                autoComplete="off"
                onChange={(event) => setSuppliesUsedPrice(event.target.value)}
                inputProps={{
                  style: { height: "10%" },
                }}
              />
            </Box>
          </Box>
          <Box sx={{ width: "30%" }}>
            <Button
              sx={{
                backgroundColor: "#ffffff",
                color: "#94ddde",

                border: "solid 1px ",
                width: "100%",
                height: "30%",
                mb: 1,
                fontSize: 10,
              }}
              onClick={handleRemoveLastSupply}
            >
              Remove Last
            </Button>

            <Button
              sx={{
                backgroundColor: "#ffffff",
                color: "#94ddde",

                border: "solid 1px ",
                width: "100%",
                height: "30%",
                mb: 1,
              }}
              onClick={handleClearSuppliesUsed}
            >
              Clear
            </Button>

            <Button
              sx={{
                width: "100%",
                height: "30%",
              }}
              onClick={handleAddSuppliesUsed}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AppointmentSupplies;
