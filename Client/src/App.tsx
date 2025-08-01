import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import './App.css';
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Protected from "./components/Protected";
import NewTaskPage from "./pages/NewTaskPage";
import TasksPage from "./pages/TasksPage";
import UpdateTaskPage from "./pages/UpdateTaskPage";
import CompletedTasksPage from "./pages/CompletedTasksPage";
import TrashPage from "./pages/TrashPage";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/Footer";


const client = new QueryClient()
const theme = createTheme({
  palette: {
    primary: {
      main: "#FE7743",         
      contrastText: "#FFFFFF", 
    },
    secondary: {
      main: "#273F4F",         
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#EFEEEA",     
      paper: "#FFFFFF",        
    },
    text: {
      primary: "#273F4F",      
      secondary: "#4F4F4F",    
    },
  },
  typography: {
    fontFamily: '"Quicksand", sans-serif',
    h3: {
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

function App() { 
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/new-task" element={<Protected><NewTaskPage /></Protected>} />
          <Route path="/tasks" element={<Protected><TasksPage /></Protected>} />
          <Route path="/update-task/:id" element={<Protected><UpdateTaskPage /></Protected>} />
          <Route path="/completed-tasks" element={<Protected><CompletedTasksPage /></Protected>} />
          <Route path="/trash" element={<Protected><TrashPage /></Protected>} />
          <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
