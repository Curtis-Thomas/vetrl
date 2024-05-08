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
          variant="h5"
          component="h2"
          color="#ffffff"
          sx={{ fontSize: { xs: 25, md: 50 } }}
        >
          Innovative veterinary computer software.
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
          title="Easy and Intuitive Veterinary Management"
          description="Streamlined Veterinary Management: Simplify operations and de-clutter your workflow."
        />

        <BenefitsCard
          title="Free and Reliable Veterinary Software"
          description="Cost-Effective Solutions: Save on overheads with our affordable veterinary software."
        />

        <BenefitsCard
          title="Veterinarian driven design"
          description="Community-Centric Design: Crafted based on direct input from veterinarians."
        />
      </Box>
    </Box>
  );
}

export default Benefits;
