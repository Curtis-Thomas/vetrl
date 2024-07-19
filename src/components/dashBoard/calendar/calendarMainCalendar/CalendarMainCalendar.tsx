import { Box, Button, Grid, Typography } from "@mui/material";

import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  getMonth,
  getYear,
  getDate,
  getDay,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  addDays,
  isSameDay,
  isSameMonth,
  isSameYear,
  addMonths,

} from "date-fns";
import { useState, useEffect } from "react";
import CalendarMainCalendarWeek from "./CalendarMainCalendarWeek";

import ReactDOMServer from 'react-dom/server';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface Event {
  id: number;
  title: string;
  clientId: string;
  patientId: string;
  date: string;
  description: string;
  start: string;
  end: string;
  ownerName: string;
  ownerPhoneNo: string;
  ownerEmail: string;
  animalName: string;
  animalSpecies: string;
  animalBreed: string;
}

function CalendarMainCalendar({ events }: { events: any[] }): JSX.Element {

  const [activeMonth, setActiveMonth] = useState(new Date());
  
  const [weekView, setWeekView] = useState(true);
  const [monthView, setMonthView] = useState(false);

  const [monthEvents, setMonthEvents] = useState<Event[]>([]);

  const [key1, setKey1] = useState<JSX.Element | string>('');
  const [key2, setKey2] = useState<JSX.Element | string>('')
  const [key3, setKey3] = useState<JSX.Element | string>('')
  const [key4, setKey4] = useState<JSX.Element | string>('')
  const [key5, setKey5] = useState<JSX.Element | string>('')
  const [key6, setKey6] = useState<JSX.Element | string>('')
  const [key7, setKey7] = useState<JSX.Element | string>('')
  const [key8, setKey8] = useState<JSX.Element | string>('')
  const [key9, setKey9] = useState<JSX.Element | string>('')
  const [key10, setKey10] = useState<JSX.Element | string>('')
  const [key11, setKey11] = useState<JSX.Element | string>('')
  const [key12, setKey12] = useState<JSX.Element | string>('')
  const [key13, setKey13] = useState<JSX.Element | string>('')
  const [key14, setKey14] = useState<JSX.Element | string>('')
  const [key15, setKey15] = useState<JSX.Element | string>('')
  const [key16, setKey16] = useState<JSX.Element | string>('')
  const [key17, setKey17] = useState<JSX.Element | string>('')
  const [key18, setKey18] = useState<JSX.Element | string>('')
  const [key19, setKey19] = useState<JSX.Element | string>('')
  const [key20, setKey20] = useState<JSX.Element | string>('')
  const [key21, setKey21] = useState<JSX.Element | string>('')
  const [key22, setKey22] = useState<JSX.Element | string>('')
  const [key23, setKey23] = useState<JSX.Element | string>('')
  const [key24, setKey24] = useState<JSX.Element | string>('')
  const [key25, setKey25] = useState<JSX.Element | string>('')
  const [key26, setKey26] = useState<JSX.Element | string>('')
  const [key27, setKey27] = useState<JSX.Element | string>('')
  const [key28, setKey28] = useState<JSX.Element | string>('')
  const [key29, setKey29] = useState<JSX.Element | string>('')
  const [key30, setKey30] = useState<JSX.Element | string>('')
  const [key31, setKey31] = useState<JSX.Element | string>('')
  const [key32, setKey32] = useState<JSX.Element | string>('')
  const [key33, setKey33] = useState<JSX.Element | string>('')
  const [key34, setKey34] = useState<JSX.Element | string>('')
  const [key35, setKey35] = useState<JSX.Element | string>('')
  const [key36, setKey36] = useState<JSX.Element | string>('')
  const [key37, setKey37] = useState<JSX.Element | string>('')
  const [key38, setKey38] = useState<JSX.Element | string>('')
  const [key39, setKey39] = useState<JSX.Element | string>('')
  const [key40, setKey40] = useState<JSX.Element | string>('')
  const [key41, setKey41] = useState<JSX.Element | string>('')
  const [key42, setKey42] = useState<JSX.Element | string>('')
  







  const now = new Date();
 

 
  useEffect(() => {
    assignDatesToKeys(events);
    
  }, [activeMonth, events]);
  
  const assignDatesToKeys = (events: Event[]) => {
    const setKeyFunctions = [
      setKey1, setKey2, setKey3, setKey4, setKey5, setKey6, setKey7,
      setKey8, setKey9, setKey10, setKey11, setKey12, setKey13, setKey14,
      setKey15, setKey16, setKey17, setKey18, setKey19, setKey20, setKey21,
      setKey22, setKey23, setKey24, setKey25, setKey26, setKey27, setKey28,
      setKey29, setKey30, setKey31, setKey32, setKey33, setKey34, setKey35,
      setKey36, setKey37, setKey38, setKey39, setKey40, setKey41, setKey42,
    ];
  
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
    const monthStart = startOfMonth(activeMonth);
    const monthEnd = endOfMonth(activeMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
    // Calculate the offset for the first day of the month
    const firstDayOffset = (getDay(monthStart) + 6) % 7; // Adjust so Monday is 0
  
    // Initialize all keys with empty values
    setKeyFunctions.forEach(setKey => setKey(''));
  
    // Assign dates to keys starting from the calculated offset
    daysInMonth.forEach((day, index) => {
      const dayName = dayNames[(getDay(day) + 6) % 7]; // Adjust so Monday is 0
      const dayNumber = getDate(day);
      const dayMonth = getMonth(day) + 1; // getMonth returns 0-based month
      const dayYear = getYear(day);
      const dayKey = ` ${dayNumber}`;
  
      // Find events for the current day
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getDate() === dayNumber &&
          eventDate.getMonth() + 1 === dayMonth &&
          eventDate.getFullYear() === dayYear
        );
      });
      
      function randomColor() {
        let colors = ["#FBBCE3",  "#A9DDFB", "#B99BF3", "#F9C74F", "#90BE6D", "#43AA8B", "#4D908E", "#577590", "#277DA1"];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      // Append event details to the dayKey using Box components
      const eventDetails = dayEvents.map(event => {
        const randomBackgroundColor = randomColor();
        return (
          <Box key={event.id} component="span" display="block" sx={{
       
            borderBottom:"solid 1px white",
            display: "flex",
            backgroundColor: randomBackgroundColor,
            "&:hover": {
              backgroundColor: "lightgrey",
            }
          }}>
            <Box sx={{ height: "100%", width: "40%", display: "flex", pl: 0.5, pr: 0.5, borderRight:"solid 1px white" }}>
              <Typography color={"#ffffff"}>
                {event.start}
              </Typography>
              <Typography sx={{ ml: 0.5, mr: 0.5 }}>
                -
              </Typography>
              <Typography color={"#ffffff"}>
                {event.end}
              </Typography>
            </Box>
            <Box sx={{ height: "100%", width: "60%", pl:0.5 }}>
            <Typography color={"#ffffff"}>
              {event.title}
              </Typography>
            </Box>
          </Box>
        );
      });
    
    const fullDayKey = (
      <Box component="div" >
        <Box sx={{display:"flex", justifyContent:"right", p:0.5}}> 
        {dayKey}
        </Box>
        <Box>
        {eventDetails}
        </Box>
       
        
      </Box>
    );
    
    const setKeyFunction = setKeyFunctions[firstDayOffset + index];
   
      setKeyFunction(fullDayKey);
   
    });
  };

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

  
    const handleClickPreviousMonth = () => {
      setActiveMonth(addMonths(activeMonth, -1));
      console.log(activeMonth);
    };

    const handleClickNextMonth = () => {
      setActiveMonth(addMonths(activeMonth, 1));
      console.log(activeMonth);


    };

    const gridHeight = "100%";
    const gridWidth = "14.28%";
    const gridPadding = 0;
    const gridBorder = "solid 10px white"
    

    const boxHeight = "100%";
    const boxWidth = "100%";
  const boxBackgroundColor = "#F8F9F9";
  const boxOverflow = "auto";

  const typographySize = "0.75rem"
  const typographyColor = "black"

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
                  <Button 
                    sx={{backgroundColor:"#FFFFFF",
                color:"#A6A6A6",

                      "&:hover": {
                        backgroundColor:"#F8F9F9"
                      }
      
                    }}
                  
                  onClick={handleClickPreviousMonth}>
                  <KeyboardArrowLeftIcon />
                </Button>
              <Typography variant="h5" sx={{width:"30%", textAlign:"center"}}>  {activeMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Typography>
              <Button onClick={handleClickNextMonth}
              sx={{backgroundColor:"#FFFFFF",
                color:"#A6A6A6",
                "&:hover": {
                  backgroundColor:"#F8F9F9"
                }

              }}
              >
                <KeyboardArrowRightIcon />
              </Button>
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
                           <Button
                sx={{
                  backgroundColor: "#ffffff"
                  , borderRadius:"20px",
                  border:"solid 1px #BAE4F2"

                
                }}
                onClick={handleMonthClick}
              >
                Month
              </Button>
                 
          
            
              </Box>
              <Box
                sx={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
  
                  alignItems: "center",
                }}
              >
         
              <Button

