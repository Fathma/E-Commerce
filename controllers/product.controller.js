//Imports
var mongo = require("mongodb");
const Product = require("../models/Product");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
var unique = require('array-unique');


const mongoURI = "mongodb://localhost:27017/e-commerce_db";


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
    resultArray = [];
    var h = [];
    product.findById(mongo.ObjectID(req.params.id), function (err, product) {
        resultArray = product;
        var obj = resultArray.features;

        res.render("single", {
            title: "general",
            product: resultArray,
            features: obj
        });
    });
};

// returns product registration page
exports.getRegistrationPage = (req, res) => {
    var category = [];
    var brand = [];
    var model = [];
    Product.find(function (err, docs) {
        if (err) {
            res.send(err);
        } else {
            docs.map(function (rs) {
                category.push(rs.category);
                brand.push(rs.brand);
                model.push(rs.model);
            });
            res.render("products/reg", {
                title: "Product Registration",
                category: req.params.category,
                num: 0,
                brand: unique(brand),
                cat: unique(category),
                model: unique(model),
                stored_product: getNavProducts(),
                stored_brand: getNavBrands()
            });
        }
    });
};

// returns Category wise page
exports.getCategoryWisePage = (req, res, next) => {
    var resultArray = [];
    Product.find({ category: req.params.category }, function (err, docs) {
        if (err) {
            res.send(err);
        }
        else {
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
    });
};

// returns allproduct page
exports.getAllProducts = (req, res, next) => {
    resultArray = [];
    Product.find(function (err, docs) {
        if (err) {
            res.send(err);
        } else {
            for (var i = docs.length - 1; i > -1; i -= 1) {
                resultArray.push(docs[i]);
            }
            res.render("allProductView", {
                title: "All Product",
                products: resultArray,
                stored_product: getNavProducts(),
                stored_brand: getNavBrands()
            });
        }
    });
};

// pin the product to top
exports.pinToFrontPage = (req, res, next) => {
    Product.update(
        { _id: mongo.ObjectID(req.params.id) },
        {
            $set: { pinned: "true" }
        },
        function (err, bear) {
            if (err) {
                res.send(err);
            } else {
                res.redirect("/products/view");
            }
    });
};

// unpin the product to top
exports.unPinToFrontPage = (req, res, next) => {
    console.log(req.params.id);
    Product.update(
        { _id: mongo.ObjectID(req.params.id) },
        {
            $set: { pinned: "" }
        },
        function (err, bear) {
            if (err) {
                res.send(err);
            } else {
                res.redirect("/products/view");
            }
        }
    );
};

// Add to home page
exports.addToHomePage = (req, res, next) => {
    console.log(req.params.id);
    Product.update(
        { _id: mongo.ObjectID(req.params.id) },
        {
            $set: { home: "true" }
        },
        function (err, bear) {
            if (err) {
                res.send(err);
            } else {
                res.redirect("/products/view");
            }
        }
    );
};

// remove from home page
exports.removeFromHomePage = (req, res, next) => {
    console.log(req.params.id);
    Product.update(
        { _id: mongo.ObjectID(req.params.id) },
        {
            $set: { home: "" }
        },
        function (err, bear) {
            if (err) {
                res.send(err);
            } else {
                res.redirect("/products/view");
            }
        }
    );
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

// search
exports.searchProduct = (req, res, next) => {
    var txt = req.body.key_text;

    Product.find({ 
        $or: [
            { model: txt.toLowerCase() }, 
            { brand: txt.toLowerCase() }, 
            { category: txt.toLowerCase() }, 
            { title: txt.toLowerCase() }
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
                                    console.log(resultArray.length);
                                }
                            }
                        }
                    }
                    res.render("categoryWise", {
                        title: "Products",
                        category: req.params.category,
                        products: resultArray,
                        stored_product: getNavProducts(),
                        stored_brand: getNavBrands()
                    });
                });
            }
        }
    });
};

