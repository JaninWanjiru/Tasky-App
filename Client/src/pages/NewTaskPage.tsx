import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";

function NewTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const { isPending, mutate } = useMutation({
    mutationKey: ["create-task"],
    mutationFn: async (taskData: { title: string; description: string }) => {
      const response = await axiosInstance.post("/api/tasks", taskData);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      } else {
        setError("There was a hiccup on our end. Please try again.");
      }
    },
    onSuccess: () => {
      toast.success("Task created successfully", {
        theme: "light",
        position: "top-center",
      });
      setTitle("");
      setDescription("");
    },
  });

  function handleAddTask() {
    setError("");
    const newTask = { title: title, description: description };
    mutate(newTask);
  }

  return (
    <Box sx={{ bgcolor: "#fff", pt: 2 }}>
      <Card
        elevation={3}
        sx={{ maxWidth: 500, mx: "auto", my: 5, borderRadius: 3 }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" textAlign="center" fontWeight="bold" mb={1}>
            Plan Your Task
          </Typography>
          <Typography textAlign="center" mb={3}>
            Give it a title, set a deadline, and track it with ease.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 1 }}>
              {error}
            </Alert>
          )}

          <Box component="form">
            <Typography color="primary">Title</Typography>
            <TextField
              fullWidth
              type="text"
              size="small"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              sx={{ mb: 2 }}
            />

            <Typography color="primary">Description</Typography>
            <TextField
              fullWidth
              type="text"
              size="small"
              placeholder="Brief description of your task"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              multiline
              rows={5}
              sx={{ mb: 2 }}
            />
            <Button
              type="button"
              variant="contained"
              fullWidth
              size="small"
              onClick={handleAddTask}
              loading={isPending}
              sx={{ fontWeight: "bold", fontSize: 15, borderRadius: 2, mt: 1 }}
            >
              Add Task
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default NewTaskPage;
