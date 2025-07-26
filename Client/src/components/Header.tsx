import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import useUserStore from "../store/userStore";
import LoggedInHeader from "./LoggedInHeader";
import LoggedOutHeader from "./LoggedOutHeader";
import { LuListCheck } from "react-icons/lu";
import { Link } from "react-router-dom";

function Header() {
  const { user } = useUserStore();

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <IconButton>
            <LuListCheck />
          </IconButton>
        </Link>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Tasky
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {user ? <LoggedInHeader user={user} /> : <LoggedOutHeader />}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
