const express = require('express');
const router = express.Router();

let c = 1;
let courses = [
    {
        courseID: c++,
        courseName: "Test course name",
        description: "Test description"
    },
    {
        courseID: c++,
        courseName: "Test course name2",
        description: "Test description"
    },
    {
        courseID: c++,
        courseName: "Test course name3",
        description: "Test description"
    }
];

//GET
router.get('/:courseID?', (req, res) => {
    if (req.params.courseID) {
        const id = req.params.courseID;
        let foundCourse = null;
        courses.forEach(course => {
            if (course.courseID == id) {
                foundCourse = course;
            }
        });
        if (foundCourse) {
            res.json(foundCourse);
        } else {
            res.send('NOT FOUND');
        }

    } else {
        res.json(courses);
    }
});

//POST
router.post('/', (req, res) => {
    const course = req.body;
    course.courseID = c++;
    courses.push(course);
    res.send('COURSES POST OK');
});

//PUT
router.put('/', (req, res) => {
    const course = req.body;
    let foundCourse = null;
    courses.forEach(crs => {
        if (crs.courseID === course.courseID) {
            crs.courseName = course.courseName;
            crs.description = course.description;
            foundCourse = crs;
        }
    });
    if (foundCourse) {
        res.send('COURSES PUT OK');
    } else {
        res.send('NOT FOUND');
    }
});

//DELETE
router.delete('/:courseID?', (req, res) => {
    let index = -1;
    courses.forEach((course, idx) => {
        if (course.courseID == req.params.courseID) {
            index = idx;
        }
    });
    if (index >= 0) {
        courses.splice(index, 1);
        res.send('COURSES DELETE OK');
    } else {
        res.send('NOT FOUND');
    }
});

module.exports = router;
