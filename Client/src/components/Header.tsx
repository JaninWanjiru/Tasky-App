import { AppBar, Toolbar, Typography, Box } from "@mui/material";
// import useUserStore from "../store/userStore";
// import LoggedInHeader from "./LoggedInHeader";
import LoggedOutHeader from "./LoggedOutHeader";

function Header() {
  // const { user } = useUserStore();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Tasky
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {/* {user ? <LoggedInHeader user={user} /> :  */}
        <LoggedOutHeader />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
