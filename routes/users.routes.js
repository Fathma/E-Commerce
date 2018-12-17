const express = require('express');
const router = express.Router();

// role
const { ensureAuthenticated } = require("../helpers/auth");
const { Super } = require("../helpers/rolecheck");
const { SuperPublisher } = require("../helpers/rolecheck");

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user = require('../controllers/users.controller');

router.get("/login",  user.loginPage);
router.get("/register", ensureAuthenticated, Super, user.registrationPage);
router.post("/login",user.login);
router.post("/register", ensureAuthenticated, Super,user.userregistration);
router.get("/logout", user.logout);
// role
router.get("/dashboard", ensureAuthenticated, user.getDashbash);
module.exports = router;
