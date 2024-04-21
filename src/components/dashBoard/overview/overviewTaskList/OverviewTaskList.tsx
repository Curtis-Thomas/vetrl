import { Box, Button, TextField, Typography } from "@mui/material";

import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
interface task {
  title: string; // Changed name to title
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
    <Box>
      <Typography variant="h4">Task List</Typography>
      <Box
        sx={{
          height: "55vh",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          // p: 5,
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
                  backgroundColor: "#eefafa",
                  borderRadius: "16px",
                  p: 1,
                  mt: 1,
                  mb: 1,
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      width: "20%",
                      // backgroundColor: "cyan",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h4" sx={{ color: "#94ddde" }}>
                      {task.deadline}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "80%", pl: 5 }}>
                    <Box>
                      <Typography variant="h5">{task.title}</Typography>
                    </Box>
                    <Box>
                      <Typography>{task.description}</Typography>
                    </Box>
                    <Box>
                      <Button
                        onClick={() => handleDeleteTask(task.title)}
                        sx={{
                          color: "#94ddde",
                          backgroundColor: "#eefafa",
                          border: "solid 1px",
                          borderRadius: "16px",
                        }}
                      >
                        {" "}
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
      <Box sx={{ p: 1 }}>
        <Box sx={{ backgroundColor: "#eefafa", p: 1, borderRadius: "16px" }}>
          <Box>
            <TextField
              required
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="dense"
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                backgroundColor: "#ffffff",
                color: "#94ddde",
                width: "100%",
              }}
            />
          </Box>
          <Box>
            <TextField
              label="Description"
              required
              type="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="dense"
              autoComplete="off"
              sx={{
                backgroundColor: "#ffffff",
                color: "#94ddde",
                width: "100%",
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box>
            <TextField
              label="Deadline"
              value={deadline}
              required
              onChange={(e) => setDeadline(e.target.value)}
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                backgroundColor: "#ffffff",
                color: "#94ddde",
                width: "100%",
              }}
              margin="dense"
            />
          </Box>

          <Button
            sx={{
              backgroundColor: "#94ddde",
              color: "#ffffff",
              borderRadius: "16px",
              "&:hover": {
                backgroundColor: "#C1EBEC",
              },
            }}
            onClick={handleAddTask}
          >
            + Add Task
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default OverviewTaskList;
