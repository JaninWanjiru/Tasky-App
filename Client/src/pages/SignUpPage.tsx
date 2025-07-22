import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
// import { FaRegFaceRollingEyes } from "react-icons/fa6";
function SignUpPage() {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: { xs: 2, sm: 0 },
      }}
    >
      <Card sx={{ maxWidth: 410, borderRadius: 3, boxShadow: 3 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography variant="h5" textAlign="center" fontWeight="bold" mb={1} fontSize={{ xs: "1.4rem", sm: "1.6rem" }}>
            Own Your Day with Tasky
          </Typography>
          <Typography textAlign="center" mb={2} fontSize={{ xs: "0.9rem", sm: "1rem" }}>
            We organize while you actualize
          </Typography>
          <Box component="form">
            <TextField
              sx={{ mb: 1 }}
              label="FirstName"
              fullWidth
              size="small"
              placeholder="Enter first name"
              required
            />
            <TextField
              sx={{ mb: 1 }}
              label="Last Name"
              fullWidth
              size="small"
              placeholder="Enter last name"
              required
            />
            <TextField
              sx={{ mb: 1 }}
              label="Username"
              fullWidth
              size="small"
              placeholder="Choose username"
              required
            />
            <TextField
              sx={{ mb: 1 }}
              label="Email"
              fullWidth
              size="small"
              type="email"
              placeholder="Enter email"
              required
            />
            <TextField
              sx={{ mb: 1 }}
              label="Password"
              fullWidth
              size="small"
              type="password"
              placeholder="Enter password"
              required
            />
            <TextField
              sx={{ mb: 1 }}
              label="Confirm Password"
              fullWidth
              size="small"
              type="password"
              placeholder="Confirm password"
              required
            />
            <Button
              variant="contained"
              fullWidth
              size="small"
              sx={{ fontWeight: "bold", fontSize: 15, borderRadius: 2, mt: 1 }}
            >
              Create Account
            </Button>
          </Box>

          <Typography textAlign="center" mt={1} color="text.secondary">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              Login here
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SignUpPage;
