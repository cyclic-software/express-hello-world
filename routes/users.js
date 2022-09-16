const router = require('express').Router();
const authController = require('./../controller/authController');
const userController = require('./../controller/userController');

router.use(authController.protect);
router.get('/:id', userController.getUser); //GET USER
router.patch('/:id', userController.updateUser); //UPDATE
router.delete('/deleteMe', userController.deleteUser); //DELETE

module.exports = router;
