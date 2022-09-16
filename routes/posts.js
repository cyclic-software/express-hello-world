const router = require('express').Router();
const authController = require('./../controller/authController');
const postController = require('./../controller/postController');

router.get('/:id', postController.getPost); //GET POST
router.get('/', postController.getAllPost); //GET ALL POSTS

router.use(authController.protect);
router.post('/', postController.createPost); //CREATE POST
router.patch('/:id', postController.updatePost); //UPDATE POST
router.delete('/:id', postController.deletePost); //DELETE POST

module.exports = router;