// returns home page
exports.getHomePage = (req, res, next) => {
    var resultArrayLaptop = [];
    var resultArrayMobile = [];
    var resultArrayCamera = [];
    var resultArrayPinned = [];
    var rev_resultArrayLaptop = [];
    var rev_resultArrayMobile = [];
    var rev_resultArrayCamera = [];
    var rev_resultArrayPinned = [];
    Product.find({ category: "laptop", home: "true" }, function (err, docs) {
        if (err) {
            res.send(err);
        } else {
            for (var i = docs.length - 1; i > -1; i -= 1) {
                resultArrayLaptop.push(docs[i]);
            }
            for (var i = 0; i < resultArrayLaptop.length; i += 4) {
                rev_resultArrayLaptop.push(resultArrayLaptop.slice(i, i + 4));
                break;
            }
        }
    })
    .then(() => {
        Product.find({ pinned: "true" }, function (err, docs) {
            if (err) {
                res.send(err);
            } else {
                for (var i = docs.length - 1; i > -1; i -= 1) {
                    resultArrayPinned.push(docs[i]);
                }
                for (var i = 0; i < resultArrayPinned.length; i += 4) {
                    rev_resultArrayPinned.push(resultArrayPinned.slice(i, i + 4));
                    break;
                }
            }
        });
    })
    .then(() => {
        Product.find({ category: "mobile", home: "true" }, function (err, docs) {
            if (err) {
                res.send(err);
            } else {
                for (var i = docs.length - 1; i > -1; i -= 1) {
                    resultArrayMobile.push(docs[i]);
                }
                for (var i = 0; i < resultArrayMobile.length; i += 4) {
                    rev_resultArrayMobile.push(resultArrayMobile.slice(i, i + 4));
                    break;
                }
            }
        });
    })
    .then(() => {
        Product.find({ category: "camera", home: "true" }, function (err, docs) {
            if (err) {
                res.send(err);
            } else {
                for (var i = docs.length - 1; i > -1; i -= 1) {
                    resultArrayCamera.push(docs[i]);
                }
                for (var i = 0; i < resultArrayCamera.length; i += 4) {
                    rev_resultArrayCamera.push(resultArrayCamera.slice(i, i + 4));
                    break;
                }
                res.render("home", {
                    title: "Home",
                    productsPinned: rev_resultArrayPinned,
                    productsLaptops: rev_resultArrayLaptop,
                    productsMobiles: rev_resultArrayMobile,
                    productsCameras: rev_resultArrayCamera,
                    stored_product: getNavProducts(),
                    stored_brand: getNavBrands()
                });
            }
        });
    });
};

// shows the number of fields user wants
exports.showProductRegistrationFields = (req, res, next) => {
    var num = parseInt(req.body.num, 10);
    var one = false;
    var two = false;
    var three = false;
    var four = false;
    var five = false;
    var six = false;
    var seven = false;
    var eight = false;
    var nine = false;
    var ten = false;
    var eleven = false;
    var twelve = false;
    var thirteen = false;
    var fourteen = false;
    var fifteen = false;
    var sixteen = false;
    var seventeen = false;
    var eighteen = false;
    var nineteen = false;
    var twenty = false;
    if (num > 0) {
        one = true;
        if (num > 1) {
            two = true;
            if (num > 2) {
                three = true;
                if (num > 3) {
                    four = true;
                    if (num > 4) {
                        five = true;
                        if (num > 5) {
                            six = true;
                            if (num > 6) {
                                seven = true;
                                if (num > 7) {
                                    eight = true;
                                    if (num > 8) {
                                        nine = true;
                                        if (num > 9) {
                                            ten = true;
                                            if (num > 10) {
                                                eleven = true;
                                                if (num > 11) {
                                                    twelve = true;
                                                    if (num > 12) {
                                                        thirteen = true;
                                                        if (num > 13) {
                                                            fourteen = true;
                                                            if (num > 14) {
                                                                fifteen = true;
                                                                if (num > 15) {
                                                                    sixteen = true;
                                                                    if (num > 16) {
                                                                        seventeen = true;
                                                                        if (num > 17) {
                                                                            eighteen = true;
                                                                            if (num > 18) {
                                                                                nineteen = true;
                                                                                if (num > 19) {
                                                                                    twenty = true;
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
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    var category = [];
    var brand = [];
    var model = [];
    Product.find(function (err, docs) {
        docs.map(function (rs) {
            category.push(rs.category);
            brand.push(rs.brand);
            model.push(rs.model);
        });
        res.render("products/reg", {
            num: num, one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen,
            sixteen, seventeen, eighteen, nineteen, twenty,
            title: "Registration",
            brand: unique(brand),
            cat: unique(category),
            model: unique(model),
            stored_product: getNavProducts(),
            stored_brand: getNavBrands()
        });
    });
};

// getting values of items of products in navbar
function getNavProducts() {
    var stored_product = [];
    Product.find(function (err, docs) {
        docs.map(function (rs) {
            stored_product.push(rs.category);
        })
    });
    return unique(stored_product);
}

// getting values of items of brand in navbar
function getNavBrands() {
    var stored_brand = [];
    Product.find(function (err, docs) {
        docs.map(function (rs) {
            stored_brand.push(rs.brand);
        })
    });
    return unique(stored_brand);
}



