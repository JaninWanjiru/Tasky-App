import { Box, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import axiosInstance from "../api/axios";
import useUser from "../store/userStore";

function Avatar() {
  const [imageSelected, setImageSelected] = useState<File | null>(null);

  const { user, setUser } = useUser();

  const uploadImage = async () => {
    if (!imageSelected || !user) return;

    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "janin03pre");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dpzssj9pf/image/upload",
        formData
      );
      const imageUrl = response.data.secure_url;
      await axiosInstance.patch("/api/user/avatar", { avatar: imageUrl });
      setUser({ ...user, avatar: imageUrl });
    } catch (e) {
      console.error("Upload failed:", e);
    }
  };

  return (
    <Box
      sx={{ textAlign: "center", borderRadius: 2, bgcolor: "#EAD8A4", py: 1 }}
    >
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setImageSelected(file);
        }}
      />
      <Button
        size="small"
        onClick={uploadImage}
        variant="contained"
        sx={{ borderRadius: 2 }}
      >
        Upload Image
      </Button>
    </Box>
  );
}

export default Avatar;
