import {
  Box,
  Paper,
  Typography,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

function UpdateTaskPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isCompleted, setIsCompleted] = useState(false);
  const { id: taskId} = useParams()
  const navigate = useNavigate()

  const { isPending, mutate } = useMutation({
    mutationKey: ["update-task"],
    mutationFn: async (taskData: { title: string; description: string, isCompleted?: boolean }) => {
      const response = await axiosInstance.patch(`/api/tasks/${taskId}`, taskData);
      return response.data;
    },
    onError: () => {
      toast.error('Could not update Task')
    },
    onSuccess: (data) => {
      toast.success('Task updated successfully', { theme: "light", position: "top-center" });
      setIsCompleted(data.isCompleted)
      navigate("/tasks")
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-task-for-update"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/tasks/${taskId}`)
      return response.data
    }
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title ?? "");
      setDescription(data.description ?? "");
      setIsCompleted(data.isCompleted ?? false)
    }
  }, [data]);

  if (isLoading) {
    return(
      <Loader msg="Loading please wait..."/>
    )
  }

  if (error) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" align="center">
          Please try again later.
        </Typography>
      </Box>
    );
  }

  function handleUpdateTask() {
    mutate({title, description})
  }

  function toggleTaskCompletion() {
    mutate({ 
      title,
      description,
      isCompleted: !isCompleted });
  }

  return (
    <Box component="section">
      <Paper
        elevation={2}
        sx={{ maxWidth: 600, mx: "auto", my: 7, p: 3, borderRadius: 2 }}
      >
        <Typography variant="h6" textAlign="center" mb={2}>
          Update your task here
        </Typography>

        <Box component="form">
          <Typography color="primary">New Title</Typography>
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

          <Typography color="primary">New Description</Typography>
          <TextField
            fullWidth
            type="text"
            size="small"
            placeholder="Brief description of your task"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            multiline
            rows={6}
            sx={{ mb: 2 }}
          />
          <Stack direction="row" spacing={2}>
            <Button
              type="button"
              variant="contained"
              fullWidth
              size="small"
              onClick={toggleTaskCompletion}
              loading={isPending}
              sx={{
                fontWeight: "bold",
                fontSize: 15,
                borderRadius: 2,
                mt: 1,
              }}
            >
              {isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
            </Button>
            <Button
              type="button"
              variant="contained"
              fullWidth
              size="small"
              onClick={handleUpdateTask}
              loading={isPending}
              sx={{
                fontWeight: "bold",
                fontSize: 15,
                borderRadius: 2,
                mt: 1,
              }}
            >
              Update
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

export default UpdateTaskPage;
