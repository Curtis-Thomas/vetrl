import { Box, Typography } from "@mui/material";
import BenefitsCard from "./BenefitsCard";

function Benefits() {
  return (
    <Box
      sx={{
        width: "100%",
        pt: 5,
        pb: 5,
        pl: { xs: 0, md: 15 },
        pr: { xs: 0, md: 15 },
      }}
    >
      <Box
        sx={{
          pb: { xs: 5, md: 15 },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          color="#ffffff"
          sx={{ fontSize: { xs: 25, md: 50 } }}
        >
          Creating innovative veterinary management systems
        </Typography>
      </Box>

      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          justifyContent: "space-evenly",
          pl: { xs: 2, md: 0 },
          pr: { xs: 5, md: 0 },
        }}
      >
        <BenefitsCard
          title="Easy and intuitive"
          description="Avoiding excess clutter and simplifying the user experience."
        />

        <BenefitsCard
          title="Low-cost and reliable"
          description="Reduces the management costs of your veterinary practice."
        />

        <BenefitsCard
          title="Veterinarian driven design"
          description="Improving design with direct feedback from the veterinary community."
        />
      </Box>
    </Box>
  );
}

export default Benefits;
