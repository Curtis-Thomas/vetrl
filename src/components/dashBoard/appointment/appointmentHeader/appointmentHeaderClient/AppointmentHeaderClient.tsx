import {
  Backdrop,
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";

import { useState, useEffect } from "react";

import { useUser } from "@auth0/nextjs-auth0/client";
import AppointmentHeaderClientBackdrop from "./AppointmentHeaderClientBackdrop";

interface Client {
  events: Event[];
  _id: string;
  sub: string;
  businessId: string;
  streetAddress: string;
  zipCode: string;
  city: string;
  county: string;
  country: string;
  address: string;
  email: string;
  phone: string;
  id: string;
  name: string;
  owners: string;
  patients: string;
}

interface ClientData {
  message: string;
  clients: Client[];
}

interface Props {
  onClientNameChange: (clientName: string) => void;
  onClientIdChange: (clientId: string) => void;
  onClientPatientsChange: (clientPatients: string[]) => void;
}

function AppointmentHeaderClient({
  onClientNameChange,
  onClientIdChange,
  onClientPatientsChange,
}: Props) {
  const dispatch = useDispatch();

  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const { user, error, isLoading } = useUser();

  const clientId = useSelector(
    (state: RootState) => state.appointment.appointmentCardClientId
  );

  const handleClientIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET_APPOINTMENT",
      payload: { appointmentCardClientId: event.target.value },
    });
  };

  const [clientSearchData, setClientSearchData] = useState<ClientData | null>(
    null
  );

  const [clientData, setClientData] = useState<Client | null>(null);

  const [clientName, setClientName] = useState("");

  const [patientIds, setPatientIds] = useState<string[]>([]);

  useEffect(() => {
    onClientPatientsChange(patientIds);
  }, [patientIds, onClientPatientsChange]);

  useEffect(() => {
    if (Array.isArray(clientData?.patients) && clientData.patients.length > 0) {
      setPatientIds(clientData.patients);
    } else {
      setPatientIds([]);
    }
  }, [clientData]);

  const [recordsClient, setRecordsClient] = useState(false);
  const [backdropState, setBackdropState] = useState(false);
  const [clientBackdropState, setClientBackdropState] = useState(true);

  const [clientBoxFontSize, setClientBoxFontSize] = useState("0.8rem");

  const handleSelectClient = async () => {
    try {
      if (!user?.sub) {
        return;
      }

      // Clear previous data
      setClientData(null);

      const ClientData = {
        name: clientName,
      };

      const response = await fetch(domainUrl + `/client/client/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          sub: user.sub,
        },
        body: JSON.stringify(ClientData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      setClientSearchData(responseData);

      setClientBackdropState(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleClientSelection = (client: Client) => {
    dispatch({
      type: "SET_APPOINTMENT",
      payload: { appointmentCardClientId: client.id },
    });

    setClientName(client.name); // Set the client name
    setClientData(client); // Set the client data
    onClientNameChange(client.name);
    onClientIdChange(client.id);
    setClientBackdropState(false); // Close the backdrop after a client is selected
  };
  return (
    <>
      <AppointmentHeaderClientBackdrop
        backdropState={backdropState}
        setBackdropState={setBackdropState}
      />

      <Backdrop
        open={clientBackdropState}
        sx={{
          zIndex: "100",
          color: "black",
          backgroundColor: "white",
          borderRadius: "16px",
          border: "solid 10px #ADF5F5",

          marginLeft: "15vw",
          marginTop: "20vh",
          display: "block",
        }}
      >
        <Box sx={{ height: "80vh", overflowX: "auto", p: 1 }}>
          <Box sx={{ p: 1 }}>
            <Typography>Select Client</Typography>
          </Box>
          <Box sx={{ height: "80%", justifyContent: "center" }}>
            {clientSearchData &&
              clientSearchData.clients.map((client) => (
                <Button
                  onClick={() => handleClientSelection(client)}
                  key={client.id}
                  sx={{
                    backgroundColor: "#ffffff",
                    m: 1,
                    p: 1,
                    mb: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    marginLeft: "10%",

                    width: "80%",
                    border: "solid 1px black",
                  }}
                >
                  <Box>
                    <Typography>{client.name}</Typography>
                  </Box>
                  <Box>
                    <Typography>{client.email}</Typography>
                  </Box>
                  <Box>
                    <Typography>{client.phone}</Typography>
                  </Box>
                  <Button onClick={() => handleClientSelection(client)}>
                    Select
                  </Button>
                </Button>
              ))}
          </Box>
        </Box>
      </Backdrop>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          p: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#ffffff",
            height: "100%",
            borderRadius: "16px",
            p: 1,
          }}
        >
          <Box sx={{ height: "70%", width: "100%", p: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "50%",
                width: "100%",
              }}
            >
              <Box sx={{ width: "20%" }}>
                <Typography
                  sx={{
                    fontSize: clientBoxFontSize,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Full name:
                </Typography>

                {clientData && (
                  <Typography
                    sx={{
                      fontSize: clientBoxFontSize,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {clientData.name}
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: "20%" }}>
                <Typography
                  sx={{
                    fontSize: clientBoxFontSize,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Phone No:
                </Typography>

                {clientData && (
                  <Typography
                    sx={{
                      fontSize: clientBoxFontSize,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {clientData.phone}
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: "20%" }}>
                <Typography
                  sx={{
                    fontSize: clientBoxFontSize,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Email:
                </Typography>

                {clientData && (
                  <Typography
                    sx={{
                      fontSize: clientBoxFontSize,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {clientData.email}
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: "20%" }}>
                <Typography
                  sx={{
                    fontSize: clientBoxFontSize,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Business ID:
                </Typography>
                {clientData && (
                  <Typography
                    sx={{
                      fontSize: clientBoxFontSize,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {clientData.businessId}
                  </Typography>
                )}
              </Box>

              <Box sx={{ width: "20%" }}>
                <Typography
                  sx={{
                    fontSize: clientBoxFontSize,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Street Address:
                </Typography>
                {clientData && (
                  <Typography
                    sx={{
                      fontSize: clientBoxFontSize,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {clientData.streetAddress}
                  </Typography>
                )}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "50%",
                width: "100%",
              }}
            >
              <Box sx={{ width: "20%" }}>
                <Typography
                  sx={{
                    fontSize: clientBoxFontSize,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  ZIP Code:
                </Typography>
                {clientData && (
                  <Typography
                    sx={{
                      fontSize: clientBoxFontSize,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {clientData.zipCode}
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: "20%" }}>
                <Typography
                  sx={{
                    fontSize: clientBoxFontSize,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  City:
                </Typography>
                {clientData && (
                  <Typography
                    sx={{
                      fontSize: clientBoxFontSize,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {clientData.city}
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: "20%" }}>
                <Typography
                  sx={{
                    fontSize: clientBoxFontSize,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  County:
                </Typography>
                {clientData && (
                  <Typography
                    sx={{
                      fontSize: clientBoxFontSize,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {clientData.county}
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: "20%" }}>
                <Typography
                  sx={{
                    fontSize: clientBoxFontSize,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Country:
                </Typography>
                {clientData && (
                  <Typography
                    sx={{
                      fontSize: clientBoxFontSize,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {clientData.country}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              height: "30%",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "25%",
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                size="small"
                label="Client Id"
                value={clientData ? clientData.id : ""}
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ width: "80%" }}
                inputProps={{
                  style: { height: "10%" },
                }}
              />
            </Box>
            <Box
              sx={{
                width: "25%",
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                label="Enter Client Name"
                variant="outlined"
                value={clientName}
                size="small"
                autoComplete="off"
                onChange={(event) => setClientName(event.target.value)}
                sx={{ width: "80%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  style: { height: "10%" },
                }}
              />
            </Box>
            <Box
              sx={{
                width: "25%",
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                sx={{
                  ml: 1,
                }}
                onClick={handleSelectClient}
              >
                Select Client
              </Button>
            </Box>
            <Box
              sx={{
                width: "25%",
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button onClick={() => setBackdropState(true)}>
                + New Client
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AppointmentHeaderClient;
