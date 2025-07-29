import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Avatar,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../api/axios";
import useUser from "../store/userStore";
import { toast } from "react-toastify";
import { FaRegFaceRollingEyes } from "react-icons/fa6";
import { PiSmileyXEyes } from "react-icons/pi";
import AvatarUploader from "../components/avatar";

function ProfilePage() {
  const { logoutUser } = useUser();

  const { user } = useUser();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  // const [avatarUrl, setAvatarUrl] = useState<string | undefined>(user?.avatar);
  const [passwords, setPasswords] = useState({ current: "", new: "" });
  const [error, setError] = useState("");

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const { isPending: isProfilePending, mutate: mutateProfile } = useMutation({
    mutationKey: ["update-user-details"],
    mutationFn: async (userDetails: {
      firstName: string;
      lastName: string;
      username: string;
      email: string;
    }) => {
      const response = await axiosInstance.patch("/api/user", userDetails);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      } else {
        setError("There was a hiccup on our end. Please try again.");
      }
    },
    onSuccess: () => {
      toast.success("Profile updated successfully", {
        theme: "dark",
        position: "bottom-right",
      });
    },
  });

  function handleUpdateProfile() {
    const updatedProfile = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      username: profile.username,
      email: profile.email,
    };
    mutateProfile(updatedProfile);
  }

  const { isPending: isPasswordPending, mutate: mutatePassword } = useMutation({
    mutationKey: ["update-password"],
    mutationFn: async (passwordData: { current: string; new: string }) => {
      const response = await axiosInstance.put(
        "/api/auth/password",
        passwordData
      );
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      } else {
        setError("There was a hiccup on our end. Please try again.");
      }
    },
    onSuccess: () => {
      toast.success("Password updated successfully", {
        theme: "dark",
        position: "bottom-right",
      });
    },
  });

  function handleUpdatePassword() {
    const updatedPassword = {
      current: passwords.current,
      new: passwords.new,
    };
    mutatePassword(updatedPassword);
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card elevation={3} sx={{ borderRadius: 3, my: 5, maxWidth: 500 }}>
        <CardContent sx={{ px: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar
              src={user?.avatar || undefined}
              sx={{ width: 80, height: 80, mr: 2 }}
            >
              {!user?.avatar &&
                `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`}
            </Avatar>
            <Box>
              <Typography fontWeight="bold">
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography color="text.secondary">{user?.email}</Typography>
            </Box>
          </Box>

          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Update Profile
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            label="First Name"
            size="small"
            fullWidth
            value={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
            sx={{ mb: 1 }}
          />
          <TextField
            label="Last Name"
            size="small"
            fullWidth
            value={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
            sx={{ mb: 1 }}
          />
          <TextField
            label="Username"
            size="small"
            fullWidth
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
            sx={{ mb: 1 }}
          />
          <TextField
            label="Email"
            size="small"
            fullWidth
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            sx={{ mb: 1.5 }}
          />
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={handleUpdateProfile}
            loading={isProfilePending}
            sx={{ fontWeight: "bold", borderRadius: 2, mb: 2 }}
          >
            update Profile
          </Button>

          <AvatarUploader />

          <Typography variant="h6" fontWeight="bold" sx={{ my: 2 }}>
            Update Password
          </Typography>
          <TextField
            label="Current Password"
            size="small"
            type={showCurrentPass ? "text" : "password"}
            fullWidth
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowCurrentPass((prev) => !prev)}
                      edge="end"
                    >
                      {showCurrentPass ? (
                        <FaRegFaceRollingEyes />
                      ) : (
                        <PiSmileyXEyes />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{ mb: 1 }}
          />
          <TextField
            label="New Password"
            size="small"
            type={showNewPass ? "text" : "password"}
            fullWidth
            value={passwords.new}
            onChange={(e) =>
              setPasswords({ ...passwords, new: e.target.value })
            }
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPass((prev) => !prev)}
                      edge="end"
                    >
                      {showNewPass ? (
                        <FaRegFaceRollingEyes />
                      ) : (
                        <PiSmileyXEyes />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{ mb: 1.5 }}
          />
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={handleUpdatePassword}
            loading={isPasswordPending}
            sx={{ fontWeight: "bold", borderRadius: 2, mb: 2 }}
          >
            update Password
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            fullWidth
            onClick={logoutUser}
            sx={{ fontWeight: "bold", borderRadius: 2, mb: 2 }}
          >
            Log Out
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ProfilePage;
