import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import { FaRegFaceRollingEyes } from "react-icons/fa6";
import { PiSmileyXEyes } from "react-icons/pi";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

function SignUpPage() {
  const navigate = useNavigate();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const {isPending, mutate} = useMutation({
    mutationKey: ["signup-user"],
    mutationFn: async (newUser: { firstName: string; lastName: string; username: string; email: string; password: string }) => {
      const res = await axiosInstance.post("/api/auth/register", newUser);
      return res.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      } else {
        setError("There was a hiccup on our end. Please try again.");
      }
    },
    onSuccess: () => {
      navigate("/login");
    },
  }); 

  function handleCreateAcc() {
    setError("");
    if (pass !== confirmPass) {
      setError("Passwords don't match");
      return;
    }

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: pass,
    };
    mutate(newUser);
  }

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
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>{error}
            </Alert>)}
          <Box component="form">
            <TextField
              sx={{ mb: 1 }}
              label="FirstName"
              fullWidth
              size="small"
              placeholder="Enter first name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              sx={{ mb: 1 }}
              label="Last Name"
              fullWidth
              size="small"
              placeholder="Enter last name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              sx={{ mb: 1 }}
              label="Username"
              fullWidth
              size="small"
              placeholder="Choose username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              sx={{ mb: 1 }}
              label="Email"
              fullWidth
              size="small"
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={{ mb: 1 }}
              label="Password"
              fullWidth
              size="small"
              type={showPass ? "text" : "password"}
              placeholder="Enter password"
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPass((prev) => !prev)} edge="end">
                      {showPass ? <FaRegFaceRollingEyes /> : <PiSmileyXEyes />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              sx={{ mb: 1 }}
              label="Confirm Password"
              fullWidth
              size="small"
              type={showConfirmPass ? "text" : "password"}
              placeholder="Confirm password"
              required
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPass((prev) => !prev)} edge="end">
                      {showConfirmPass ? <FaRegFaceRollingEyes /> : <PiSmileyXEyes />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              fullWidth
              size="small"
              onClick={handleCreateAcc}
              loading={isPending}
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
