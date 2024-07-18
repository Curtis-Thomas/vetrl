import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

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
  const [drugForm, setDrugForm] = useState("");
  const [drugStrength, setDrugStrength] = useState("");
  const [drugPackSize, setDrugPackSize] = useState<number>(0);
  const [drugPricePerUnit, setDrugPricePerUnit] = useState<number>(0);
  const [drugVat, setDrugVat] = useState<number>(0);
  const [drugProfitMargin, setDrugProfitMargin] = useState<number>(0);

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
      if (!user?.sub) {
        console.error("All fields are required");
        return;
      }

      const drugData = {
        sub: user.sub,

        name: drugName,
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
          <Box sx={{ height: "100%", width: "10%" }}>
            <TextField
              autoComplete="off"
              label="Drug Name"
              required
              type="text"
              value={drugName}
              margin="normal"
              sx={{ backgroundColor: "#ffffff" }}
              onChange={(e) => setDrugName(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              height: "100%",
              width: "10%",
              display: "flex",
              pt: 1.75,
              pl: 2,
            }}
          >
            <Select
              required
              sx={{ backgroundColor: "#ffffff" }}
              value={drugForm}
              defaultValue="Capsule"
              onChange={(e) => setDrugForm(e.target.value)}
              style={{ width: 120 }}
            >
              <MenuItem value={"Capsule"}>Capsule</MenuItem>
              <MenuItem value={"Cremor"}>Cremor</MenuItem>
              <MenuItem value={"Gel"}>Gel</MenuItem>
              <MenuItem value={"Infusion"}>Infusion</MenuItem>
              <MenuItem value={"Injection"}>Injection</MenuItem>
              <MenuItem value={"Intramam."}>Intramam.</MenuItem>
              <MenuItem value={"Mixture"}>Mixture</MenuItem>
              <MenuItem value={"Oculogtt."}>Oculogtt.</MenuItem>
              <MenuItem value={"Paste"}>Paste</MenuItem>
              <MenuItem value={"Solution"}>Solution</MenuItem>
              <MenuItem value={"Tablet"}>Tablet</MenuItem>
            </Select>
          </Box>
          <Box sx={{ height: "100%", width: "10%" }}>
            <TextField
              autoComplete="off"
              label="Drug Strength"
              required
              type="text"
              value={drugStrength}
              margin="normal"
              sx={{ backgroundColor: "#ffffff" }}
              onChange={(e) => setDrugStrength(e.target.value)}
            />
          </Box>
          <Box sx={{ height: "100%", width: "10%" }}>
            <TextField
              autoComplete="off"
              label="Package Size"
              required
              type="number"
              value={drugPackSize}
              margin="normal"
              sx={{ backgroundColor: "#ffffff" }}
              onChange={(e) => {
                setDrugPackSize(Number(e.target.value));
              }}
            />
          </Box>
          <Box sx={{ height: "100%", width: "10%" }}>
            <TextField
              autoComplete="off"
              label="Price Per Unit"
              required
              type="number"
              value={drugPricePerUnit}
              margin="normal"
              sx={{ backgroundColor: "#ffffff" }}
              onChange={(e) => {
                setDrugPricePerUnit(Number(e.target.value));
              }}
            />
          </Box>
          <Box sx={{ height: "100%", width: "10%" }}>
            <TextField
              autoComplete="off"
              label="Vat %"
              required
              type="number"
              value={drugVat}
              margin="normal"
              sx={{ backgroundColor: "#ffffff" }}
              onChange={(e) => {
                setDrugVat(Number(e.target.value));
              }}
            />
          </Box>
          <Box sx={{ height: "100%", width: "10%" }}>
            <TextField
              autoComplete="off"
              label="price per package(exc vat)"
              type="number"
              value={parseFloat((drugPackSize * drugPricePerUnit).toFixed(2))}
              margin="normal"
              sx={{ backgroundColor: "#ffffff" }}
              disabled
            />
          </Box>
          <Box sx={{ height: "100%", width: "10%" }}>
            <TextField
              autoComplete="off"
              label="Profit Margin %"
              required
              type="number"
              value={drugProfitMargin}
              margin="normal"
              sx={{ backgroundColor: "#ffffff" }}
              onChange={(e) => {
                setDrugProfitMargin(Number(e.target.value));
              }}
            />
          </Box>
          <Box sx={{ height: "100%", width: "10%" }}>
            <TextField
              autoComplete="off"
              label="Total Price Per Unit"
              required
              type="number"
              value={parseFloat(
                (
                  drugPricePerUnit *
                  (1 + drugVat / 100) *
                  (1 + drugProfitMargin / 100)
                ).toFixed(2)
              )}
              margin="normal"
              sx={{ backgroundColor: "#ffffff" }}
              disabled
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
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
