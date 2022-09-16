const router = require('express').Router();
const authController = require('./../controller/authController');
const catController = require('./../controller/catController');

router
  .route('/')
  .get(catController.getCat)
  .post(authController.protect, catController.createCat);

router.route('/deleteOne/:id').delete(authController.protect, catController.deleteCat);

router
  .route('/deleteAll')
  .delete(authController.protect, catController.deleteAllCat);

module.exports = router;
