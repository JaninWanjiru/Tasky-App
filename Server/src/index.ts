import express, {Express} from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route';
import tasksRouter from './routes/tasks.route';


const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send(`<h1>You've unlocked Jane's Tasky api</h1>`);
});

app.use("/api/auth", authRouter);
app.use("/api/tasks", tasksRouter);

const port = process.env.PORT || 4650;
app.listen(port, () => console.log(`Server is running on port ${port}`));

