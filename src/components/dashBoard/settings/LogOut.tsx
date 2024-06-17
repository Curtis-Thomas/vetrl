import { Box, Button } from "@mui/material";
import Link from "next/link";

function LogOut() {
  return (
    <Box>
      <Box sx={{ width: "33vw", display: "flex", justifyContent: "end" }}>
        <Link href="/api/auth/logout">
          <Button>Log Out</Button>
        </Link>
      </Box>
    </Box>
  );
}

export default LogOut;
