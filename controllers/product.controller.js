//Imports
var mongo = require("mongodb");
const Product = require("../models/Product");
const SubCategory = require("../models/subCategory.model");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
var unique = require('array-unique');

const mongoURI = "mongodb://jihad:jihad1234@ds115353.mlab.com:15353/e-commerce_db";

//Mongo connection
const conn = mongoose.createConnection(mongoURI);

//Init gfs
let gfs;

//Init Stream
conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("products");
});

// single product view
exports.singleProduct = (req, res) => {
    var resultArray = [];
    Product.findById(mongo.ObjectID(req.params.id))
    .populate("brand")
    .populate("owner")
    .populate({
        path:"subcategory",
        populate:{path:"category"}
    })
    .exec(function (err, product) {
        resultArray = product;
        var obj = resultArray.features;
        console.log(resultArray.subcategory.category.name)
        res.render("single", {
            title: "general",
            product: resultArray,
            features: obj
        });
    });
};

// returns registration page
exports.getRegistrationPage = (req, res) => {
    var brand = [];
    var model = [];
    Product.find(function (err, docs) {
        if (err) {
            res.send(err);
        } else {
            docs.map(function (rs) {
                brand.push(rs.brand);
                model.push(rs.model);
            });
            res.render("products/reg", {
                title: "Product Registration",
                category: req.params.category,
                num: 0,
                brand: unique(brand),
                model: unique(model)
            });
        }
    });
};

get_array_of_obj = (unique_arr, feat) => {
    var last = [];
    var temp = [];
    for (var i = 0; i < unique_arr.length; i++) {
        for (var j = 0; j < feat.length; j++) {

            if (feat[j].label === unique_arr[i]) {
                temp.push(feat[j].value);
            }
        }
        var obj = "{\"label\":\"" + unique_arr[i] + "\",\"values\":[";
        for (var n = 0; n < unique(temp).length; n++) {
            obj += "\"" + unique(temp)[n] + "\"";
            if (unique(temp).length - 1 > n) {
                obj += ",";
            }
        }
        obj += "]}";

        var jsn = JSON.parse(obj);

        last.push(jsn);
        temp = [];
    }
    return last
}

// returns Category wise page
exports.getCategoryWisePage = (req, res, next) => {
    var resultArray = [];
    var array = [];
    var feat = [];
    var brnd = [];
    var unique_arr = [];

    Product.find({ category: mongo.ObjectID(req.params.category) }, function (err, docs) {
        if (err) {
            res.send(err);
        }
        else {
            for (var i = 0; i < docs.length; i++) {
                for (var j = 0; j < docs[i].features.length; j++) {
                    array.push(docs[i].features[j].label);
                    brnd.push(docs[i].brand);
                    feat.push(docs[i].features[j]);
                }
            }
            unique_arr = unique(array);
            var last = get_array_of_obj(unique_arr, feat);
            for (var i = 0; i < docs.length; i += 3) {
                resultArray.push(docs.slice(i, i + 3));
            }

            res.render("categoryWise", {
                title: "Products",
                category: req.params.category,
                products: resultArray,
                brand_unique: unique(brnd),
                dropdown_label: last,
                number: last.length
            });
        }
    });
};

// returns allproduct page
exports.getEditpage = (req, res, next) => {
    Product.find({ _id: mongo.ObjectID(req.params.id)})
    .populate("subcategory")
    .exec(function (err, docs) {
        if (err) {
            res.send(err);
        } else {
            res.render("products/update", {
                title: "All Product",
                product: docs[0],
            });
        }
    });
};

// returns edit product stock
exports.getEditStock = (req, res, next) => {

    Product.findOneAndUpdate({_id: mongo.ObjectID(req.params.id)},
    {
        $set:{
            'quantity.stock':req.body.stock,
            'quantity.storeLive':req.body.storelive
        }
     },
     { upsert: true },
     function (err, docs) {
        if (err) {
            res.send(err);
        } 
    })
};

// returns Edit stock page
exports.getEditStockPage = (req, res, next) => {
    Product.find({_id: mongo.ObjectID(req.params.id)},function (err, docs) {
        if (err) {
            res.send(err);
        } 
        res.render("editStockInfo", {
            title: "All Product",
            product: docs[0]
        });
    })
};

// returns all product with stock info page
exports.getAllProductStock = (req, res, next) => {
    var resultArray = [];
    Product.find().sort({"quantity.stock":-1})
    .populate("subcategory")
    .exec(function (err, docs) {
        if (err) {
            res.send(err);
        } else {
            for (var i = docs.length - 1; i > -1; i -= 1) {
                resultArray.push(docs[i]);
            }
        }
        res.render("stock", {
            title: "All Product",
            products: resultArray
        });
    })
};

// returns allproduct page
exports.getAllProducts = (req, res, next) => {
    var resultArray = [];
    Product.find()
    .populate("subcategory")
    .exec(function (err, docs) {
        if (err) {
            res.send(err);
        } else {
            for (var i = docs.length - 1; i > -1; i -= 1) {
                resultArray.push(docs[i]);
            }
        }
        res.render("allProductView", {
            title: "All Product",
            products: resultArray
        });
    })
};

