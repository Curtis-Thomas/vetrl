import { Box, List, ListItem, Typography } from "@mui/material";

function GuideOverview() {
  return (
    <Box sx={{ height: "100%", width: "100%", overflow: "auto" }}>
      <Box
        sx={{
          height: "20%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          pt: 2,
          pb: 2,
        }}
      >
        <Typography variant="h2">Overview</Typography>
      </Box>
      <Box sx={{ minHeight: "90%", width: "100%", pt: 5 }}>
        <Box
          sx={{
            width: "40%",
            ml: "auto",
            mr: "auto",
            backgroundColor: "black",
            p: 2,
          }}
        >
          <Typography>
            The Overview screen is the default main screen. From here you can:
          </Typography>
          <List>
            <ListItem>- See appointments for the current day</ListItem>
            <ListItem>- Add appointments</ListItem>
            <ListItem>- Task List</ListItem>
            <ListItem>- Add tasks</ListItem>
          </List>
        </Box>
        <Box
          sx={{
            mt: 1,
            width: "40%",
            ml: "auto",
            mr: "auto",
            backgroundColor: "black",
            p: 2,
          }}
        >
          <Typography variant="h3" sx={{ textAlign: "center", pb: 2 }}>
            How To add an appointment
          </Typography>
          <Typography>
            Click the + ADD APPOINTMENT button, this will open the screen sto
            set the appointment.
          </Typography>
          <Typography>
            Appointments can have the following details, if marked with * that
            field is required:
          </Typography>
          <List>
            <ListItem>- Title*</ListItem>
            <ListItem>- Date*</ListItem>
            <ListItem>- Description</ListItem>
            <ListItem>- Start Time</ListItem>
            <ListItem>- End Time</ListItem>
          </List>
          <Typography>
            When the details are filled out and confirmed, click the ADD
            APPOINTMENT button.
          </Typography>
          <Typography>
            If the appointment was added successfully a notification will show
            at the bottom of the screen.
          </Typography>
          <Typography>
            If the appointment is for the same day, it will now show on the
            overview page, if it is on a different day it can be seen on the
            Calendar screen.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default GuideOverview;
