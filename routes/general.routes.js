const express = require('express');
const router = express.Router();



// Require the controllers WHICH WE DID NOT CREATE YET!!
const general = require('../controllers/general.controller');

router.post("/add-to-cart/:id", general.addToCart);
router.get("/reduce/:_id", general.reduceFromCart);
router.get("/increase/:_id", general.increaseCart);
router.get("/removeAll/:_id",general.removeAll);
router.get("/cartView",general.cartView);
module.exports = router;
