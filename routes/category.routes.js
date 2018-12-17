const express = require('express');
const router = express.Router();



// Require the controllers WHICH WE DID NOT CREATE YET!!
const category = require('../controllers/category.controller');

const product_controller = require('../controllers/product.controller');

router.post("/AddSuperCategory", category.addSuperCategory);
router.post("/AddSubCategory", category.addCategory);
router.get("/addCategoryPage", category.addSuperCategoryPage);
router.get("/addBrandPage", category.addBrandPage);
router.post("/AddBrand", category.addbrand);
router.get("/addSubCategoryPage", category.addSubCategoryPage);
// router.post("/AddSuperCategory", category.addCategory);
// router.get("/addSuperCategoryPage", category.addSuperCategoryPage);

module.exports = router;
