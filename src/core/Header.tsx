import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const Header: React.FC = () => {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const { user, error, isLoading } = useUser();

  // Log user details when user is logged in
  if (user) {
    // Function to send user data to backend
    const sendUserData = async () => {
      try {
        const userData = {
          name: user?.name,
          email: user?.email,
          nickname: user?.nickname,
          picture: user?.picture,
          sub: user?.sub,
          updated_at: user?.updated_at,
        };

        const response = await fetch(domainUrl + "/user/addUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          console.log("+");
        } else {
          console.error("-");
        }
      } catch (error) {
        console.error("-", error);
      }
    };

    // Call sendUserData when user is logged in and data is available
    sendUserData();
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const handleLogout = () => {
    // Handle logout logic here
  };

  return (
    <Box sx={{ display: "flex", p: 3 }}>
      <Box
        sx={{
          width: "33vw",
          display: "Flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" color={"#F26B70"}>
          vetrl
        </Typography>
      </Box>
      <Box sx={{ width: "0vw" }}></Box>
      <Box sx={{ width: "66vw", display: "flex", justifyContent: "end" }}>
        {/* If the user is NOT logged in, show the login button. If the user IS logged in, show the logout button. */}
        {user ? (
          <>
            <Link href="/api/auth/logout">
              <Button
                onClick={handleLogout}
                sx={{
                  backgroundColor: "#434063",
                  color: "#f26b70",
                  border: "solid 1px #f26b70",
                  "&:hover": {
                    backgroundColor: "#2D2B42",
                    color: "#F58E92",
                  },
                }}
              >
                Logout
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/api/auth/login">
              <Button
                sx={{
                  color: "#F26B70",
                  border: "solid 1px #F26B70",
                  backgroundColor: "#2D2B42",
                  borderRadius: "16px",
                  ml: 2,
                  "&:hover": {
                    color: "#F58E92",
                    backgroundColor: "#2F2621",
                  },
                }}
              >
                Login
              </Button>
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Header;
