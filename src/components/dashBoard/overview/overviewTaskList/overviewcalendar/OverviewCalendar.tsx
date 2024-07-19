import {
  Backdrop,
  Box,
  Button,
  Icon,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import OverviewCalendarTimeSlot from "./OverviewCalendarTimeSlot";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

import { useEffect, useState } from "react";
import React, { ChangeEvent } from "react";

import AddIcon from "@mui/icons-material/Add";

interface Event {
  title: string;
  start: string;
  end: string;
  description: string;
  ownerName: string;
  ownerPhoneNo: string;
  ownerEmail: string;
  animalName: string;
  animalSpecies: string;
  animalBreed: string;
}

function OverviewCalender(): JSX.Element {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const { user, error, isLoading } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [clientId, setClientId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhoneNo, setOwnerPhoneNo] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [animalName, setAnimalName] = useState("");
  const [animalSpecies, setAnimalSpecies] = useState("");
  const [animalBreed, setAnimalBreed] = useState("");


  const [start, setStart] = useState("00:00");
  const [end, setEnd] = useState("00:00");


  const [backdropState, setBackdropState] = useState(false);
  const [snackBarState, setSnackBarState] = useState(false);

  const currentDate = new Date().toISOString();
  useEffect(() => {
    if (user && domainUrl) {
      const currentDate = new Date().toISOString();
      const getEventsData = async () => {
        try {
          const url = domainUrl + `/event/calendarDay`;
          const headers = {
            sub: user.sub,
            "Custom-Date": currentDate,
          };
          const response = await axios.get(url, { headers });
          setEvents((prevEvents) => {
            if (JSON.stringify(response.data) !== JSON.stringify(prevEvents)) {
              return response.data;
            }
            return prevEvents;
          });
        } catch (error) {
          console.error("Error:", error);
        }
      };
      getEventsData();
    }
  }, [user, domainUrl]);

  const handleAddEvent = async () => {
    try {
      if (!title || !user?.sub) {
        console.error("All fields are required");
        return;
      }
      const eventData = {
        sub: user.sub,
        title,
        date,
        clientId,
        patientId,
        description,
        start,
        end,
        ownerName,
        ownerPhoneNo,
        ownerEmail,
        animalName,
        animalSpecies,
        animalBreed
        

      };
      const response = await fetch(domainUrl + `/event/event/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const getEventsData = async () => {
        try {
          const url = domainUrl + `/event/calendarDay`;

          const headers = {
            sub: user.sub,
            "Custom-Date": currentDate,
          };

          const response = await axios.get(url, { headers });
          if (JSON.stringify(response.data) !== JSON.stringify(events)) {
            setEvents(response.data);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      setSnackBarState(true);

      // Add a delay before calling getEventsData and closing the snackbar
      setTimeout(async () => {
        getEventsData();
        setSnackBarState(false);
        setBackdropState(false);
      }, 1000); // 1000 milliseconds = 1 second

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickCloseBackdrop = () => {
    setBackdropState(false);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputDate = new Date(e.target.value);
    const formattedDate = inputDate.toISOString().split("T")[0];
    setDate(formattedDate);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const dateToday = new Date().toDateString();

  return (
    <Box sx={{ borderRadius: "10px", height: "100%" }}>
      <Backdrop
        open={backdropState}
        sx={{ zIndex: 100, ml: { xs: "0vw", md: "15vw" } }}
      >
        <Box
          sx={{
            height: "100vh",
            width: { xs: "70vw", md: "85vw" },
            p: 2,
            backgroundColor: "#eefafa",
          }}
        >
          <Button onClick={handleClickCloseBackdrop}>Close</Button>
          <Box sx={{ p: 5 }}>
            <Typography variant="h5" gutterBottom>
              Add Event - Title and Date Required
            </Typography>

            <TextField
              sx={{ backgroundColor: "#ffffff" }}
              label="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              sx={{ backgroundColor: "#ffffff", ml: 1 }}
              label="Date"
              required
              type="date"
              value={date}
              onChange={handleDateChange}
              margin="normal"
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              sx={{ ml: 1 }}
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              sx={{ ml: 1 }}
              label="Start Time"
              type="time"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              margin="normal"
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              sx={{ ml: 1 }}
              label="End Time"
              type="time"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              margin="normal"
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
            />
            
          </Box>
          <Box sx={{ p: 5 }}>
           

           <TextField
             sx={{ backgroundColor: "#ffffff" }}
             label="Owner"
             required
             value={ownerName}
             onChange={(e) => setOwnerName(e.target.value)}
             margin="normal"
             autoComplete="off"
             InputLabelProps={{
               shrink: true,
             }}
           />
           <TextField
             sx={{ backgroundColor: "#ffffff", ml: 1 }}
             label="Owner Phone No"
             required
             type="number"
             value={ownerPhoneNo}
             onChange={(e) => setOwnerPhoneNo(e.target.value)}
             margin="normal"
             autoComplete="off"
             InputLabelProps={{
               shrink: true,
             }}
           />

           <TextField
             sx={{ ml: 1 }}
             label="Owner Email"
             value={ownerEmail}
             onChange={(e) => setOwnerEmail(e.target.value)}
             margin="normal"
             autoComplete="off"
             InputLabelProps={{
               shrink: true,
             }}
           />
          
           
         </Box>
          <Box sx={{ p: 5 }}>
           

            <TextField
              sx={{ backgroundColor: "#ffffff" }}
              label="Animal Name"
              required
              value={animalName}
              onChange={(e) => setAnimalName(e.target.value)}
              margin="normal"
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
            />
         

            <TextField
              sx={{ ml: 1 }}
              label="Animal Species"
              value={animalSpecies}
              onChange={(e) => setAnimalSpecies(e.target.value)}
              margin="normal"
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              sx={{ ml: 1 }}
              label="Animal Breed"
           
              value={animalBreed}
              onChange={(e) => setAnimalBreed(e.target.value)}
              margin="normal"
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
            />
           
            
          </Box>
         
          <Box>
              <Button onClick={handleAddEvent}>
               Add Appointment</Button>
            </Box>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={snackBarState}
            autoHideDuration={6000}
            onClose={handleClickCloseBackdrop}
            message="Appointment Added"
          />
        </Box>
      </Backdrop>

      <Box
        sx={{
          height: "10%",
          p: 1,
        }}
      >



        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <Typography variant="h4" color={"#444444"}>{dateToday}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          p: 1,
          height: "80%",
          width: "100%",
          overflowX: "hidden",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            background: "#ffffff",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#000000",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#2F2621",
          },
        }}
      >
        <Box sx={{ height: "15%", width: "100%" }}>
          {events.map((event, index) => (
            <OverviewCalendarTimeSlot
              key={index}
              title={event.title}
              start={event.start}
              end={event.end}
              description={event.description}
              ownerName={event.ownerName}
              ownerPhoneNo={event.ownerPhoneNo}
              ownerEmail={event.ownerEmail}
              animalName={event.animalName}
              animalSpecies={event.animalSpecies}
              animalBreed={event.animalBreed}
            />
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          height: "10%",
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          border: "none",
        }}
      >
        <Button
          sx={{
            width: "15%",
            height: "37.5%",
            borderRadius: "30px",
            mr: 1,
            backgroundColor:" #BAE4F2",
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            p:0.5
          }}
          onClick={() => setBackdropState(true)}
        >
          <Box sx={{height:"100%", width:"85%", display:"flex", justifyContent:"center", alignItems:"center"}}>
         <Typography sx={{textTransform:"none"}}>Add appointment</Typography>

          </Box>
          <Box sx={{height:"100%", width:"15%"
            , display:"flex", justifyContent:"center", alignItems:"center"
          }}>
          <AddIcon
            sx={{
              backgroundColor: "white",
              borderRadius: "30px",
              color: "#BAE4F2",
            }}
          />
          </Box>
        
        </Button>
      </Box>
    
    </Box>
  );
}

export default OverviewCalender;
