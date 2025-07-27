import {
  Stack,
  Typography,
  Avatar,
  IconButton,
  Drawer,
  List,
  ListItem,
  Box,
  Button,
} from "@mui/material";
import { IoMenu } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useUser from "../store/userStore";

interface LoggedInHeaderProps {
  user: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

function LoggedInHeader({ user }: LoggedInHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const logoutUser = useUser((state) => state.logoutUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };
  const navLinks = [
    { label: "Tasks", path: "/tasks" },
    { label: "New Task", path: "/new-task" },
    { label: "Completed Tasks", path: "/completed-tasks" },
    { label: "Trash", path: "/trash" },
    { label: "Profile", path: "/profile" },
  ];

  const initials =
    (user.firstName?.[0]?.toUpperCase() || "") +
    (user.lastName?.[0]?.toUpperCase() || "");

  return (
    <>
      {/* Desktop navigation */}
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.path}
            style={{ textDecoration: "none" }}
          >
            <Typography variant="body2" sx={{ color: "#273F4F", fontWeight: "bold" }}>
              {link.label}
            </Typography>
          </Link>
        ))}
        <Typography
          variant="body2"
          sx={{ color: "#fff", mr: 1, fontWeight: "bold" }}
        >
          Welcome, {user.firstName}
        </Typography>
        <Avatar sx={{ backgroundColor: "#273F4F" }} src={user.avatar}>
          {!user.avatar && initials}
        </Avatar>
        <Button
          variant="outlined"
          onClick={handleLogout}
          sx={{
            color: "#fff",
            ml: 2,
            backgroundColor: "#516878ff",
            borderRadius: "5px",
            textTransform: "capitalize",
            fontWeight: "bold",
          }}
        >
          Log Out
        </Button>
      </Stack>

      {/* Mobile menu button */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          justifyContent: "right",
          width: "100%",
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "#fff", mr: 2, fontWeight: "bold" }}
        >
          Welcome, {user.firstName}
        </Typography>
        <Avatar sx={{ mr: 1, backgroundColor: "#273F4F" }} src={user.avatar}>
          {!user.avatar && initials}
        </Avatar>
        <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
          <IoMenu />
        </IconButton>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ width: 180 }} onClick={() => setDrawerOpen(false)}>
            <List>
              {navLinks.map((link) => (
                <ListItem
                  key={link.label}
                  component={Link}
                  to={link.path}
                  sx={{ color: "#273F4F" }}
                >
                  {link.label}
                </ListItem>
              ))}
              <ListItem
                onClick={handleLogout}
                sx={{ color: "#FE7743", cursor: "pointer" }}
              >
                Log Out
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  );
}

export default LoggedInHeader;
