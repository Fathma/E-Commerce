const express = require("express");
const router = express.Router();
const Brand = require("../models/brand.model");
const subCategory = require("../models/subCategory.model");
// category register route
exports.addSubCategoryPage = (req, res, next) => {
    res.render("AddCategory");
};
// category register route
exports.addBrandPage = (req, res, next) => {
    res.render("brandReg");
};
// // category register route
// exports.addCategoryPage = (req, res, next) => {
//     res.render("AddCategory");
// };
exports.addSuperCategoryPage = (req, res, next) => {
    res.render("AddSuperCategory");
};

exports.addbrand = (req, res) => {
    
    newBrand = {
        name: req.body.brand
    }
    new Brand(newBrand).save().then(Brand => {
        req.flash("success_msg", "Brand added.");
        res.redirect("/products/view");
    });
}
exports.addSuperCategory = (req, res) => {

    newCategory = {
        name: req.body.super
    }
    new Category(newCategory).save().then(Category => {
        req.flash("success_msg", "Category added.");
        res.redirect("/products/view");
    });
}
exports.addCategory = (req, res) => {
    var feature = (req.body.feat).split(",");
    Category.find({name:req.body.cat}, function(err, docs){
        console.log(docs[0]._id);
        newSubCategory = {
            name: req.body.cate,
            category:docs[0]._id,
            features: feature
        }
        new subCategory(newSubCategory).save().then(SubCategory => {
            req.flash("success_msg", "Sub Category added.");
            res.redirect("/products/view");
        });
    })
    
}
const Category = require("../models/category.model");