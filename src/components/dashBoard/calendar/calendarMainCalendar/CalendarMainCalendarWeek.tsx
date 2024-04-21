import { Box, Button, Grid, Typography } from "@mui/material";
import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  addDays,
} from "date-fns";
import { useState, useEffect } from "react";

interface Event {
  id: number;
  title: string;
  name: string;
  date: string;
  start: string;
  end: string;
}

function CalendarMainCalendarWeek({
  handleMonthClick,
  events,
}: {
  handleMonthClick: any;
  events: any[];
}): JSX.Element {
  const now = new Date();
  const [weekStart, setWeekStart] = useState(
    startOfWeek(now, { weekStartsOn: 1 })
  ); // week starts on Monday
  const [weekEnd, setWeekEnd] = useState(endOfWeek(now, { weekStartsOn: 1 })); // week starts on Monday

  let weekDate = `${format(weekStart, "EEEE, MMMM do, yyyy")} - ${format(
    weekEnd,
    "EEEE, MMMM do, yyyy"
  )}`;

  const eventsThisWeek = events.filter((event) =>
    isWithinInterval(parseISO(event.date), { start: weekStart, end: weekEnd })
  );

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleClickPreviousWeek = () => {
    const previousWeekStart = startOfWeek(
      new Date(weekStart.setDate(weekStart.getDate() - 7)),
      { weekStartsOn: 1 }
    );
    const previousWeekEnd = endOfWeek(
      new Date(weekEnd.setDate(weekEnd.getDate() - 7)),
      { weekStartsOn: 1 }
    );
    setWeekStart(previousWeekStart);
    setWeekEnd(previousWeekEnd);
  };

  const handleClickNextWeek = () => {
    const nextWeekStart = startOfWeek(
      new Date(weekStart.setDate(weekStart.getDate() + 7)),
      { weekStartsOn: 1 }
    );
    const nextWeekEnd = endOfWeek(
      new Date(weekEnd.setDate(weekEnd.getDate() + 7)),
      { weekStartsOn: 1 }
    );
    setWeekStart(nextWeekStart);
    setWeekEnd(nextWeekEnd);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          height: "100%",
          width: "100%",
          p: 1,
          borderRadius: "16px",
        }}
      >
        <Box sx={{ display: "flex", height: "10%" }}>
          <Box sx={{ width: "25%" }}>
            <Button
              sx={{
                backgroundColor: "#ffffff",
                color: "#94ddde",
                borderRadius: "16px",
                border: "solid 1px ",
              }}
            >
              Week
            </Button>
            <Button
              sx={{
                backgroundColor: "#94ddde",
                color: "#ffffff",
                borderRadius: "16px",
                "&:hover": {
                  backgroundColor: "#C1EBEC",
                },
                ml: 1,
                mr: 1,
              }}
              onClick={handleMonthClick}
            >
              Month
            </Button>
          </Box>
          <Box sx={{ width: "50%" }}>
            <Typography variant="h5">{weekDate}</Typography>
          </Box>
          <Box sx={{ width: "25%", display: "flex" }}>
            <Box
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "right",
                pr: 1,
              }}
            >
              <Button
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#94ddde",
                  borderRadius: "16px",
                  border: "solid 1px ",
                }}
                onClick={handleClickPreviousWeek}
              >
                Previous Week
              </Button>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Button
                sx={{
                  backgroundColor: "black",
                  color: "#94ddde",
                  borderRadius: "16px",
                  border: "solid 1px ",
                }}
                onClick={handleClickNextWeek}
              >
                Next Week
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            height: "75vh",
            backgroundColor: "#ffffff",
            display: "flex",
            p: 1,
          }}
        >
          {days.map((day, index) => {
            const date = addDays(weekStart, index);
            return (
              <Box
                sx={{
                  width: "12.14vw",
                  height: "73vh",
                  border: "solid 1px #2F2621",
                  overflowX: "hidden",
                  overflowY: "auto",
                  color: "black",

                  "&::-webkit-scrollbar": {
                    width: "0.4em",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#2F2621",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#ffffff",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "#2F2621",
                  },
                }}
                key={index}
              >
                <Box>
                  <Typography
                    sx={{
                      borderBottom: "1px #2F2621 solid",
                      textAlign: "center",
                    }}
                  >
                    {day} {format(date, "do")}
                  </Typography>
                </Box>

                <Grid container>
                  {eventsThisWeek
                    .filter(
                      (event) => format(parseISO(event.date), "eeee") === day
                    )
                    .sort((a, b) => parseInt(a.start) - parseInt(b.start))
                    .map((event, index) => (
                      <Grid item key={index + 1} sx={{ width: "100%", p: 1 }}>
                        <Box
                          sx={{
                            border: "solid 1px black",
                            width: "100%",
                            backgroundColor: "#eefafa",
                            borderRadius: "16px",
                            color: "black",
                            p: 1,
                          }}
                        >
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Typography>{event.title}</Typography>
                          </Box>

                          <Typography>{event.description}</Typography>
                          <Box>
                            <Typography>
                              {event.start} - {event.end}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

export default CalendarMainCalendarWeek;
