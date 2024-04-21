import { Box, Button, Card, Typography } from "@mui/material";

function BenefitsCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <Card
        sx={{
          backgroundColor: "#94ddde",
          color: "#000000",
          p: 1,
          m: 2,
          height: "40vh",
          width: { xs: "100%", md: "30%" },
        }}
      >
        <Box sx={{ height: "50%", p: 2, pt: 5, textAlign: "center" }}>
          <Typography variant="h4">{title}</Typography>
        </Box>
        <Box sx={{ height: "50%", p: 2 }}>
          <Typography variant="h6">{description}</Typography>
        </Box>
      </Card>
    </>
  );
}

export default BenefitsCard;
