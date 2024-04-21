import { Box, Typography } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";

function AccountDetails() {
  const { user, error, isLoading } = useUser();

  if (user) {
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Box>
      <Typography>Account Details</Typography>

      <Box>
        <Typography>{user?.email} </Typography>
      </Box>
    </Box>
  );
}

export default AccountDetails;
