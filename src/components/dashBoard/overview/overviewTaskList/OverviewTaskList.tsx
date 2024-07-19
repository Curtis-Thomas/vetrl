import { Box, Button, TextField, Typography } from "@mui/material";

import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

import AddIcon from "@mui/icons-material/Add";



interface task {
  title: string;
  description: string;
  deadline: string;
}

function OverviewTaskList() {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const { user, error, isLoading } = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [tasks, setTasks] = useState<
    { title: string; description: string; deadline: string }[]
  >([]);

  const handleDeleteTask = async (taskTitle: string) => {
    try {
      if (!user?.sub) {
        console.error("User not found");
        return;
      }

      const taskData = {
        sub: user.sub,
        title: taskTitle,
      };

      const requestUrl = domainUrl + `/task/task/delete`;
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      };

      const response = await fetch(requestUrl, requestOptions);

      if (response.ok) {
        console.log("Task deleted");
        getTasksData(); // Refresh the task list
      } else {
        console.error("Error deleting task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getTasksData = useCallback(async () => {
    if (!user) return;
    try {
      const url = domainUrl + `/task/task/get`;
      const headers = {
        sub: user.sub,
      };
      const response = await axios.get(url, { headers });
      setTasks(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [user, domainUrl]);

  useEffect(() => {
    getTasksData();
  }, [getTasksData]);

  const handleAddTask = async () => {
    try {
      // Check for empty fields
      if (!title || !user?.sub) {
        console.error("All fields are required");
        return;
      }

      const taskData = {
        sub: user.sub,
        title,
        description,
        deadline,
      };

      const response = await fetch(domainUrl + `/task/task/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        console.log("Task added");
        getTasksData();
      } else {
        console.error("Error adding task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Box
        sx={{
          height: "5%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" color={"#444444"}>Task List</Typography>
      </Box>
      <Box
        sx={{
          height: "60%",
          backgroundColor: "#ffffff",
          overflow: "auto",
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
        <Box>
          {tasks &&
            tasks.map((task, index) => (
              <Box
                key={index}
                sx={{
                  p: 1,
                  mt: 1,
                  mb: 1,
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      width: "20%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      
                    }}
                  >
                    <Typography variant="subtitle1" color={"#a6a6a6"}>{task.deadline}</Typography>
                  </Box>
                  <Box sx={{ width: "80%", pl: 5, 
        borderLeft:"1px solid #BDBEBD",

                   }}>
                    <Box>
                      <Typography variant="h5">{task.title}</Typography>
                    </Box>
                    <Box>
                      <Typography color={"#a6a6a6"}>{task.description}</Typography>
                    </Box>
                  
                  </Box>
                  <Box>
                      <Button
                        sx={{
                          color: "red",
              borderRadius: "30px",

                          border: "solid 1px red",
                          backgroundColor: "#ffffff",
                          ml:1
                        }}
                        onClick={() => handleDeleteTask(task.title)}
                      >
                        {" "}
                        Delete
                      </Button>
                    </Box>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
      <Box sx={{ height: "35%" }}>
        <Box
          sx={{
            p: 1,
            height: "100%",
            width: "100%",
          }}
        >
          <Box sx={{ height: "25%", width: "100%" }}>
            <TextField
              required
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="dense"
              autoComplete="off"
              inputProps={{
                style: { height: "10%", backgroundColor:"#D9D9D9" },
              }}
              sx={{
                backgroundColor: "#ffffff",
                color: "#94ddde",
                width: "100%",
              }}
            />
          </Box>
          <Box sx={{ height: "25%", width: "100%" }}>
            <TextField
              label="Description"
              required
              type="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="dense"
              autoComplete="off"
              sx={{
                backgroundColor: "#D9D9D9",
                color: "#94ddde",
                width: "100%",
              }}
              inputProps={{
                style: { height: "10%" },
              }}
            />
          </Box>
          <Box sx={{ height: "25%", width: "100%" }}>
            <TextField
              label="Deadline"
              value={deadline}
              required
              onChange={(e) => setDeadline(e.target.value)}
              autoComplete="off"
              sx={{
                backgroundColor: "#D9D9D9",
                color: "#94ddde",
                width: "100%",
              }}
              inputProps={{
                style: { height: "10%" },
              }}
              margin="dense"
            />
          </Box>
          <Box
            sx={{
              height: "25%",
              width: "100%",
              display: "flex",
              justifyContent: "right",
              alignItems: "center",

            }}
          >
            <Button 
            sx={{
              width: "30%",
              height: "40%",
              borderRadius: "30px",
              mr: 1,
              backgroundColor:" #BAE4F2",
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center",
            }}
             onClick={handleAddTask}>
            <Box sx={{height:"100%", width:"85%", display:"flex", justifyContent:"center", alignItems:"center"}}>
         <Typography sx={{textTransform:"none"}}>Add task</Typography>

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
      </Box>
    </Box>
  );
}

export default OverviewTaskList;
