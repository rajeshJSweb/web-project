const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/registration', function(req, res, next) {
  res.render('registration', { title: 'Express' });
});

router.get('/student-list', function(req, res, next) {
  res.render('student-list', { title: 'Express' });
});

router.get('/add-student', function(req, res, next) {
  res.render('add-student', { title: 'Express' });
});

module.exports = router;
