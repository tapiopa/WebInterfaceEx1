const express = require('express');
let router = express.Router();

let s = 1;

const students = [
    {
        studentID: s++,
        classID: "DIN",
        studentName: "John Doe",
        address: "Testikatu 1"
    },
    {
        studentID: s++,
        classID: "DIN",
        studentName: "Jane Doe",
        address: "Testikatu 2"
    },
    {
        studentID: s++,
        classID: "DIN",
        studentName: "John Smith",
        address: "Testikatu 3"
    }
];

//GET
router.get('/:studentID?', (req, res) => {
    if (req.params.studentID) {
        const id = req.params.studentID;
        // console.log(`student id: ${id}`);
        // console.log(`Students: ${students}`);
        let foundStudent = null;
        students.forEach(student => {
            if (student.studentID == id) {
                foundStudent = student;
            }
        });
        if (foundStudent) {
            res.json(foundStudent);
        } else {
            res.send('NOT FOUND');
        }
    } else {
        res.json(students);
    }
});

//POST
router.post('/', (req, res) => {
    const student = req.body;
    student.studentID = s++;
    students.push(student);
    res.send('STUDENTS POST OK');
});

//PUT
router.put('/', (req, res) => {
    const student = req.body;
    let editedStudent = null;
    students.forEach(stud => {
        if (stud.studentID == student.studentID) {
            stud.classID = student.classID;
            stud.studentName = student.studentName;
            stud.address = student.address;
            editedStudent = stud;
        }
    });
    if (editedStudent) {
        res.send('STUDENTS PUT OK');
    } else {
        res.send('NOT FOUND');
    }
});

//DELETE
router.delete('/:studentID?', (req, res) => {
    let index = -1;
    students.forEach((student, idx) => {
        if (student.studentID == req.params.studentID) {
            index = idx;
        }
    });
    if (index >= 0) {
        students.splice(index, 1);
        res.send('STUDENTS DELETE OK');
    } else {
        res.send('NOT FOUND');
    }
});

module.exports = router;
