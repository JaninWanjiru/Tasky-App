import express, { Express } from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import tasksRouter from "./routes/tasks.route";
import userRouter from "./routes/user.route";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api", userRouter);

app.get("/", (_req, res) => {
  res.send(`<h1>You've unlocked Jane's Tasky api</h1>`);
});

const port = process.env.PORT || 4650;
app.listen(port, () => console.log(`Server is running on port ${port}`));
