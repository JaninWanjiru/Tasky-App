import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "#273F4F", color: "#DFD0B8", p: 3 }}>
      <Box textAlign="center" mt={3}>
        <Typography variant="body2">
          &copy; 2025 Zaph Tours. All rights reserved.
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
    </Box>
  );
}

export default Footer;