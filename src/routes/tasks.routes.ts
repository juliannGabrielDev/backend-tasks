import { Router } from 'express';
import { getAllTasks, createTask, deleteTask, updateTask } from '../controllers/tasks.controller.js';

export const taskRouter = Router();

taskRouter.get("/", getAllTasks);
taskRouter.post("/", createTask);
taskRouter.delete("/:id", deleteTask);
taskRouter.patch("/:id", updateTask);
