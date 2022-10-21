const express = require('express');
const router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
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

        const index = students.map(object => object.email).indexOf(req.body.email);

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
    const data = fs.readFileSync('./students.json', 'utf-8')

    let students = await JSON.parse(data);
    students.forEach(function (s) {
        if (s.email === req.body.email) {
            return res.redirect('/registration?email=' + encodeURIComponent("Email already used"));
        }
    })
    students.push(req.body)

    students = JSON.stringify(students);
    fs.writeFileSync('students.json', students);

    res.redirect('/');
});

router.get('/student-list', function (req, res, next) {
    res.render('student-list', {title: 'Express'});
});

router.get('/add-student', function (req, res, next) {
    res.render('add-student', {title: 'Express'});
});

module.exports = router;
