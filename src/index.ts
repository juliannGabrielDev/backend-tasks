import express, { Request, Response } from 'express';
import { taskRouter } from './routes/tasks.routes.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use("/tasks", taskRouter);

app.get("/", (req: Request, res: Response) => {
  res.json("Mi primer backend");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});