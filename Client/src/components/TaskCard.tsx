import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { FcOk } from "react-icons/fc";
import { RiEdit2Line } from "react-icons/ri";
import { MdOutlineDeleteForever } from "react-icons/md";
import { LiaTrashRestoreAltSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type CardProps = {
  id: string;
  title: string;
  description: string;
  isDeleted: boolean;
  isCompleted: boolean;
};

function TaskCard({
  id: taskId,
  title,
  description,
  isDeleted,
  isCompleted,
}: CardProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isRestoring, mutate: restoreTask } = useMutation({
    mutationKey: ["restore-task"],
    mutationFn: async (taskId: string) => {
      const response = await axiosInstance.patch(
        `/api/tasks/restore/${taskId}`
      );
      return response.data;
    },
    onError: () => {
      toast.error("Could not restore task");
    },
    onSuccess: () => {
      toast.success("Task restored successfully", {
        theme: "dark",
        position: "bottom-right",
      });
      queryClient.invalidateQueries({ queryKey: ["get-deleted-tasks"] });
    },
  });

  const { isPending, mutate } = useMutation({
    mutationKey: ["delete-task"],
    mutationFn: async (taskId: string) => {
      const response = await axiosInstance.delete(`/api/tasks/${taskId}`);
      return response.data;
    },
    onError: () => {
      toast.error("Could not delete task");
    },
    onSuccess: () => {
      toast.success("Task moved to trash", {
        theme: "dark",
        position: "bottom-right",
      });
      queryClient.invalidateQueries({
        queryKey: ["get-completed-tasks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-tasks"],
      });
    },
  });

  function handleRestoreTask(taskId: string) {
    restoreTask(taskId);
  }

  function handleDeleteTask(taskId: string) {
    mutate(taskId);
  }

  function handleUpdateTask() {
    navigate(`/update-task/${taskId}`);
  }
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
      <Card
        elevation={3}
        sx={{
          maxWidth: 450,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2,
          height: "100%",
          backgroundColor: isCompleted ? "#0c7541ff" : "#273F4F",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            color="primary"
            fontWeight="bold"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {isCompleted === true && <FcOk color="success" fontSize="small" />}
            {title}
          </Typography>

          <Typography variant="body2" color="#fff" sx={{ mb: 2 }}>
            {description}
          </Typography>

          <Divider sx={{ mt: 2, bgcolor: "background.paper" }} />
        </CardContent>

        {isDeleted ? (
          <CardActions sx={{ justifyContent: "space-between" }}>
            <Button
              startIcon={<LiaTrashRestoreAltSolid />}
              variant="contained"
              size="small"
              onClick={() => handleRestoreTask(taskId)}
              loading={isRestoring}
            >
              Restore
            </Button>
          </CardActions>
        ) : (
          <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
            <Button
              sx={{ outline: "1px solid", "&:hover": { outline: "1px solid" } }}
              startIcon={<RiEdit2Line />}
              variant="outlined"
              size="small"
              onClick={handleUpdateTask}
            >
              Edit
            </Button>
            <Button
              startIcon={<MdOutlineDeleteForever />}
              variant="contained"
              size="small"
              onClick={() => handleDeleteTask(taskId)}
              loading={isPending}
            >
              Delete
            </Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
}

export default TaskCard;