sx={{backgroundColor:"#BAE4F2", borderRadius:"20px"}}

onClick={handleWeekClick}>Week</Button>
             
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
           <Grid container sx={{height:"5%", width:"100%"}}>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
            <Box sx={{height:"100%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center"
          }} key={1}><Typography sx={{fontSize:typographySize, color:typographyColor}}>Monday</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
            <Box sx={{height:"100%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center"
          }} key={2}><Typography sx={{fontSize:typographySize, color:typographyColor}}>Tuesday</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
           <Box sx={{height:"100%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center"
          }} key={3}><Typography sx={{fontSize:typographySize, color:typographyColor}}>Wednesday</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
            <Box sx={{height:"100%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center"
          }} key={4}><Typography sx={{fontSize:typographySize, color:typographyColor}}>Thursday</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
            <Box sx={{height:"100%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center"
          }} key={5}><Typography sx={{fontSize:typographySize, color:typographyColor}}>Friday</Typography></Box>

            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
            <Box sx={{height:"100%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center"
          }} key={6}><Typography sx={{fontSize:typographySize, color:typographyColor}}>Saturday</Typography></Box>
            
              </Grid>
              <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:"100%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center"
          }} key={7}><Typography sx={{fontSize:typographySize, color:typographyColor}}>Sunday</Typography></Box>

            </Grid>

          </Grid>
          <Grid container sx={{height:"16.66%", width:"100%"}}>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
         <Box sx={{height:boxHeight, width:boxWidth,  backgroundColor: key1 ? boxBackgroundColor : '#ffffff', overflow:boxOverflow
         }} key={1}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key1}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth,
           backgroundColor: key2 ? boxBackgroundColor : '#ffffff', overflow:boxOverflow
          }} key={2}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key2}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth,
           backgroundColor: key3 ? boxBackgroundColor : '#ffffff', overflow:boxOverflow
          }} key={3}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key3}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, 
           backgroundColor: key4 ? boxBackgroundColor : '#ffffff', overflow:boxOverflow
          }} key={4}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key4}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, 
           backgroundColor: key5 ? boxBackgroundColor : '#ffffff',overflow:boxOverflow
          }} key={5}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key5}</Typography></Box>

            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth,
           backgroundColor: key6 ? boxBackgroundColor : '#ffffff', overflow:boxOverflow
          }} key={6}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key6}</Typography></Box>
            
              </Grid>
              <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, 
           backgroundColor: key7 ? boxBackgroundColor : '#ffffff',overflow:boxOverflow
          }} key={7}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key7}</Typography></Box>

            </Grid>

          </Grid>
          <Grid container sx={{height:"16.66%", width:"100%"}}>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
         <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
          , overflow:boxOverflow
         }} key={8}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key8}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
            , overflow:boxOverflow
          }} key={9}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key9}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
            , overflow:boxOverflow
          }} key={10}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key10}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
            , overflow:boxOverflow
          }} key={11}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key11}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
            , overflow:boxOverflow
          }} key={12}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key12}</Typography></Box>

            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
            , overflow:boxOverflow
          }} key={13}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key13}</Typography></Box>
            
              </Grid>
              <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
            , overflow:boxOverflow
          }} key={14}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key14}</Typography></Box>

            </Grid>

          </Grid>
          <Grid container sx={{height:"16.66%", width:"100%"}}>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
         <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
          , overflow:boxOverflow
         }} key={15}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key15}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
            , overflow:boxOverflow
          }} key={16}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key16}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
            , overflow:boxOverflow
          }} key={17}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key17}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
            , overflow:boxOverflow
          }} key={18}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key18}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
            , overflow:boxOverflow
          }} key={19}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key19}</Typography>
         
          
          </Box>

            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
            , overflow:boxOverflow
          }} key={20}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key20}</Typography></Box>
            
              </Grid>
              <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
            , overflow:boxOverflow
          }} key={21}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key21}</Typography></Box>

            </Grid>

          </Grid>
          <Grid container sx={{height:"16.66%", width:"100%"}}>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
         <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
          , overflow:boxOverflow
         }} key={22}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key22}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
            , overflow:boxOverflow
          }} key={23}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key23}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
            , overflow:boxOverflow
          }} key={24}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key24}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
            , overflow:boxOverflow
          }} key={25}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key25}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
            , overflow:boxOverflow
          }} key={26}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key26}</Typography></Box>

            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
            , overflow:boxOverflow
          }} key={27}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key27}</Typography></Box>
            
              </Grid>
              <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
            , overflow:boxOverflow
          }} key={28}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key28}</Typography></Box>

            </Grid>

          </Grid>
          <Grid container sx={{height:"16.66%", width:"100%"}}>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
         <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
          , overflow:boxOverflow
         }} key={29}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key29}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
            , overflow:boxOverflow
          }} key={30}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key30}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, backgroundColor:boxBackgroundColor 
            , overflow:boxOverflow
          }} key={31}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key31}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, 
           backgroundColor: key32 ? boxBackgroundColor : '#ffffff', overflow:boxOverflow
          }} key={32}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key32}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, 
           backgroundColor: key33 ? boxBackgroundColor : '#ffffff', overflow:boxOverflow
          }} key={33}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key33}</Typography></Box>

            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, 
           backgroundColor: key34 ? boxBackgroundColor : '#ffffff',overflow:boxOverflow
          }} key={34}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key34}</Typography></Box>
            
              </Grid>
              <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth,  backgroundColor: key35 ? boxBackgroundColor : '#ffffff', overflow:boxOverflow
          }} key={35}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key35}</Typography></Box>

            </Grid>

          </Grid>
          <Grid container sx={{height:"16.66%", width:"100%"}}>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
         <Box sx={{height:boxHeight, width:boxWidth, 
          backgroundColor: key36 ? boxBackgroundColor : '#ffffff',overflow:boxOverflow
         }} key={36}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key36}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, backgroundColor: key37 ? boxBackgroundColor : '#ffffff', overflow:boxOverflow
          }} key={37}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key37}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth,
           backgroundColor: key38 ? boxBackgroundColor : '#ffffff', overflow:boxOverflow
          }} key={38}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key38}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth,
           backgroundColor: key39 ? boxBackgroundColor : '#ffffff', overflow:boxOverflow
          }} key={39}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key39}</Typography></Box>
            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth,
          
          backgroundColor: key40 ? boxBackgroundColor : '#ffffff',overflow:boxOverflow
          }} key={40}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key40}</Typography></Box>

            </Grid>
            <Grid item  sx={{height:gridHeight, width:gridWidth, p:gridPadding, border:gridBorder}}>
          <Box sx={{height:boxHeight, width:boxWidth, 
          backgroundColor: key41 ? boxBackgroundColor : '#ffffff',
            overflow:boxOverflow
          }} key={41}><Typography sx={{fontSize:typographySize, color:typographyColor}}>{key41}</Typography></Box>
            
              </Grid>
              <Grid item sx={{ height: gridHeight, width: gridWidth, p: gridPadding, border: gridBorder }}>
                <Box
                  sx={{
                    height: boxHeight,
                    width: boxWidth,
                    backgroundColor: key42 ? boxBackgroundColor : '#ffffff',
                    overflow: boxOverflow,
                  }}
                  key={42}
                >
                  <Typography sx={{ fontSize: typographySize, color: typographyColor }}>
                    {key42}
                  </Typography>
                </Box>
              </Grid>

          </Grid>
        </Box>
      </Box>
    );
  }

  return <Box></Box>;
}

export default CalendarMainCalendar;
