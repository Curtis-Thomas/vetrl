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

  const [currentMonth, setCurrentMonth] = useState(format(now, "MMMM yyyy"));

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
      <Box sx={{ display: `${weekView}`, height: "100%", width: "100%" }}>
        <CalendarMainCalendarWeek
          handleMonthClick={handleMonthClick}
          events={events}
        />
      </Box>
    );
  }

  if (monthView === true) {
    let monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Group days by week
    const weeksInMonth = [];
    for (let i = 0; i < daysInMonth.length; i += 7) {
      weeksInMonth.push(daysInMonth.slice(i, i + 7));
    }
    const handleClickPreviousMonth = () => {};

    const handleClickNextMonth = () => {};

    return (
      <Box sx={{ display: `${monthView}`, height: "100%", width: "100%" }}>
        <Box
          sx={{
            backgroundColor: "#ffffff",
            height: "10%",
            width: "100%",
            p: 1,
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        >
          <Box sx={{ display: "flex", height: "100%" }}>
            <Box
              sx={{
                height: "100%",
                width: "25%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button onClick={handleWeekClick}>Week</Button>
              <Button
                sx={{
                  backgroundColor: "#81EFEF",

                  ml: 1,
                  mr: 1,
                }}
                onClick={handleMonthClick}
              >
                Month
              </Button>
            </Box>

            <Box
              sx={{
                height: "100%",
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h5">{currentMonth}</Typography>
            </Box>
            <Box sx={{ width: "25%", display: "flex", height: "100%" }}>
              <Box
                sx={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                  pr: 1,
                }}
              >
                <Button onClick={handleClickPreviousMonth}>
                  Previous Month
                </Button>
              </Box>
              <Box
                sx={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                <Button onClick={handleClickNextMonth}>Next Month</Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            height: "90%",
            backgroundColor: "#ffffff",
            pt: 1,
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
                        <Typography>{format(day, "EEE  dd")}</Typography>
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
                          <Box
                            key={event.id || index}
                            sx={{
                              borderBottom: "solid 1px black",
                              backgroundColor: "#EEFAFA",
                            }}
                          >
                            <Typography>{event.title}</Typography>
                            <Typography>
                              {event.start}-{event.end}
                            </Typography>
                          </Box>
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
