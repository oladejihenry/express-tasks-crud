import { Request, Response } from 'express'
import pool from '../db'

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await pool.query('SELECT * FROM tasks')
        res.json(tasks.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const createTask = async (req: Request, res: Response) => {
    const { title, description } = req.body
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' })
    }
    const task = await pool.query('INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *', [title, description])
    res.json(task.rows[0])
}

export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ error: 'ID is required' })
    }
    const { title, description } = req.body
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' })
    }
    const task = await pool.query('UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, id])
    res.json(task.rows[0])
}

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ error: 'ID is required' })
    }
    await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id])
    res.json({ message: 'Task deleted successfully' })
}


export const clearTasks = async (req: Request, res: Response) => {
    await pool.query('DELETE FROM tasks')
    res.json({ message: 'Tasks cleared successfully' })
}