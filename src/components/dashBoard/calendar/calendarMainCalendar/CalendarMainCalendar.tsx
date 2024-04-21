import { Box, Button, Typography } from "@mui/material";
import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  getMonth,
  getYear,
  getDate,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { useState, useEffect } from "react";
import CalendarMainCalendarWeek from "./CalendarMainCalendarWeek";

interface Event {
  id: number;
  title: string;
  name: string;
  date: string;
  start: string;
  end: string;
}

function CalendarMainCalendar({ events }: { events: any[] }): JSX.Element {
  const [weekView, setWeekView] = useState(true);
  const [monthView, setMonthView] = useState(false);
  const [monthEvents, setMonthEvents] = useState<Event[]>([]);

  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // week starts on Monday
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 }); // week starts on Monday

  const currentMonth = format(now, "MMMM");

  let weekDate = `${format(weekStart, "EEEE, MMMM do, yyyy")} - ${format(
    weekEnd,
    "EEEE, MMMM do, yyyy"
  )}`;
  const monthDate = `${currentMonth}`;

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

  useEffect(() => {
    setMonthEvents(
      events.filter(
        (event) =>
          getMonth(parseISO(event.date)) === getMonth(new Date()) &&
          getYear(parseISO(event.date)) === getYear(new Date())
      )
    );
  }, [events]);

  function handleWeekClick() {
    setWeekView(true);
    setMonthView(false);
  }

  function handleMonthClick() {
    setWeekView(false);
    setMonthView(true);
  }

  if (weekView === true) {
    return (
      <Box sx={{ display: `${weekView}` }}>
        <CalendarMainCalendarWeek
          handleMonthClick={handleMonthClick}
          events={events}
        />
      </Box>
    );
  }

  if (monthView === true) {
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Group days by week
    const weeksInMonth = [];
    for (let i = 0; i < daysInMonth.length; i += 7) {
      weeksInMonth.push(daysInMonth.slice(i, i + 7));
    }

    return (
      <Box sx={{ display: `${monthView}` }}>
        <Box
          sx={{
            backgroundColor: "#ffffff",
            height: "100%",
            width: "100%",
            p: 1,
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        >
          <Box sx={{ display: "flex", height: "10%" }}>
            <Button
              sx={{
                backgroundColor: "#ffffff",
                color: "#94ddde",
                borderRadius: "16px",
                border: "solid 1px ",
              }}
              onClick={handleWeekClick}
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
            <Box>
              <Typography variant="h5">{currentMonth}</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            height: "75vh",
            backgroundColor: "#ffffff",
            pl: 2,
            pr: 2,
            borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
          }}
        >
          {weeksInMonth.map((week, weekIndex) => (
            <Box key={weekIndex} sx={{ display: "flex" }}>
              {week.map((day, dayIndex) => {
                const dayEvents = monthEvents.filter(
                  (event) => getDate(parseISO(event.date)) === getDate(day)
                );

                return (
                  <Box
                    key={dayIndex}
                    sx={{
                      width: "14.28%" /* 100 / 7 */,
                      height: "14.6vh",
                      border: "solid 1px black",

                      backgroundColor: "#ffffff",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        borderBottom: "black solid 1px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ height: "10%" }}>
                        <Typography>{format(day, "dd")}</Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        height: "80%",

                        overflowX: "hidden",
                        overflowY: "auto",

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
                    >
                      {dayEvents
                        .sort(
                          (a, b) =>
                            parseInt(a.start.slice(0, 2)) -
                            parseInt(b.start.slice(0, 2))
                        )
                        .map((event, index) => (
                          <Typography key={index}>
                            {event.title}: {event.start}-{event.end}
                          </Typography>
                        ))}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  return <Box></Box>;
}

export default CalendarMainCalendar;
