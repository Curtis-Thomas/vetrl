import { Box, Typography } from "@mui/material";

function OverviewCalendarTimeSlot({
  title,
  start,
  end,
  description,
  ownerName,
  ownerPhoneNo,
  ownerEmail,
  animalName,
  animalSpecies,
  animalBreed

}: {
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
}) {

  function randomColor(){
    let colors = ["#f94144", "#f3722c", "#f8961e", "#f9844a", "#f9c74f", "#90be6d", "#43aa8b", "#4d908e", "#577590", "#277da1"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const borderColor = randomColor();
  return (
    <Box
      sx={{
        p: 1,
        mb: 1.5,
        borderRadius: "2px 0px 0px 2px",
        display: "flex",
        borderLeft: "2px solid " + borderColor,
        height: "65%",
        width: "100%",
        "&:hover": {
          backgroundColor: "#F5F5F5",
        },
      }}
    >
      <Box sx={{ width: "20%", height: "100%" }}>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        

          }}
        >
          <Typography variant="subtitle1" >
            {start}-{end}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: "80%", height: "100%",
        borderLeft:"1px solid #BDBEBD",
        pl:1
       }}>
        <Box
          sx={{
            height: "50%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            // backgroundColor:"cyan"
          }}
        >
          <Typography variant="h5" color={"#444444"} sx={{mr:2}}>{title} </Typography>
          <Typography
          color={"#a6a6a6"} >{description}</Typography>
        </Box>
        

        <Box
          sx={{
            height: "50%",
            width: "100%",
            display: "flex",
          
            // backgroundColor:"pink"

          }}
        >
         
             
              <Typography color={"#a6a6a6"} >{ownerName}, {ownerPhoneNo}, {ownerEmail} </Typography>
              <Typography color={"#a6a6a6"} sx={{mr:1, ml:1}}>│ </Typography>
              <Typography color={"#a6a6a6"}>
              {animalName}, {animalSpecies}, {animalBreed}
              </Typography>
                

              
             

       
        
        
         
          
        </Box>
      </Box>
    </Box>
  );
}

export default OverviewCalendarTimeSlot;
