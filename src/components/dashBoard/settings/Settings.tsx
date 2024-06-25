import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import LogOut from "./LogOut";
import AccountDetails from "./AccountDetails";

import { useState } from "react";

import { useUser } from "@auth0/nextjs-auth0/client";

import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";

function Settings() {
  const dispatch = useDispatch();
  const userSettings = useSelector((state: RootState) => state.settings);
  const { user, error, isLoading } = useUser();

  const [surgeryName, setSurgeryName] = useState("");
  const [surgeryAddressNoStreet, setSurgeryAddressNoStreet] = useState("");
  const [surgeryAddressArea, setSurgeryAddressArea] = useState("");
  const [surgeryAddressPostCode, setSurgeryAddressPostCode] = useState("");
  const [surgeryAddressCountry, setSurgeryAddressCountry] = useState("");
  const [surgeryAddressPhoneNo, setSurgeryAddressPhoneNo] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [currency, setCurrency] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Box
      sx={{
        height: "100vh",
        width: { xs: "70vw", md: "85vw" },
        p: 1,
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          backgroundColor: "#ffffff",
          overflow: "auto",
          borderRadius: "10px",
          p: 1,
        }}
      >
        <Box sx={{ height: "30%", width: "100%" }}>
          <Box sx={{ height: "20%", width: "100%", display: "flex" }}>
            <Box sx={{ height: "100%", width: "50%" }}>
              <Typography variant="h5">Settings</Typography>
            </Box>
            <Box
              sx={{
                height: "100%",
                width: "50%",
                display: "flex",
                justifyContent: "right",
              }}
            >
              <LogOut />
            </Box>
          </Box>
          <Box
            sx={{
              height: "80%",
              width: "100%",
              display: "flex",
            }}
          >
            <Box sx={{ height: "100%", width: "25%" }}>
              <AccountDetails />
            </Box>
            <Box
              sx={{
                height: "100%",
                width: "75%",

                display: "flex",
              }}
            >
              <Box sx={{ height: "100%", width: "50%" }}>
                <Box sx={{ height: "20%", width: "100%" }}>
                  <Typography>
                    <strong>Surgery Name:</strong> {userSettings.surgeryName}
                  </Typography>
                </Box>
                <Box sx={{ height: "20%", width: "100%" }}>
                  <Typography>
                    <strong>Surgery Address:</strong>{" "}
                    {userSettings.surgeryAddressNoStreet}
                  </Typography>
                </Box>
                <Box sx={{ height: "20%", width: "100%" }}>
                  <Typography>
                    <strong>Surgery Area:</strong>{" "}
                    {userSettings.surgeryAddressArea}
                  </Typography>
                </Box>
                <Box sx={{ height: "20%", width: "100%" }}>
                  <Typography>
                    <strong>Surgery Post Code:</strong>{" "}
                    {userSettings.surgeryAddressPostCode}
                  </Typography>
                </Box>
                <Box sx={{ height: "20%", width: "100%" }}>
                  <Typography>
                    <strong>Surgery Country:</strong>{" "}
                    {userSettings.surgeryAddressCountry}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ height: "100%", width: "50%" }}>
                <Box sx={{ height: "33.33%", width: "100%" }}>
                  <Typography>
                    <strong>Surgery Phone No.:</strong>{" "}
                    {userSettings.surgeryAddressPhoneNo}
                  </Typography>
                </Box>
                <Box sx={{ height: "33.33%", width: "100%" }}>
                  <Typography>
                    <strong>Business ID:</strong> {userSettings.businessId}
                  </Typography>
                </Box>
                <Box sx={{ height: "33.33%", width: "100%" }}>
                  <Typography>
                    <strong>Currency:</strong> {userSettings.currency}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            height: "70%",
            width: "100%",
            p: 1,
            borderTop: "dotted 1px grey",
          }}
        >
          <Box
            sx={{
              height: "10%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography color={"red"}>
              Area Currently Under Development
            </Typography>
          </Box>
          <Box sx={{ height: "70%", width: "100%" }}>
            <Box sx={{ height: "10%", width: "100%" }}>
              <Typography>Surgery Details: </Typography>
            </Box>
            <Box sx={{ height: "10%", width: "25%" }}>
              <TextField
                label="Surgery Name"
                variant="outlined"
                size="small"
                fullWidth
                value={surgeryName}
                onChange={(e) => setSurgeryName(e.target.value)}
              />
            </Box>
            <Box sx={{ height: "10%", width: "25%" }}>
              <TextField
                label="Surgery Address - No./Street"
                variant="outlined"
                size="small"
                fullWidth
                value={surgeryAddressNoStreet}
                onChange={(e) => setSurgeryAddressNoStreet(e.target.value)}
              />
            </Box>
            <Box sx={{ height: "10%", width: "25%" }}>
              <TextField
                label="Surgery Address - Area"
                variant="outlined"
                size="small"
                fullWidth
                value={surgeryAddressArea}
                onChange={(e) => setSurgeryAddressArea(e.target.value)}
              />
            </Box>
            <Box sx={{ height: "10%", width: "25%" }}>
              <TextField
                label="Surgery Address - Post Code"
                variant="outlined"
                size="small"
                fullWidth
                value={surgeryAddressPostCode}
                onChange={(e) => setSurgeryAddressPostCode(e.target.value)}
              />
            </Box>
            <Box sx={{ height: "10%", width: "25%" }}>
              <TextField
                label="Surgery Address - Country"
                variant="outlined"
                size="small"
                fullWidth
                value={surgeryAddressCountry}
                onChange={(e) => setSurgeryAddressCountry(e.target.value)}
              />
            </Box>
            <Box sx={{ height: "10%", width: "25%" }}>
              <TextField
                label="Surgery Address - Phone No."
                variant="outlined"
                size="small"
                fullWidth
                value={surgeryAddressPhoneNo}
                onChange={(e) => setSurgeryAddressPhoneNo(e.target.value)}
              />
            </Box>
            <Box sx={{ height: "10%", width: "25%" }}>
              <TextField
                label="Business ID"
                variant="outlined"
                size="small"
                fullWidth
                value={businessId}
                onChange={(e) => setBusinessId(e.target.value)}
              />
            </Box>
            <Box sx={{ height: "20%", width: "100%" }}>
              <Button
                onClick={() => {
                  dispatch({
                    type: "SET_USER_SETTINGS",
                    payload: {
                      surgeryName,
                      surgeryAddressNoStreet,
                      surgeryAddressArea,
                      surgeryAddressPostCode,
                      surgeryAddressCountry,
                      surgeryAddressPhoneNo,
                      businessId,
                    },
                  });
                }}
              >
                Save User Settings
              </Button>
            </Box>
          </Box>
          <Box
            sx={{ height: "20%", width: "100%", borderTop: "dotted 1px grey" }}
          >
            <Box sx={{ height: "70%", width: "100%" }}>
              <Typography>Currency:</Typography>
              <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={{ width: 120 }}
              >
                <MenuItem value="€">EUR - €</MenuItem>
                <MenuItem value="$">USD - $</MenuItem>
                <MenuItem value="£">GBP - £</MenuItem>
                <MenuItem value="¥">JPY - ¥</MenuItem>
                <MenuItem value="₹">IND - ₹</MenuItem>
                <MenuItem value="₩">KOR - ₩</MenuItem>
              </Select>
            </Box>
            <Box
              sx={{
                height: "30%",
                width: "100%",
              }}
            >
              <Button
                onClick={() => {
                  dispatch({
                    type: "SET_USER_SETTINGS",
                    payload: { currency },
                  });
                }}
              >
                Save Currency
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Settings;
