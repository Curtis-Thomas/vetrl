import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store"; // import your store type

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

function AppointmentProcedures() {
  const dispatch = useDispatch();

  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const { user, error, isLoading } = useUser();

  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [proceduresDone, setProceduresDone] = useState<ProceduresDone[]>([]);

  const [proceduresDoneProcedure, setProceduresDoneProcedure] = useState("");
  const [proceduresDoneAmount, setProceduresDoneAmount] = useState("");
  const [proceduresDonePrice, setProceduresDonePrice] = useState("");
  const [proceduresBtnClicked, setProceduresBtnClicked] = useState(false);

  const appointmentCardProceduresPrice = useSelector(
    (state: RootState) => state.appointment.appointmentCardProceduresPrice
  );

  const formatNumber = (num: number) => num.toFixed(2);

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
    const newProcedure = {
      name: proceduresDoneProcedure,
      price: parseInt(proceduresDonePrice),
      amount: proceduresDoneAmount,
    };
    setProceduresDone([...proceduresDone, newProcedure]);
    setProceduresDoneProcedure("");
    setProceduresDoneAmount("");
    setProceduresDonePrice("");
    dispatch({
      type: "SET_APPOINTMENT",
      payload: {
        appointmentCardProceduresPrice:
          appointmentCardProceduresPrice + newProcedure.price,
      },
    });
  };

  const handleRemoveLastProcedure = () => {
    if (proceduresDone.length > 0) {
      // Ensure there is at least one procedure to remove
      const lastProcedure = proceduresDone[proceduresDone.length - 1];
      if (lastProcedure && typeof lastProcedure.price === "number") {
        // Check if lastProcedure is defined and has a numeric price
        setProceduresDone(proceduresDone.slice(0, -1));
        dispatch({
          type: "SET_APPOINTMENT",
          payload: {
            appointmentCardProceduresPrice:
              appointmentCardProceduresPrice - lastProcedure.price,
          },
        });
      }
    }
  };

  const handleClearProceduresDone = () => {
    setProceduresDone([]);
    dispatch({
      type: "SET_APPOINTMENT",
      payload: { appointmentCardProceduresPrice: 0 },
    });
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  function btnClickAddProcedure() {
    if (
      proceduresDoneProcedure &&
      proceduresDonePrice &&
      proceduresBtnClicked
    ) {
      setTimeout(() => {
        console.log(
          `Adding procedure: ${proceduresDoneProcedure} with price: ${proceduresDonePrice}`
        );
        handleAddProceduresDone();
        setProceduresBtnClicked(false);
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
            onChange={(event) => setSearchTerm(event.target.value)}
            size="small"
            autoComplete="off"
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
              <Button
                key={`${procedure.name}-${index}`} // Generate a unique id by combining name and index
                onClick={() => {
                  setProceduresBtnClicked(true);
                  setProceduresDoneProcedure(procedure.name);
                  setProceduresDonePrice(procedure.price.toString());
                  btnClickAddProcedure();
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
                  <Typography>{procedure.name}</Typography>
                </Box>
                <Box>
                  <Typography>{procedure.price}</Typography>
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
            onClick={handleRemoveLastProcedure}
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
            onClick={handleClearProceduresDone}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AppointmentProcedures;
