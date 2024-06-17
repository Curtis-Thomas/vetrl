import { Box, Button, TextField, Typography } from "@mui/material";

import { useUser } from "@auth0/nextjs-auth0/client";

import { useCallback, useState, useEffect } from "react";

import axios from "axios";

interface Drug {
  name: string;
  price: number;
  description: string;
  sub: string;
}

function CodexProcedures() {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const { user, error, isLoading } = useUser();

  const [procedureName, setProcedureName] = useState("");
  const [procedurePrice, setProcedurePrice] = useState("");
  const [procedureDescription, setProcedureDescription] = useState("");
  const [procedures, setProcedures] = useState<Drug[]>([]);

  const handleAddProcedure = async () => {
    try {
      // Check for empty fields
      if (
        !user?.sub ||
        !procedureName ||
        !procedurePrice ||
        !procedureDescription
      ) {
        console.error("All fields are required");
        return;
      }

      const procedureData = {
        sub: user.sub,
        name: procedureName,
        price: procedurePrice,
        description: procedureDescription,
      };

      const response = await fetch(domainUrl + `/procedure/procedure/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(procedureData),
      });
      getProceduresData();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteProcedure = async (procedureName: string) => {
    try {
      if (!user?.sub) {
        console.error("User not found");
        return;
      }

      const procedureData = {
        sub: user.sub,
        name: procedureName,
      };

      const requestUrl = domainUrl + `/procedure/procedure/delete`;
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(procedureData),
      };

      const response = await fetch(requestUrl, requestOptions);

      if (response.ok) {
        console.log("Procedure deleted");
        getProceduresData(); // Refresh the procedure list
      } else {
        console.error("Error deleting procedure");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

  return (
    <>
      <Box
        sx={{
          height: "95vh",
          width: "85vw",

          overflowY: "scroll",
        }}
      >
        <Box sx={{ display: "flex", pl: 5, pt: 5, pr: 5 }}>
          <Box>
            <TextField
              autoComplete="off"
              label="Name"
              value={procedureName}
              sx={{ backgroundColor: "#ffffff" }}
              onChange={(e) => setProcedureName(e.target.value)}
              margin="normal"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box sx={{ ml: 1 }}>
            <TextField
              autoComplete="off"
              label="Price"
              required
              type="text"
              value={procedurePrice}
              sx={{ backgroundColor: "#ffffff" }}
              onChange={(e) => setProcedurePrice(e.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box sx={{ ml: 1 }}>
            <TextField
              autoComplete="off"
              required
              label="Description"
              value={procedureDescription}
              sx={{ backgroundColor: "#ffffff" }}
              onChange={(e) => setProcedureDescription(e.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ml: 1,
            }}
          >
            <Button onClick={handleAddProcedure}>Add Procedure</Button>
          </Box>
        </Box>

        <Box>
          <Typography sx={{ mb: 1, p: 5 }}>Procedure List</Typography>
          <Box sx={{ borderTop: "solid 1px black" }}>
            {procedures.map((procedure, index) => (
              <Box
                sx={{
                  display: "flex",
                  borderBottom: "solid 1px black",
                  justifyContent: "center",
                  alignItems: "center",
                  pt: 1,
                  pb: 1,
                }}
                key={index}
              >
                <Box
                  sx={{
                    width: "30%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography textAlign={"center"}>{procedure.name}</Typography>
                </Box>
                <Box
                  sx={{
                    width: "30%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography textAlign={"center"}>
                    {procedure.price}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "30%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography textAlign={"center"}>
                    {procedure.description}
                  </Typography>
                </Box>
                <Box sx={{ width: "10%" }}>
                  <Button
                    onClick={() => handleDeleteProcedure(procedure.name)}
                    sx={{
                      color: "#ffffff",
                      backgroundColor: "#94ddde",
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CodexProcedures;
