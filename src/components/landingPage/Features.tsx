import { Box, Button, Typography } from "@mui/material";

import { useState } from "react";

function Features() {
  const [featuresOverview, setFeaturesOverview] = useState(
    "A comprehensive veterinary management system."
  );
  const [featuresCalendar, setFeaturesCalendar] = useState(
    "Easily manage your appointments and schedule."
  );
  const [featuresBilling, setFeaturesBilling] = useState(
    "Keep track of your billing and payments."
  );
  const [featuresSinglePage, setFeaturesSinglePage] = useState(
    "Avoiding excess clutter and simplifying the user experience."
  );
  const [featuresEasyEdit, setFeaturesEasyEdit] = useState(
    "Improving design with direct feedback from the veterinary community."
  );

  const [overviewButtonBackgroundColor, setOverviewButtonBackgroundColor] =
    useState("#f26b70");
  const [calendarButtonBackgroundColor, setCalendarButtonBackgroundColor] =
    useState("#f26b70");
  const [billingButtonBackgroundColor, setBillingButtonBackgroundColor] =
    useState("#f26b70");
  const [singlePageButtonBackgroundColor, setSinglePageButtonBackgroundColor] =
    useState("#f26b70");
  const [easyEditButtonBackgroundColor, setEasyEditButtonBackgroundColor] =
    useState("#f26b70");

  const [overviewButtonTextColor, setOverviewButtonTextColor] =
    useState("#ffffff");
  const [calendarButtonTextColor, setCalendarButtonTextColor] =
    useState("#ffffff");
  const [billingButtonTextColor, setBillingButtonTextColor] =
    useState("#ffffff");
  const [singlePageButtonTextColor, setSinglePageButtonTextColor] =
    useState("#ffffff");
  const [easyEditButtonTextColor, setEasyEditButtonTextColor] =
    useState("#ffffff");

  function handleButtonBackgroundColorReset() {
    setOverviewButtonBackgroundColor("#f26b70");
    setCalendarButtonBackgroundColor("#f26b70");
    setBillingButtonBackgroundColor("#f26b70");
    setSinglePageButtonBackgroundColor("#f26b70");
    setEasyEditButtonBackgroundColor("#f26b70");
  }

  function handleButtonTextColorReset() {
    setOverviewButtonTextColor("#ffffff");
    setCalendarButtonTextColor("#ffffff");
    setBillingButtonTextColor("#ffffff");
    setSinglePageButtonTextColor("#ffffff");
    setEasyEditButtonTextColor("#ffffff");
  }

  const [activeFeature, setActiveFeature] = useState(featuresOverview);

  return (
    <Box
      sx={{
        backgroundColor: "#94ddde",
        display: { xs: "block", md: "flex" },
        width: "100%",
        pt: 5,
        pb: 5,
        pl: { xs: 0, md: 15 },
        pr: { xs: 0, md: 15 },
      }}
    >
      <Box sx={{ width: { xs: "100%", md: "100%" } }}>
        <Box
          sx={{
            width: "100%",
            pb: 5,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{ fontSize: { xs: 25, md: 50 } }}
          >
            Features
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", pl: 2, pr: 2 }}>
          <Box
            sx={{
              backgroundColor: overviewButtonBackgroundColor,
              color: overviewButtonTextColor,
              borderRadius: "26px",
              border: "solid 1px #f26b70",
              m: { xs: 1, md: 1 },
              p: { xs: 0, md: 1 },
              height: "100%",
            }}
          >
            <Button
              disableRipple
              onClick={() => {
                setActiveFeature(featuresOverview);
                handleButtonBackgroundColorReset();
                setOverviewButtonBackgroundColor("#63CDCF");
                handleButtonTextColorReset();
                setOverviewButtonTextColor("#EF4349");
              }}
              sx={{ color: overviewButtonTextColor }}
            >
              Overview
            </Button>
          </Box>
          <Box
            sx={{
              backgroundColor: calendarButtonBackgroundColor,
              color: calendarButtonTextColor,
              borderRadius: "26px",
              border: "solid 1px #f26b70",
              m: { xs: 1, md: 1 },
              p: { xs: 0, md: 1 },
              height: "100%",
            }}
          >
            <Button
              disableRipple
              onClick={() => {
                setActiveFeature(featuresCalendar);
                handleButtonBackgroundColorReset();
                setCalendarButtonBackgroundColor("#63CDCF");
                handleButtonTextColorReset();
                setCalendarButtonTextColor("#EF4349");
              }}
              sx={{ color: calendarButtonTextColor }}
            >
              Calendar
            </Button>
          </Box>
          <Box
            sx={{
              backgroundColor: billingButtonBackgroundColor,
              color: billingButtonTextColor,
              borderRadius: "26px",
              border: "solid 1px #f26b70",
              m: { xs: 1, md: 1 },
              p: { xs: 0, md: 1 },
              height: "100%",
            }}
          >
            <Button
              disableRipple
              onClick={() => {
                setActiveFeature(featuresBilling);
                handleButtonBackgroundColorReset();
                setBillingButtonBackgroundColor("#63CDCF");
                handleButtonTextColorReset();
                setBillingButtonTextColor("#EF4349");
              }}
              sx={{ color: billingButtonTextColor }}
            >
              Billing
            </Button>
          </Box>
          <Box
            sx={{
              backgroundColor: singlePageButtonBackgroundColor,
              color: singlePageButtonTextColor,
              borderRadius: "26px",
              border: "solid 1px #f26b70",
              m: { xs: 1, md: 1 },
              p: { xs: 0, md: 1 },
              height: "100%",
            }}
          >
            <Button
              disableRipple
              onClick={() => {
                setActiveFeature(featuresSinglePage);
                handleButtonBackgroundColorReset();
                setSinglePageButtonBackgroundColor("#63CDCF");
                handleButtonTextColorReset();
                setSinglePageButtonTextColor("#EF4349");
              }}
              sx={{ color: singlePageButtonTextColor }}
            >
              Single-page layout
            </Button>
          </Box>
          <Box
            sx={{
              backgroundColor: easyEditButtonBackgroundColor,
              color: easyEditButtonTextColor,
              borderRadius: "26px",
              border: "solid 1px #f26b70",
              m: { xs: 1, md: 1 },
              p: { xs: 0, md: 1 },
              height: "100%",
            }}
          >
            <Button
              disableRipple
              onClick={() => {
                setActiveFeature(featuresEasyEdit);
                handleButtonBackgroundColorReset();
                setEasyEditButtonBackgroundColor("#63CDCF");
                handleButtonTextColorReset();
                setEasyEditButtonTextColor("#EF4349");
              }}
              sx={{ color: easyEditButtonTextColor }}
            >
              Easy-edit codex
            </Button>
          </Box>
        </Box>
        <Box sx={{ p: 5, height: "10vh" }}>
          <Typography>{activeFeature}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Features;
