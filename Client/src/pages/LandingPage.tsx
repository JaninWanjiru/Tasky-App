import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { RiTaskFill } from "react-icons/ri";
import { MdEventNote } from "react-icons/md";
import { MdOutlineAccessTime } from "react-icons/md";
import { MdGroups } from "react-icons/md";

const features = [
  {
    icon: <MdEventNote />,
    title: "  Plan Smarter",
    description:
      "Organize tasks effortlessly with intelligent scheduling that adapts to your priorities.",
  },
  {
    icon: <MdGroups />,
    title: "Connect",
    description:
      "Collaborate with others, assign tasks, and celebrate shared wins all in one simple platform.",
  },
  {
    icon: <MdOutlineAccessTime />,
    title: "Stay on Track",
    description:
      "Get timely reminders and real-time progress tracking to help you stay productive without stress.",
  },
];

function LandingPage() {
  return (
    <Box
      component="section"
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0,0,0,0.1)), url(/bg2.jpeg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#273F4F",
        p: 2,
      }}
    >
      <Grid sx={{ textAlign: "center", pt: 8, pb: 4 }}>
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: "1.8rem", md: "3rem" }, fontWeight: "bold" }}
          gutterBottom
        >
          Ace your day with Tasky
        </Typography>
        <Typography variant="h5" sx={{ mb: 5 }}>
          The personal planner that lives in your pocket. Tasky boosts
          productivity, so you can focus on what matters.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            size="medium"
            startIcon={<RiTaskFill />}
            sx={{ boxShadow: "4px 4px 15px 0px rgba(0,0,0,0.75)" }}
          >
            Start Organizing
          </Button>
        </Box>
      </Grid>
      <Grid container spacing={5} justifyContent="center" p="0 2rem">
        {features.map((feature, idx) => (
          <Grid size={{ sm: 6, md: 3 }} key={idx}>
            <Card
              sx={{ borderRadius: 6, textAlign: "center", boxShadow: 2, py: 3 }}
            >
              <CardContent>
                <Avatar
                  sx={{
                    bgcolor: "#f1f5fd",
                    margin: "0 auto",
                    fontSize: 35,
                    color: "primary.main",
                  }}
                >
                  {feature.icon}
                </Avatar>
                <Typography variant="h6" fontWeight={700} sx={{ mt: 2, mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default LandingPage;
