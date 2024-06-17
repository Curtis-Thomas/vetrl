import { Box, Button, TextField, Typography } from "@mui/material";

import { useCallback, useEffect, useState } from "react";

import { useUser } from "@auth0/nextjs-auth0/client";

import axios from "axios";

interface Drug {
  name: string;
  price: number;
  description: string;
  sub: string;
}

function CodexDrugs() {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const { user, error, isLoading } = useUser();

  const [drugName, setDrugName] = useState("");
  const [drugPrice, setDrugPrice] = useState("");
  const [drugDescription, setDrugDescription] = useState("");
  const [drugs, setDrugs] = useState<Drug[]>([]);

  const getDrugsData = useCallback(async () => {
    if (!user) return;
    try {
      const url = domainUrl + `/drugs/drugs/get`;

      const headers = {
        sub: user.sub,
      };

      const response = await axios.get(url, { headers });
      setDrugs(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [user, domainUrl]);

  useEffect(() => {
    getDrugsData();
  }, [getDrugsData]);

  const handleAddDrug = async () => {
    try {
      // Check for empty fields
      if (!user?.sub || !drugName || !drugPrice || !drugDescription) {
        console.error("All fields are required");
        return;
      }

      const drugData = {
        sub: user.sub,
        name: drugName,
        price: drugPrice,
        description: drugDescription,
      };

      const response = await fetch(domainUrl + `/drugs/drug/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(drugData),
      });
      getDrugsData();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteDrug = async (drugName: string) => {
    try {
      if (!user?.sub) {
        console.error("User not found");
        return;
      }

      const drugData = {
        sub: user.sub,
        name: drugName,
      };

      const requestUrl = domainUrl + `/drugs/drug/delete`;
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(drugData),
      };

      const response = await fetch(requestUrl, requestOptions);

      if (response.ok) {
        console.log("Drug deleted");
        getDrugsData(); // Refresh the drug list
      } else {
        console.error("Error deleting drug");
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
              required
              type="text"
              value={drugName}
              margin="normal"
              sx={{ backgroundColor: "#ffffff" }}
              onChange={(e) => setDrugName(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box sx={{ ml: 1 }}>
            <TextField
              autoComplete="off"
              required
              label="Price"
              type="text"
              value={drugPrice}
              sx={{ backgroundColor: "#ffffff" }}
              onChange={(e) => setDrugPrice(e.target.value)}
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
              value={drugDescription}
              sx={{ backgroundColor: "#ffffff" }}
              onChange={(e) => setDrugDescription(e.target.value)}
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
            <Button onClick={handleAddDrug}>Add Drug</Button>
          </Box>
        </Box>

        <Box>
          <Typography sx={{ mb: 1, p: 5 }}>Drug List</Typography>
          <Box sx={{ borderTop: "solid 1px black" }}>
            {drugs.map((drug, index) => (
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
                  <Typography textAlign={"center"}>{drug.name}</Typography>
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
                  <Typography textAlign={"center"}>{drug.price}</Typography>
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
                    {drug.description}
                  </Typography>
                </Box>
                <Box sx={{ width: "10%" }}>
                  <Button
                    onClick={() => handleDeleteDrug(drug.name)}
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

export default CodexDrugs;
