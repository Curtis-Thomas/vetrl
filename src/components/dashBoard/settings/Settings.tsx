import { Box, Typography } from "@mui/material";
import LogOut from "./LogOut";
import AccountDetails from "./AccountDetails";

import { useUser } from "@auth0/nextjs-auth0/client";

function Settings() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Box
      sx={{
        height: "100vh",
        width: { xs: "70vw", md: "85vw" },
        backgroundColor: "#eefafa",
      }}
    >
      <Box sx={{ p: 1 }}>
        <Typography variant="h3">Settings</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 5 }}>
        <Box>
          <AccountDetails />
        </Box>
        <Box>
          <LogOut />
        </Box>
      </Box>
    </Box>
  );
}

export default Settings;
