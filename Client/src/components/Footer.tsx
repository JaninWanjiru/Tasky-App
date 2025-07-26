import { Box, Typography, IconButton, Stack } from "@mui/material";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "#273F4F", color: "#DFD0B8", p: 2 }}>
      <Box textAlign="center">
        <Stack direction="row" justifyContent="center">
          <IconButton
            component="a"
            href="https://linkedin.com/in/jane-ndung-u-"
            sx={{ color: "#FE7743", mr:1 }}
          >
            <FaLinkedin />
          </IconButton>

          <Box>
            <Typography variant="body2">
              &copy; 2025 Tasky. All rights reserved.
            </Typography>
            <Typography variant="body2">
              Made with &hearts; by{" "}
              <a
                href="https://github.com/JaninWanjiru"
                style={{ textDecoration: "none", color: "#FE7743" }}
              >
                Jane Ndung'u
              </a>
            </Typography>
          </Box>

          <IconButton
            component="a"
            href="https://github.com/JaninWanjiru"
            sx={{ color: "#FE7743", ml:1 }}
          >
            <FaGithub />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}

export default Footer;
