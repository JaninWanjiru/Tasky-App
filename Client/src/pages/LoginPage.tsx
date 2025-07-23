import { Link } from "react-router-dom";
import { Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";

function LoginPage() {
  return (
    <Box component="form" sx={{ bgcolor: "#fff", px: { xs: 2, sm: 0 } }}>
      <Card elevation={3} sx={{ maxWidth: 400, mx: "auto", mt: 8, borderRadius: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
            Welcome Back, Achiever
          </Typography>
          <Typography color="text.secondary" align="center" sx={{ mb: 3 }}>
            Sign in to Tasky and get things in order
          </Typography>
          <Box>
            <TextField
              size="small"
              label="Email or Username"
              placeholder="Enter your email or username"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              size="small"
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Button
              type="button"
              variant="contained"
              color="primary"
              fullWidth
              size="small"
              sx={{ fontWeight: "bold", fontSize: 15, borderRadius: 2, mb: 2 }}
            >
              Login
            </Button>
          </Box>
          <Typography align="center" color="text.secondary">
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: "#1976d2", textDecoration: "none" }}>
              Sign up here
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage; 