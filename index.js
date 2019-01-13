const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const students = require('./components/students');
const courses = require('./components/courses');
const grades  = require('./components/grades');

app.use('/students', students);
app.use('/courses', courses);
app.use('/grades', grades);

app.listen(port, () => console.log(`Exercise 1 app. Listening on port ${port}.`));
