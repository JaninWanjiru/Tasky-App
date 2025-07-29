import { Box, Typography, Alert,  Grid } from "@mui/material";
import TaskCard from "../components/TaskCard";
import axiosInstance from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";

// Define Task type matching TaskCard props
type Task = {
  id: string;
  title: string;
  description: string;
  isDeleted: boolean;
  isCompleted: boolean;
};

function CompletedTasksPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-completed-tasks"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/tasks/completed");
      console.log("Completed Tasks:", response.data);
      return response.data;
    },
  });

  if (error) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6">
          Couldn't fetch completed tasks. Please try again later.
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return <Loader msg="Fetching completed tasks..." />;
  }

  return (
    <Box component="section" mt={2} minHeight="100vh">
      <Grid container justifyContent="center" spacing={4} m={3}>
        {data && data.length > 0 ? (
          data.map((task: Task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              isDeleted={task.isDeleted}
              isCompleted={task.isCompleted}
            />
          ))
        ) : (
          <Alert severity="info" sx={{fontSize: 15}}>
              {" "}
              You haven't completed any tasks yet.
            </Alert>
        )}
      </Grid>
    </Box>
  );
}

export default CompletedTasksPage;
