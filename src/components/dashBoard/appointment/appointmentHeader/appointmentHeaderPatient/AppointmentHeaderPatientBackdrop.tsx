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

function AppointmentHeaderPatientBackdrop({
  backdropState,
  setBackdropState,
  clientId,
  searchPatientData,
}: {
  backdropState: boolean;
  setBackdropState: (state: boolean) => void;
  clientId: string;
  searchPatientData: (clientPatients: string[]) => void;
}) {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const { user, error, isLoading } = useUser();

  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [microchip, setMicrochip] = useState("");

  const [open, setOpen] = useState(false);

  const handleAddPatientClickClose = () => {
    setBackdropState(false);
  };

  const handleAddPatient = async () => {
    try {
      // Check for empty fields
      if (!user?.sub) {
        console.error("All fields are required");
        return;
      }

      const PatientData = {
        sub: user.sub,
        clientId,

        name,
        species,
        breed,
        age,
        weight,
        microchip,
      };
      const response = await fetch(domainUrl + `/patient/patient/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(PatientData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // If the request was successful, show an alert and clear the input fields show snackbar with success message and close the backdrop

      setOpen(true);

      //wait 1 second and then close the backdrop and snackbar
      setTimeout(() => {
        setOpen(false);
        setBackdropState(false);
        searchPatientData([clientId]);
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
          zIndex: 100,
          ml: "15vw",
          backgroundColor: "#eefafa",

          color: "black",
        }}
      >
        <Box>
          <Box>
            <Typography>Add Patient Backdrop</Typography>
          </Box>
          <Box>
            <TextField
              sx={{ backgroundColor: "#eefafa", color: "black" }}
              label="ClientId"
              value={clientId}
              disabled
              margin="normal"
            />

            <TextField
              sx={{ backgroundColor: "white", color: "black" }}
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />
            <TextField
              sx={{ backgroundColor: "#eefafa", color: "black" }}
              label="Species"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              margin="normal"
            />
            <TextField
              sx={{ backgroundColor: "#eefafa", color: "black" }}
              label="Breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              margin="normal"
            />
            <TextField
              sx={{ backgroundColor: "#eefafa", color: "black" }}
              label="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              margin="normal"
            />

            <TextField
              sx={{ backgroundColor: "#eefafa", color: "black" }}
              label="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              margin="normal"
            />

            <TextField
              sx={{ backgroundColor: "#eefafa", color: "black" }}
              label="Microchip"
              value={microchip}
              onChange={(e) => setMicrochip(e.target.value)}
              margin="normal"
            />

            <Box sx={{ display: "flex" }}>
              <Box>
                <Button
                  onClick={handleAddPatient}
                  sx={{
                    backgroundColor: "#94ddde",
                    color: "#ffffff",
                    borderRadius: "16px",
                  }}
                >
                  Add Patient
                </Button>

                <Snackbar open={open} autoHideDuration={6000}>
                  <Alert severity="success" variant="filled">
                    Patient added successfully
                  </Alert>
                </Snackbar>
              </Box>

              <Box sx={{ ml: 1 }}>
                <Button
                  onClick={handleAddPatientClickClose}
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

export default AppointmentHeaderPatientBackdrop;
