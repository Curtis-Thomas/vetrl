import { Box, List, ListItem, Typography } from "@mui/material";

function GuideAppointment() {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
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
        <Typography variant="h2">Appointment</Typography>
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
            The Appointment screen is where appointment information is filled
            out and invoices are created. From here you can:
          </Typography>
          <List>
            <ListItem>- Select Client</ListItem>
            <ListItem>- Add a new client</ListItem>
            <ListItem>- See patients related to the client</ListItem>
            <ListItem>- Add new patient to client</ListItem>
            <ListItem>
              - Fill out appointment card including, date, time, anamnesis,
              diagnosis, additional notes, discharge notes, costs and tax
              percentages
            </ListItem>
            <ListItem>
              - Create invoice as PDf which can be saved or printed
            </ListItem>
            <ListItem>
              - Save the appointment details which will be stored in the records
              section for future reference
            </ListItem>
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
            How To use the appointment card
          </Typography>
          <Typography sx={{ pb: 1 }}>
            1 - If the client has already been added to the system, enter the
            name into the client name box and click the select client button. If
            it is a new client, click the NEW CLIENT button which will open the
            add new client screen. The minimum client details needed is the
            name.
          </Typography>
          <Typography sx={{ pb: 1 }}>
            2- After the client has been added/selected and the SELECT CLIENT
            button has been clicked, a list of possible clients will be shown.
            Click the required client by checking the name/email/phone no.
          </Typography>
          <Typography sx={{ pb: 1 }}>
            3- Once the client is selected, the patient box will be populated,
            this is the clients pets. If the pet has not been added click the
            NEW PATIENT button and fill in the details, this patient will then
            be linked to the client.{" "}
          </Typography>
          <Typography sx={{ pb: 1 }}>
            4 - Complete the appointment card including details in the boxes:
          </Typography>
          <List>
            <ListItem>- Date</ListItem>
            <ListItem>- Time</ListItem>
            <ListItem>- Anamnesis</ListItem>
            <ListItem>- Diagnosis</ListItem>
            <ListItem>- Additional Notes</ListItem>
            <ListItem>- Discharge Notes</ListItem>
            <ListItem>- Costs Procedures/Medicine/Supplies</ListItem>
            <ListItem>- Tax %</ListItem>
          </List>
          <Typography>
            Note: The Procedures/Medicine/Supplies are set through the codex
            screen, if the required item is not in the list, it can be added
            through the codex screen.
          </Typography>
          <Typography sx={{ pb: 1 }}>
            5 - Once the appointment card is complete, click the PRINT /
            DOWNLOAD RECORD button, this will open the invoice screen. The
            invoice will be populated with the appointment details, the client
            details and the costs. The invoice can be saved as a PDF or printed.
          </Typography>
          <Typography>
            Note: The surgery details and currency symbols are set through the
            Settings screen.
          </Typography>
          <Typography sx={{ pb: 1 }}>
            6 - After the invoice has been saved or printed, close the screen
            showing the invoice and click the SAVE RECORD button. This will save
            the appointment details to the records screen for future reference.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default GuideAppointment;
