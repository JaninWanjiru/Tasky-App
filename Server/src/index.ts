import express, {Express} from 'express';
import authRouter from './routes/auth.route';
const app: Express = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send(`<h1>You've unlocked Jane's Tasky api</h1>`);
});

app.use("/api/auth", authRouter);

const port = process.env.PORT || 4650;
app.listen(port, () => console.log(`Server is running on port ${port}`));

