import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

function LoggedOutHeader() {
  return (
    <Stack direction="row" spacing={3}>
          <Link to="/login">
            <button
              style={{
                padding: "0.5rem 1rem",
                background: "#273F4F",
                color: "#fff",
                border: "none",
                borderRadius: 6,
              }}
            >
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button
              style={{
                padding: "0.5rem 1rem",
                background: "#273F4F",
                color: "#fff",
                border: "none",
                borderRadius: 6,
              }}
            >
              Sign Up
            </button>
          </Link>
        </Stack>
  )
}

export default LoggedOutHeader