import { Box, Typography, Alert, Grid } from "@mui/material";
import TaskCard from "../components/TaskCard";
import axiosInstance from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";

function TrashPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-deleted-tasks"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/tasks");
      console.log(response.data);
      return response.data;
    },
  });

  if (error) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" align="center">
          Please try again later.
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return <Loader msg="Fetching, please wait..." />;
  }
  return (
    <Box component="section" mt={2} minHeight="100vh">
      <Grid container justifyContent="center" spacing={4} m={3}>
        <Alert severity="warning">
          Items in trash will be deleted after 30 days
        </Alert>
        {data &&
        data.filter(
          (task: {
            id: string;
            title: string;
            description: string;
            isDeleted: boolean;
            isCompleted: boolean;
          }) => task.isDeleted === true
        ).length === 0 ? (
          <Alert severity="info">No items in Trash yet</Alert>
        ) : (
          data &&
          data
            .filter(
              (task: {
                id: string;
                title: string;
                description: string;
                isDeleted: boolean;
                isCompleted: boolean;
              }) => task.isDeleted === true
            )
            .map(
              (task: {
                id: string;
                title: string;
                description: string;
                isDeleted: boolean;
                isCompleted: boolean;
              }) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  isDeleted={task.isDeleted}
                  isCompleted={task.isCompleted}
                />
              )
            )
        )}
      </Grid>
    </Box>
  );
}

export default TrashPage;
