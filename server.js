const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Database variable
let db = [];

// Middleware
app.use(bodyParser.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Function to generate a unique id
const generateId = () => {
  return Math.floor(Math.random() * 1000); // You can use a better way to generate unique ids in production
};

// POST request to add a joke to the db
app.post('/', (req, res) => {
  const { title, comedian, year } = req.body;
  const id = generateId();
  const newJoke = { id, title, comedian, year };
  db.push(newJoke);
  res.json(db);
});

// GET request to retrieve all jokes from the db
app.get('/', (req, res) => {
  res.json(db);
});

// PATCH request to update a joke by id
app.patch('/joke/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, comedian, year } = req.body;
  db = db.map(joke => (joke.id === id ? { ...joke, title, comedian, year } : joke));
  const updatedJoke = db.find(joke => joke.id === id);
  res.json(updatedJoke);
});

// DELETE request to delete a joke by id
app.delete('/joke/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const deletedJokeIndex = db.findIndex(joke => joke.id === id);
  if (deletedJokeIndex !== -1) {
    const deletedJoke = db.splice(deletedJokeIndex, 1)[0];
    res.json(deletedJoke);
  } else {
    res.status(404).json({ error: 'Joke not found' });
  }
});

// Start the server with nodemon
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
