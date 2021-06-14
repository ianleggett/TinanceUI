const express = require('express');
const router = express.Router();
const UserController = require("../controller/UserController")

router.post('/signin',UserController.signin);
router.post('/signup',UserController.signup);
router.post('/setPassword',UserController.setPassword);
router.post('/addPerson',UserController.addPerson);
router.post('/updatePerson',UserController.updatePerson);
router.post('/deletePerson',UserController.deletePerson);
router.post('/suspendPerson',UserController.suspendPerson);
router.post('/loadEmployees',UserController.loadEmployee);

module.exports = router;