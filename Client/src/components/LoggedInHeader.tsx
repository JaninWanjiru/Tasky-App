import { Stack, Typography, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

interface LoggedInHeaderProps {
  user: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

function LoggedInHeader({ user }: LoggedInHeaderProps) {
  const navLinks = [
    { label: "Tasks", path: "/tasks" },
    { label: "New Task", path: "/new-task" },
    { label: "Completed Tasks", path: "/completed-tasks" },
    { label: "Trash", path: "/trash" },
    { label: "Profile", path: "/profile" },
  ];

  const initials = (user.firstName && user.firstName[0] ? user.firstName[0].toUpperCase() : "") +
                    (user.lastName && user.lastName[0] ? user.lastName[0].toUpperCase() : "");

  return (
    <Stack direction="row" spacing={3} alignItems="center">
      {navLinks.map((link) => (
        <Link key={link.label} to={link.path} style={{ textDecoration: "none" }}>
          <Typography variant="body2" sx={{ color: "#fff" }}>
            {link.label}
          </Typography>
        </Link>
      ))}
      <Typography variant="body2" sx={{ color: "#fff", mr: 1 }}>
        Welcome, {user.firstName}
      </Typography>
      <Avatar src={user.avatar}>
        {!user.avatar && initials}
      </Avatar>
    </Stack>
  );
}

export default LoggedInHeader; 