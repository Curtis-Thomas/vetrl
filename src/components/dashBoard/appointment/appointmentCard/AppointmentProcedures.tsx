import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

interface Procedure {
  name: string;
  price: number;
  description: string;
  sub: string;
}

interface ProceduresDone {
  name: string;
  price: number;
  amount: string;
}

function AppointmentProcedures({
  onTotalPriceChange,
}: {
  onTotalPriceChange: (price: number) => void;
}) {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const { user, error, isLoading } = useUser();

  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [proceduresDone, setProceduresDone] = useState<ProceduresDone[]>([]);

  const [proceduresDoneProcedure, setProceduresDoneProcedure] = useState("");
  const [proceduresDoneAmount, setProceduresDoneAmount] = useState("");
  const [proceduresDonePrice, setProceduresDonePrice] = useState("");

  const [proceduresTotalPrice, setProceduresTotalPrice] = useState(0);

  const formatNumber = (num: number) => num.toFixed(2);

  useEffect(() => {
    onTotalPriceChange(proceduresTotalPrice);
  }, [proceduresTotalPrice, onTotalPriceChange]);
  const getProceduresData = useCallback(async () => {
    if (!user) return;
    try {
      const url = domainUrl + `/procedure/procedures/get`;

      const headers = {
        sub: user.sub,
      };

      const response = await axios.get(url, { headers });
      setProcedures(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [user, domainUrl]);

  useEffect(() => {
    getProceduresData();
  }, [getProceduresData]);

  const filteredProcedures = procedures.filter((procedure) =>
    procedure.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProceduresDone = () => {
    if (!user) return;
    setProceduresDone([
      ...proceduresDone,
      {
        name: proceduresDoneProcedure,
        price: parseInt(proceduresDonePrice),
        amount: proceduresDoneAmount,
      },
    ]);
    setProceduresDoneProcedure("");
    setProceduresDoneAmount("");
    setProceduresDonePrice("");
  };

  useEffect(() => {
    let totalPrice = 0;
    proceduresDone.forEach((procedure) => {
      totalPrice += procedure.price * parseInt(procedure.amount);
    });
    setProceduresTotalPrice(totalPrice);
  }, [proceduresDone]);

  const handleRemoveLastProcedure = () => {
    setProceduresDone(proceduresDone.slice(0, -1));
  };

  const handleClearProceduresDone = () => {
    setProceduresDone([]);
  };
  if (user) {
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Box sx={{ height: "7%" }}>
        <Box sx={{ height: "60%" }}>
          <TextField
            label="Search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            size="small"
            autoComplete="off"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: 200, backgroundColor: "#ffffff" }}
          />
        </Box>
      </Box>
      <Box sx={{ height: "38%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography>Procedures</Typography>
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
            {filteredProcedures.map((procedure, index) => (
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
                  <Typography>{procedure.name}</Typography>
                </Box>
                <Box>
                  <Typography>{procedure.price}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: "55%" }}>
        <Box
          sx={{
            display: " flex",
            height: "10%",
          }}
        >
          <Box sx={{ width: "33.33%" }}>
            <Typography>Procedures</Typography>
          </Box>
          <Box sx={{ width: "33.33%" }}>
            <Typography textAlign="center">Amount</Typography>
          </Box>
          <Box sx={{ width: "33.33%" }}>
            <Typography textAlign="right">Price</Typography>
          </Box>
        </Box>
        <Box sx={{ border: "solid 1px #94ddde", height: "35%" }}>
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
            {proceduresDone.map((procedure, index) => (
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
                  <Typography>{procedure.name}</Typography>
                </Box>
                <Box>
                  <Typography>{procedure.amount}</Typography>
                </Box>
                <Box>
                  <Typography>{procedure.price}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ height: "10%" }}>
          <Typography textAlign={"right"}>
            Total Price: {proceduresTotalPrice}
          </Typography>
        </Box>
        <Box sx={{ height: "45%", display: "flex" }}>
          <Box sx={{ width: "70%", height: "100%" }}>
            <Box sx={{ height: "33.33%" }}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ backgroundColor: "#ffffff" }}
                value={proceduresDoneProcedure}
                label="Procedure"
                size="small"
                autoComplete="off"
                onChange={(event) =>
                  setProceduresDoneProcedure(event.target.value)
                }
              />
            </Box>
            <Box sx={{ height: "33.33%" }}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ backgroundColor: "#ffffff" }}
                value={proceduresDoneAmount}
                label="Amount - Num"
                size="small"
                type="number"
                autoComplete="off"
                onChange={(event) =>
                  setProceduresDoneAmount(event.target.value)
                }
              />
            </Box>
            <Box sx={{ height: "33.33%" }}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ backgroundColor: "#ffffff" }}
                value={proceduresDonePrice}
                label="Price - Num"
                type="number"
                size="small"
                autoComplete="off"
                onChange={(event) => setProceduresDonePrice(event.target.value)}
              />
            </Box>
          </Box>
          <Box sx={{ width: "30%" }}>
            <Button
              sx={{
                backgroundColor: "#ffffff",
                color: "#94ddde",
                borderRadius: "16px",
                border: "solid 1px ",
                width: "100%",
                height: "30%",
                mb: 1,
                fontSize: 10,
              }}
              onClick={handleRemoveLastProcedure}
            >
              Remove Last
            </Button>

            <Button
              sx={{
                backgroundColor: "#ffffff",
                color: "#94ddde",
                borderRadius: "16px",
                border: "solid 1px ",
                width: "100%",
                height: "30%",
                mb: 1,
              }}
              onClick={handleClearProceduresDone}
            >
              Clear
            </Button>

            <Button
              sx={{
                backgroundColor: "#94ddde",
                color: "#ffffff",
                borderRadius: "16px",
                width: "100%",
                height: "30%",
              }}
              onClick={handleAddProceduresDone}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AppointmentProcedures;
