import {
  Backdrop,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import OverviewCalendarTimeSlot from "./OverviewCalendarTimeSlot";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

import { useEffect, useState } from "react";
import React, { ChangeEvent } from "react";

interface Event {
  title: string;
  start: string;
  end: string;
  description: string;
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
    <>
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
            <Button
              sx={{
                backgroundColor: "black",
                color: "#94ddde",
                borderRadius: "16px",
                border: "solid 1px ",
              }}
              onClick={handleClickCloseBackdrop}
            >
              Close
            </Button>
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
              <Box>
                <Button
                  onClick={handleAddEvent}
                  sx={{
                    backgroundColor: "#94ddde",
                    color: "#ffffff",
                    borderRadius: "16px",
                  }}
                >
                  Add Appointment
                </Button>
              </Box>
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
            // backgroundColor: "#94ddde",

            height: "10%",

            pl: 2,
          }}
        >
          <Box>
            <Typography variant="h4">Schedule</Typography>
          </Box>
          <Box>
            <Typography variant="h5">{dateToday}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "#ffffff",
            pt: 2,
            pb: 2,
            height: "80%",
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
          <Box sx={{ p: 1 }}>
            {events.map((event, index) => (
              <OverviewCalendarTimeSlot
                key={index}
                title={event.title}
                start={event.start}
                end={event.end}
                description={event.description}
              />
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            height: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              backgroundColor: "#94ddde",
              color: "#ffffff",
              borderRadius: "16px",
              width: "80%",
              height: "80%",
              "&:hover": {
                backgroundColor: "#C1EBEC",
              },
            }}
            onClick={() => setBackdropState(true)}
          >
            + Add appointment
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default OverviewCalender;
