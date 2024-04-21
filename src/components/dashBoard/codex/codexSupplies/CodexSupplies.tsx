import { Box, Button, TextField, Typography } from "@mui/material";

import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

import { useCallback, useEffect, useState } from "react";

interface Drug {
  name: string;
  price: number;
  description: string;
  sub: string;
}

function CodexSupplies() {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const { user, error, isLoading } = useUser();

  const [supplyName, setSupplyName] = useState("");
  const [supplyPrice, setSupplyPrice] = useState("");
  const [supplyDescription, setSupplyDescription] = useState("");
  const [supplies, setSupplies] = useState<Drug[]>([]);

  const handleAddSupply = async () => {
    try {
      // Check for empty fields
      if (!user?.sub || !supplyName || !supplyPrice || !supplyDescription) {
        console.error("All fields are required");
        return;
      }

      const supplyData = {
        sub: user.sub,
        name: supplyName,
        price: supplyPrice,
        description: supplyDescription,
      };

      const response = await fetch(domainUrl + `/supplies/supply/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supplyData),
      });
      getSuppliesData();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

  const handleDeleteSupply = async (supplyName: string) => {
    try {
      if (!user?.sub) {
        console.error("User not found");
        return;
      }

      const supplyData = {
        sub: user.sub,
        name: supplyName,
      };

      const requestUrl = domainUrl + `/supplies/supply/delete`;
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supplyData),
      };

      const response = await fetch(requestUrl, requestOptions);

      if (response.ok) {
        console.log("Task deleted");
        getSuppliesData(); // Refresh the task list
      } else {
        console.error("Error deleting task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
              value={supplyName}
              onChange={(e) => setSupplyName(e.target.value)}
              margin="normal"
              required
              sx={{ backgroundColor: "#ffffff" }}
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
              value={supplyPrice}
              sx={{ backgroundColor: "#ffffff" }}
              onChange={(e) => setSupplyPrice(e.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box sx={{ ml: 1 }}>
            <TextField
              autoComplete="off"
              label="Description"
              required
              value={supplyDescription}
              sx={{ backgroundColor: "#ffffff" }}
              onChange={(e) => setSupplyDescription(e.target.value)}
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
            <Button
              onClick={handleAddSupply}
              sx={{
                color: "#ffffff",
                backgroundColor: "#94ddde",
              }}
            >
              Add Supply
            </Button>
          </Box>
        </Box>

        <Box>
          <Typography sx={{ mb: 1, p: 5 }}>Supply List</Typography>
          <Box sx={{ borderTop: "solid 1px black" }}>
            <Box>
              {supplies.map((supply, index) => (
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
                    <Typography textAlign={"center"}>{supply.name}</Typography>
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
                    <Typography textAlign={"center"}>{supply.price}</Typography>
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
                      {supply.description}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "10%" }}>
                    <Button
                      onClick={() => handleDeleteSupply(supply.name)}
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
      </Box>
    </>
  );
}

export default CodexSupplies;
