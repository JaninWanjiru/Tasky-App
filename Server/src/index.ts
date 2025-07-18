import express, {Express} from 'express';

const app: Express = express();

app.get("/", (_req, res) => {
  res.send(`<h1>You've unlocked Jane's Tasky api</h1>`);
});

const port = process.env.PORT || 4650;
app.listen(port, () => console.log(`Server is running on port ${port}`));

