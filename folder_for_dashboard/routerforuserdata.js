const express = require("express");
const router  = express.Router();
const {getalltask,posttask,gettask}  = require("../configFolder/usertypeddata");

router.route("/").get(getalltask).post(posttask);
//router.route("/on_signin_pages/storiesPage/").get(getalltask);
router.route("/:id").get(gettask)

module.exports = router