// delete product
exports.deleteProduct = (req, res, next) => {
    Product.deleteOne({ _id: mongo.ObjectID(req.params.id) }, function (err, bear) {
        if (err) {
            res.send(err);
        } else {
            res.redirect("/products/view");
        }
    });
};

exports.filter = (req, res, next) => {
    var num1 = req.body.number;
    var sr = [];
    sr.push({ category: mongo.ObjectID(req.params.category) });

    if (req.body.brand != "0") {
        sr.push({ brand: req.body.brand });
    }
    if (req.body.price != "0") {
        var array_range = (req.body.price).split("-");
        sr.push({ $and: [{ price: { $gt: parseInt(array_range[0], 10) } }, { price: { $lt: parseInt(array_range[1], 10) } }] });
    }
    if (num1 > 0) {
        if (req.body.v0 != "0") {
            sr.push({ "features.value": req.body.v0 });
        }
        if (num1 > 1) {
            if (req.body.v1 != "0") {
                sr.push({ "features.value": req.body.v1 });
            }
            if (num1 > 2) {
                if (req.body.v2 != "0") {
                    sr.push({ "features.value": req.body.v2 });
                }
                if (num1 > 3) {
                    if (req.body.v3 != "0") {
                        sr.push({ "features.value": req.body.v3 });
                    }
                    if (num1 > 4) {
                        if (req.body.v4 != "0") {
                            sr.push({ "features.value": req.body.v4 });
                        }
                        if (num1 > 5) {
                            if (req.body.v5 != "0") {
                                sr.push({ "features.value": req.body.v5 });
                            }
                            if (num1 > 6) {
                                if (req.body.v6 != "0") {
                                    sr.push({ "features.value": req.body.v6 });
                                }
                                if (num1 > 7) {
                                    if (req.body.v7 != "0") {
                                        sr.push({ "features.value": req.body.v7 });
                                    }
                                    if (num1 > 8) {
                                        if (req.body.v8 != "0") {
                                            sr.push({ "features.value": req.body.v8 });
                                        }
                                        if (num1 > 9) {
                                            if (req.body.v9 != "0") {
                                                sr.push({ "features.value": req.body.v9 });
                                            }
                                            if (num1 > 10) {
                                                if (req.body.v10 != "0") {
                                                    sr.push({ "features.value": req.body.v10 });
                                                }

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    var brnd = [];
    var resultArray = [];
    Product.find({
        $and: sr
    }, function (err, docs) {
        if (err) {
            res.send(err);
        } else {
            var feat = [];
            var array = [];
            for (var i = 0; i < docs.length; i++) {
                for (var j = 0; j < docs[i].features.length; j++) {
                    array.push(docs[i].features[j].label);
                    brnd.push(docs[i].brand);
                    feat.push(docs[i].features[j]);
                }
            }
            unique_arr = unique(array);
            var last = get_array_of_obj(unique_arr, feat)

            for (var i = 0; i < docs.length; i += 3) {
                resultArray.push(docs.slice(i, i + 3));
            }
            res.render("categoryWise", {
                title: "Products",
                category: req.params.category,
                unique_arr: unique(brnd),
                products: resultArray,
                dropdown_label: last,
                number: last.length
            });
        }
    });

}


// search
exports.searchProduct = (req, res, next) => {
    var txt = req.body.key_text;
    Product.find({
        $or: [
            { model: txt.toLowerCase() },
            { brand: txt.toLowerCase() },
            { category: txt.toLowerCase() },
            { name: txt.toLowerCase() }
        ]
    }, function (err, docs) {
        if (err) {
            res.send(err);
        } else {
            if (docs.length > 0) {
                var resultArray = [];
                for (var i = 0; i < docs.length; i += 3) {
                    resultArray.push(docs.slice(i, i + 3));
                }
                res.render("categoryWise", {
                    title: "Products",
                    category: req.params.category,
                    products: resultArray,
                    stored_product: getNavProducts(),
                    stored_brand: getNavBrands()
                });
            }
            else {
                var resultArray = [];
                Product.find(function (err, docs) {

                    for (var i = 0; i < docs.length; i += 3) {
                        if (docs[i].features) {
                            var feature = docs[i].features;
                            for (var j = 0; j < feature.length; j++) {
                                if (feature[j].value === txt) {
                                    resultArray.push(docs.slice(i, i + 3));
                                }
                            }
                        }
                    }
                    res.render("categoryWise", {
                        title: "Products",
                        category: req.params.category,
                        products: resultArray
                    });
                });
            }
        }
    });
};

// shows the number of fields user wants
exports.showProductRegistrationFields = (req, res, next) => {
    SubCategory.find({name:req.params.cat},function (err, docs1) {
            res.render("products/reg", {
                category:req.params.cat,
                features: docs1[0].features,
                num_feature:docs1[0].features.length,
                title: "Registration",
               
            });
        });
    

};

