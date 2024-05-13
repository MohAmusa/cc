const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Database (array of joke objects)
let db = [];

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.json(db);
});

app.post('/', (req, res) => {
    const newJoke = req.body;
    newJoke.id = db.length + 1; // Generate unique id
    db.push(newJoke);
    res.json(db);
});

app.get('/joke/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const joke = db.find(j => j.id === id);
    res.json(joke);
});

app.patch('/joke/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedJoke = req.body;
    db = db.map(j => {
        if (j.id === id) {
            return {
                ...j,
                ...updatedJoke
            };
        }
        return j;
    });
    const updatedJokeResponse = db.find(j => j.id === id);
    res.json(updatedJokeResponse);
});

app.delete('/joke/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const deletedJoke = db.find(j => j.id === id);
    db = db.filter(j => j.id !== id);
    res.json(deletedJoke);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
