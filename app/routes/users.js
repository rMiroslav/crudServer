var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/usersCtrl');

router.get('/users', ctrl.findAll);
router.get('/users/:index/:limit', ctrl.findPage);
router.post('/user', ctrl.createUser);
router.put('/update/:id', ctrl.updateUser);
router.delete('/user/:id', ctrl.deleteUser);

module.exports = router;