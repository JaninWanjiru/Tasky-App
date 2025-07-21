import express, {Express} from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route';
import tasksRouter from './routes/tasks.route';
import userRouter from './routes/user.route';

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', authRouter);
app.use('/api', tasksRouter);
app.use('/api', userRouter);

app.get("/", (_req, res) => {
  res.send(`<h1>You've unlocked Jane's Tasky api</h1>`);
});

const port = process.env.PORT || 4650;
app.listen(port, () => console.log(`Server is running on port ${port}`));