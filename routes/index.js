const express = require('express');
const router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
    return res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Express'});
});

router.post('/login', async function (req, res, next) {
    fs.readFile('./students.json', 'utf8', function (err, data) {
        if(err){
            console.log(err);
            return;
        }

        let students = JSON.parse(data);

        const index = students.findIndex(v => v.email === req.body.email)

        if (index > -1) {
            return res.redirect('/?success=' + encodeURIComponent("Login success"));
        }
    })

    return  res.redirect('/?success=' + encodeURIComponent("Invalid email"));

});

router.get('/registration', function (req, res, next) {
    res.render('registration', {title: 'Express'});
});

router.post('/registration', async function (req, res, next) {
    fs.readFile('./students.json', 'utf8', function (err, data) {
        if(err){
            console.log(err);
            return;
        }

        let students = JSON.parse(data);

        const index = students.findIndex(v => v.email === req.body.email)

        if (index > -1) {
            return res.redirect('/registration?email=' + encodeURIComponent("Email already used"));
        }

        students.push(req.body)

        students = JSON.stringify(students);

        fs.writeFile('./students.json', students, (err) => {
            if (err)
                console.log(err);
            else {
                return res.redirect('/?success=' + encodeURIComponent("Register success"));
            }
        });
    })
});

router.get('/student-list', function (req, res, next) {
    fs.readFile('./students.json', 'utf8', function (err, data) {
        if(err){
            console.log(err);
            return;
        }

        let students = JSON.parse(data);

        res.render('student-list', {students: students});
    })
});

router.get('/add-student', function (req, res, next) {
    res.render('add-student', {title: 'Express'});
});

router.post('/add-student', function (req, res, next) {
    fs.readFile('./students.json', 'utf8', function (err, data) {
        if(err){
            console.log(err);
            return;
        }

        let students = JSON.parse(data);

        const index = students.findIndex(v => v.email === req.body.email)

        if (index > -1) {
            return res.redirect('/add-student?email=' + encodeURIComponent("Email already used"));
        }

        students.push(req.body)

        students = JSON.stringify(students);

        fs.writeFile('./students.json', students, (err) => {
            if (err)
                console.log(err);
            else {
                return res.redirect('/student-list?success=' + encodeURIComponent("Register success"));
            }
        });
    })
});

module.exports = router;
