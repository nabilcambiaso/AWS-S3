const express = require('express');
const updateJsonData = require('./updateJson');
const app = express();
const port = 3003;

// Define a global variable
global.myVariable = 'Nabil cambiaso';

// Route to handle requests
app.get('/', (req, res) => {
  updateJsonData();
  res.send(`Global variable value: ${global.myVariable}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
