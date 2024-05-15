// routes/taskRoutes.js

const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// Ruta para crear una tarea
router.post('/', async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

// Ruta para obtener todas las tareas
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// Ruta para obtener una tarea por ID
router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// Ruta para actualizar una tarea por ID
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// Ruta para eliminar una tarea por ID
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
