import { Box, Button, Typography } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useCallback, useState, useEffect } from "react";
import axios from "axios";

interface Client {
  events: {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    patients: string[];
  }[];
}

function CodexClient() {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const { user, error, isLoading } = useUser();

  const [client, setClient] = useState<Client[]>([]);

  const getClientsData = useCallback(async () => {
    if (!user) return;
    try {
      const url = domainUrl + `/client/client/searchAll`;

      const headers = {
        sub: user.sub,
      };

      const response = await axios.get(url, { headers });
      setClient(response.data.clients);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [user, domainUrl]);

  useEffect(() => {
    getClientsData();
  }, [getClientsData]);

  return (
    <>
      <Box
        sx={{
          height: "95vh",
          width: "85vw",
          overflowY: "scroll",
        }}
      >
        <Box sx={{ display: "flex", pl: 5, pt: 5, pr: 5 }}></Box>

        <Box>
          <Typography sx={{ mb: 1, p: 5 }}>Client List</Typography>
          <Box sx={{ borderTop: "solid 1px black" }}>
            {client[0] &&
              client[0].events.map((clientItem, index) => (
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
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ width: "16.66%" }}>
                      <Typography textAlign={"center"}>
                        Id: {clientItem.id}
                      </Typography>
                    </Box>
                    <Box sx={{ width: "16.66%" }}>
                      <Typography textAlign={"center"}>
                        Name: {clientItem.name}
                      </Typography>
                    </Box>
                    <Box sx={{ width: "16.66%" }}>
                      <Typography textAlign={"center"}>
                        email: {clientItem.email}
                      </Typography>
                    </Box>

                    <Box sx={{ width: "16.66%" }}>
                      <Typography textAlign={"center"}>
                        address: {clientItem.address}
                      </Typography>
                    </Box>
                    <Box sx={{ width: "16.66%" }}>
                      <Typography textAlign={"center"}>
                        phone: {clientItem.phone}
                      </Typography>
                    </Box>
                    <Box sx={{ width: "16.66%" }}>
                      <Typography textAlign={"center"}>
                        patients: {clientItem.patients}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CodexClient;
