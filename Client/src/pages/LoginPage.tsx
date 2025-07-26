import { Link, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, TextField, Button, Alert, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import axios from "axios";
import useUser from "../store/userStore";
import { FaRegFaceRollingEyes } from "react-icons/fa6";
import { PiSmileyXEyes } from "react-icons/pi";

function LoginPage() {
  const navigate = useNavigate();

  const {setUser} =useUser()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {isPending, mutate} = useMutation({
    mutationKey: ["Login-user"],
    mutationFn: async (LoginData: { identifier: string; password: string}) => {
      const res = await axiosInstance.post("/api/auth/login", LoginData);
      return res.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      } else {
        setError("There was a hiccup on our end. Please try again.");
      } 
    },
    onSuccess: (data) => {
      setUser(data)
      navigate("/tasks");
    },
  })

  function handleLogin() {
    setError("")
    mutate({identifier, password})
  }
  
  return (
    <Box component="form" sx={{ bgcolor: "#fff", px: { xs: 2, sm: 0 } }} minHeight="100vh">
      <Card elevation={5} sx={{ maxWidth: 400, mx: "auto", mt: 8, borderRadius: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
            Welcome Back, Achiever
          </Typography>
          <Typography color="text.secondary" align="center" sx={{ mb: 3 }}>
            Sign in to Tasky and get things in order
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          
          <Box>
            <TextField
              size="small"
              label="Email or Username"
              placeholder="Enter your email or username"
              fullWidth
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              size="small"
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                        {showPassword ? <FaRegFaceRollingEyes /> : <PiSmileyXEyes />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              }}
            />
            <Button
              type="button"
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              loading={isPending}
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