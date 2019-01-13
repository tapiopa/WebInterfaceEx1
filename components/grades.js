const express = require('express');
const router = express.Router();

let grades = [{
    gradeID: 1,
    studentID: 1,
    courseID: 1,
    gradeName: "1",
}];

//GET
router.get('/:gradeID?', (req, res) => {
    if (req.params.gradeID) {
        const id = req.params.gradeID;
        let foundGrade = null;
        grades.forEach(grade => {
            if (grade.gradeID == id) {
                foundGrade = grade;
            }
        });
        if (foundGrade) {
            res.json(foundGrade);
        } else {
            res.send('NOT FOUND');
        }
    } else {
        res.json(grades);
    }
});

//POST
router.post('/', (req, res) => {
    grades.push(req.body);
    res.send('GRADES POST OK');
});

//PUT
router.put('/', (req, res) => {
    const editedGrade = req.body;
    let foundGrade = null;
    grades.forEach(grade => {
        if (grade.gradeID == editedGrade.gradeID) {
            grade.course = editedGrade.course;
            grade.gradeName = editedGrade.gradeName;
            grade.address = editedGrade.address;
            foundGrade = grade;
        }
    });
    if (foundGrade) {
        res.send('GRADES PUT OK');
    } else {
        res.send('NOT FOUND');
    }
});

//DELETE
router.delete('/:gradeID?', (req, res) => {
    let index = -1;
    grades.forEach((grade, idx) => {
        if (grade.gradeID == req.params.gradeID) {
            index = idx;
        }
    });
    if (index >= 0) {
        grades.splice(index, 1);
        res.send('GRADES DELETE OK');
    } else {
        res.send('NOT FOUND');
    }
});

module.exports = router;
