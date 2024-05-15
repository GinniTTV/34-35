const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 3000;


const uri = 'mongodb+srv://ginitvx26:<password>@data1.axuylyt.mongodb.net/?retryWrites=true&w=majority&appName=data1';


const connectDB = async () => {
  try {
    await mongoose.connect(uri, {});
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
};


connectDB();


app.use(express.json());

app.use('/tasks', taskRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
