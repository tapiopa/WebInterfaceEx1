const express = require('express');
let router = express.Router();

let students = [{
    studentID: 1,
    classID: "DIN",
    studentName: "John Doe",
    address: "Testikatu 1"
}];

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
        // console.log("All students.");
        res.json(students);
    }
});

//POST
router.post('/', (req, res) => {
    // console.log(req.body);
    students.push(req.body);
    res.send('STUDENTS POST OK');
});

//PUT
router.put('/', (req, res) => {
    // console.log("STUDENTS PUT");
    // console.log(req.body);
    const student = req.body;
    let editedStudent = null;
    students.forEach(stud => {
        if (stud.studentID == student.studentID) {
            // console.log("Heipparallaa");
            stud.classID = student.classID;
            stud.studentName = student.studentName;
            stud.address = student.address;
            editedStudent = stud;
        }
        // res.send('OK');
    });
    if (editedStudent) {
        // console.log("PUT student in list");
        // console.log(editedStudent);
        res.json(editedStudent);
        res.send('STUDENTS PUT OK')
    } else {
        res.send('NOT FOUND');
    }
});

//DELETE
router.delete('/:studentID?', (req, res) => {
    let index = -1;
    // console.log(`DELETE studentID: ${req.params.studentID}`);
    students.forEach((student, idx) => {
        if (student.studentID == req.params.studentID) {
            // console.log(`found index: ${idx}`);
            index = idx;
        }
    });
    if (index >= 0) {
        // console.log("HEippaerallaa@@");
        students.splice(index, 1);
        // res.json(students);
        res.send('STUDENTS DELETE OK');
    } else {
        res.send('NOT FOUND');
    }
});

module.exports = router;
