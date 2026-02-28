import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { fileURLToPath } from 'url';

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const taskFile = path.join(__dirname, "../../data/tasks.txt");

const readTasks = (): Task[] => {
    try {
        if (!fs.existsSync(taskFile)) {
            return [];
        }

        const data = fs.readFileSync(taskFile, "utf-8");
        return JSON.parse(data) as Task[];
    } catch (err) {
        return [];
    }
};

const saveTasks = (tasks: Task[]): void => {
    fs.writeFileSync(taskFile, JSON.stringify(tasks, null, 2));
};

// =========================================================

export const createTask = (req: Request, res: Response) => {
    const newTask: Task = {
        id: Date.now(),
        title: req.body.title,
        completed: false,
    };

    const tasks = readTasks();
    tasks.push(newTask);
    saveTasks(tasks);
    res.json(newTask);
};

export const getAllTasks = (req: Request, res: Response) => {
    const tasks = readTasks();
    res.json(tasks);
};

export const deleteTask = (req: Request, res: Response) => {
    let tasks = readTasks();
    const id = parseInt(req.params.id as string);

    tasks = tasks.filter((task) => task.id !== id);
    saveTasks(tasks);

    res.json({ message: 'Tarea eliminada con éxito no ha quedadó registro de esta tarea y se ha eliminado por siempre de la faz de la tierra.' });
};

export const updateTask = (req: Request, res: Response) => {
    let tasks = readTasks();
    const id = parseInt(req.params.id as string);

    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...req.body,
        id: tasks[taskIndex].id,
    };

    saveTasks(tasks);
    
    res.json({
        message: "Tarea actualizada correctamente",
        task: tasks[taskIndex]
    });
}