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
          backgroundColor: "#434063",
          color: "#AAA9C7",
          p: 1,
          m: 2,
          height: "40vh",
          borderRadius: "26px",
          boxShadow: "10px 10px 10px #53517B",
          width: { xs: "100%", md: "30%" },
        }}
      >
        <Box sx={{ height: "50%", pt: 5, textAlign: "center", pl: 1, pr: 1 }}>
          <Typography variant="h4" component={"h3"}>
            {title}
          </Typography>
        </Box>
        <Box sx={{ height: "50%", textAlign: "center", p: 1 }}>
          <Typography
            variant="subtitle1"
            component={"h5"}
            sx={{ fontSize: "1.5rem" }}
          >
            {description}
          </Typography>
        </Box>
      </Card>
    </>
  );
}

export default BenefitsCard;
