const express = require('express');
const router = express.Router();



// Require the controllers WHICH WE DID NOT CREATE YET!!
const user = require('../controllers/users.controller');

router.get("/login",  user.loginPage);
router.get("/register",  user.registrationPage);
router.post("/login",user.login);
router.post("/register",user.userregistration);
router.get("/logout", user.logout);
module.exports = router;
