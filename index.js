const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 3000;

// Nueva configuración para conectarse a MongoDB Atlas
const uri = 'mongodb+srv://ginitvx26:<password>@data1.axuylyt.mongodb.net/?retryWrites=true&w=majority&appName=data1';

// Conexión a la base de datos MongoDB Atlas sin opciones adicionales
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {});
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
};

// Llamar a la función connectDB para establecer la conexión
connectDB();

// Middleware para procesar datos en formato JSON
app.use(express.json());

// Rutas de la aplicación
app.use('/tasks', taskRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
