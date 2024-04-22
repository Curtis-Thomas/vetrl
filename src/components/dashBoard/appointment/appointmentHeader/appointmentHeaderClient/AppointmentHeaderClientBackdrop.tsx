import {
  Alert,
  Backdrop,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { useUser } from "@auth0/nextjs-auth0/client";

function AppointmentHeaderClientBackdrop({
  backdropState,
  setBackdropState,
}: {
  backdropState: boolean;
  setBackdropState: (state: boolean) => void;
}) {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const { user, error, isLoading } = useUser();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [country, setCountry] = useState("");

  const [open, setOpen] = useState(false);

  const handleAddClientClickClose = () => {
    setBackdropState(false);
  };

  const handleAddClient = async () => {
    try {
      // Check for empty fields
      if (!user?.sub) {
        console.error("All fields are required");
        return;
      }

      const ClientData = {
        sub: user.sub,

        name,
        phone,
        email,
        businessId,
        streetAddress,
        zipCode,
        city,
        county,
        country,
      };

      const response = await fetch(domainUrl + `/client/client/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ClientData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // If the request was successful, show an alert and clear the input fields show snackbar with success message and close the backdrop

      setName("");
      setPhone("");
      setEmail("");
      setBusinessId("");
      setStreetAddress("");
      setZipCode("");
      setCity("");
      setCounty("");
      setCountry("");

      setOpen(true);

      //wait 1 second and then close the backdrop and snackbar
      setTimeout(() => {
        setOpen(false);
        setBackdropState(false);
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Backdrop
        open={backdropState}
        sx={{
          zIndex: 200,
          ml: "15vw",
          backgroundColor: "#eefafa",

          color: "black",
        }}
      >
        <Box>
          <Box>
            <Typography>Add Client</Typography>
          </Box>
          <Box>
            <TextField
              sx={{ backgroundColor: "white", color: "black" }}
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />
            <TextField
              sx={{ backgroundColor: "#eefafa", color: "black" }}
              label="Phone"
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              margin="normal"
            />
            <TextField
              sx={{ backgroundColor: "#eefafa", color: "black" }}
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
            <TextField
              sx={{ backgroundColor: "#eefafa", color: "black" }}
              label="Business ID"
              value={businessId}
              onChange={(e) => setBusinessId(e.target.value)}
              margin="normal"
            />

            <TextField
              sx={{ backgroundColor: "#eefafa", color: "black" }}
              label="Street Address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              margin="normal"
            />

            <TextField
              sx={{ backgroundColor: "#eefafa", color: "black" }}
              label="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              margin="normal"
            />

            <TextField
              sx={{ backgroundColor: "#eefafa", color: "black" }}
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              margin="normal"
            />

            <TextField
              sx={{ backgroundColor: "#eefafa", color: "black" }}
              label="County"
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              margin="normal"
            />

            <TextField
              sx={{ backgroundColor: "#eefafa", color: "black" }}
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              margin="normal"
            />
            <Box sx={{ display: "flex" }}>
              <Box>
                <Button
                  onClick={handleAddClient}
                  sx={{
                    backgroundColor: "#94ddde",
                    color: "#ffffff",
                    borderRadius: "16px",
                  }}
                >
                  Add Client
                </Button>

                <Snackbar open={open} autoHideDuration={6000}>
                  <Alert severity="success" variant="filled">
                    Client added successfully
                  </Alert>
                </Snackbar>
              </Box>

              <Box sx={{ ml: 1 }}>
                <Button
                  onClick={handleAddClientClickClose}
                  sx={{
                    backgroundColor: "#94ddde",
                    color: "#ffffff",
                    borderRadius: "16px",
                  }}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Backdrop>
    </>
  );
}

export default AppointmentHeaderClientBackdrop;
