import { Backdrop, Box, Button, TextField, Typography } from "@mui/material";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import CalendarMainCalendar from "./calendarMainCalendar/CalendarMainCalendar";
import axios from "axios";
import React, { ChangeEvent } from "react";
import { set } from "date-fns";

function CalendarContainer() {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const { user, error, isLoading } = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [clientId, setClientId] = useState("");
  const [patientId, setPatientId] = useState("");

  const [start, setStart] = useState("00:00");
  const [end, setEnd] = useState("00:00");

  const [events, setEvents] = useState([]);

  const getEventsData = useCallback(async () => {
    if (!user) return;
    try {
      const url = domainUrl + `/event/events/get`;

      const headers = {
        sub: user.sub,
      };

      const response = await axios.get(url, { headers });
      setEvents(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [user, domainUrl]);

  useEffect(() => {
    getEventsData();
  }, [getEventsData]);

  const handleAddEvent = async () => {
    try {
      // Check for empty fields
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Fetch events again after adding an event
      getEventsData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputDate = new Date(e.target.value);
    const formattedDate = inputDate.toISOString().split("T")[0];
    setDate(formattedDate);
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "70vw",
          backgroundColor: "#eefafa",
          display: { xs: "block", md: "none" },
          p: 5,
        }}
      >
        <Typography>Please use desktop to access Calendar screen</Typography>
      </Box>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          p: 1,
          display: { xs: "none", md: "block" },
        }}
      >
        <Box sx={{ width: "100%", height: "85%" }}>
          <CalendarMainCalendar events={events} />
        </Box>

        <Box sx={{ borderRadius: "16px", p: 1, width: "100%", height: "15%" }}>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "16px",
              p: 1,
              display: "flex",
              height: "100%",
            }}
          >
            <Box
              sx={{
                width: "20%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Add Event
              </Typography>
            </Box>
            <Box sx={{ width: "60%", height: "100%", display: "flex" }}>
              <Box
                sx={{
                  height: "100%",
                  width: "25%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  autoComplete="off"
                  label="Title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ backgroundColor: "#ffffff" }}
                />
              </Box>
              <Box
                sx={{
                  height: "100%",
                  width: "25%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  autoComplete="off"
                  label="Date"
                  type="date"
                  required
                  value={date}
                  sx={{ backgroundColor: "#ffffff" }}
                  onChange={handleDateChange}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box
                sx={{
                  height: "100%",
                  width: "25%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  autoComplete="off"
                  label="Description"
                  value={description}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setDescription(e.target.value)}
                  margin="normal"
                />
              </Box>
              <Box
                sx={{
                  height: "100%",
                  width: "25%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  autoComplete="off"
                  label="Start Time"
                  type="time"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  autoComplete="off"
                  label="End Time"
                  type="time"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                width: "20%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <Button onClick={handleAddEvent}>Add Appointment</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CalendarContainer;
