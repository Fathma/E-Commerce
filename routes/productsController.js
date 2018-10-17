//Imports
const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../helpers/auth");

var mongo = require("mongodb");

const multer = require("multer");
const Product = require("../models/Product");


//Image save to DB Start
const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const path = require("path");
const crypto = require("crypto");
const mysql = require('mysql');
var unique = require('array-unique');

const mongoURI = "mongodb://localhost:27017/e-commerce_db";

// var connection = mysql.createConnection({
// 	host     : 'localhost',
// 	user     : 'root',
// 	password : '1234',
// 	database : 'test'
// });
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

//Mongo connection
const conn = mongoose.createConnection(mongoURI);

//Init gfs
let gfs;

//Init Stream
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("products");
});
//Image Path save start
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// returns product entry page
router.get("/registration", ensureAuthenticated, (req, res) => {
  
  var category = [];
  var brand = [];
  var model = [];
  Product.find(function (err, docs) {
    for (var i = 0; i < docs.length; i++) {
      category.push(docs[i].category);
      brand.push(docs[i].brand);
      model.push(docs[i].model);
    }
    res.render("products/reg", {
      title: "general",
      category: req.params.category,
      num: 0,
      brand: unique(brand),
      cat: unique(category),
      model: unique(model)
    });
  });
});

// Fetching by category data in product schema
router.get("/category/:category", function (req, res, next) {
  resultArray = [];
  Product.find({ category: req.params.category }, function (err, docs) {
    for (var i = 0; i < docs.length; i += 3) {
      resultArray.push(docs.slice(i, i + 3));
    }
    res.render("categoryWise", {
      title: "general",
      category: req.params.category,
      products: resultArray
    });
  });
});

// saving data in product schema
router.get("/view", function (req, res, next) {
  resultArray = [];
  Product.find(function (err, docs) {
    for (var i = docs.length - 1; i > -1; i -= 1) {
      resultArray.push(docs[i]);
    }
    res.render("allProductView", { title: "general", products: resultArray });
  });
});

// pin the product to top
router.get("/pin/:id", function (req, res, next) {
  console.log(req.params.id);
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
    }
  );
});

// unpin the product to top
router.get("/unpin/:id", function (req, res, next) {
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
});

// Add to home page
router.get("/home/:id", function (req, res, next) {
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
});

// remove from home page
router.get("/unhome/:id", function (req, res, next) {
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
});

// delete product
router.get("/delete/:id", function (req, res, next) {
  Product.deleteOne({ _id: mongo.ObjectID(req.params.id) }, function (
    err,
    bear
  ) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/products/view");
    }
  });
});

// search
router.post("/search", function (req, res, next) {
  var txt = req.body.key_text;
//   

  Product.find({ $or: [{ model: txt.toLowerCase()},{ brand :txt.toLowerCase()},{ category: txt.toLowerCase() },{ title: txt.toLowerCase() }] }, function (err, docs) {
    if(docs.length >0){
      var resultArray = [];
      for (var i = 0; i < docs.length; i +=3) {
        resultArray.push(docs.slice(i,i+3));
      }
      res.render("categoryWise", {
        title: "general",
        category: req.params.category,
        products: resultArray
      });
    }
    else
    {
      var resultArray = [];
      Product.find(function (err, docs) {
       
        for (var i = 0; i < docs.length; i +=3) {
         if(docs[i].features){
           var feature = docs[i].features;
           
          for (var j = 0; j < feature.length; j ++) {
            if(feature[j].value === txt){
              resultArray.push(docs.slice(i,i+3));
              console.log(resultArray.length);
            }
          }
         }
        }
        res.render("categoryWise", {
          title: "general",
          category: req.params.category,
          products: resultArray
        });
      });
    }
  });
});

// returns home page
router.get("/home", function (req, res, next) {
  resultArrayLaptop = [];
  resultArrayMobile = [];
  resultArrayCamera = [];
  resultArrayPinned = [];
  rev_resultArrayLaptop = [];
  rev_resultArrayMobile = [];
  rev_resultArrayCamera = [];
  rev_resultArrayPinned = [];
  stored_brand = [];
  stored_product = [];

  Product.find({ category: "laptop", home: "true" }, function (err, docs) {
    for (var i = docs.length - 1; i > -1; i -= 1) {
      resultArrayLaptop.push(docs[i]);
    }
    for (var i = 0; i < resultArrayLaptop.length; i += 4) {
      rev_resultArrayLaptop.push(resultArrayLaptop.slice(i, i + 4));
      break;
    }
  })
  .then(() => {
    Product.find(function (err, docs) {
      for (var i = 0; i <docs.length; i += 1) {
        stored_product.push(docs[i].category);
        stored_brand.push(docs[i].brand)
      }
      
    });
  })
    .then(() => {
      Product.find({ pinned: "true" }, function (err, docs) {
        for (var i = docs.length - 1; i > -1; i -= 1) {
          resultArrayPinned.push(docs[i]);
        }
        for (var i = 0; i < resultArrayPinned.length; i += 4) {
          rev_resultArrayPinned.push(resultArrayPinned.slice(i, i + 4));
          break;
        }
      });
    })
    .then(() => {
      Product.find({ category: "mobile", home: "true" }, function (err, docs) {
        for (var i = docs.length - 1; i > -1; i -= 1) {
          resultArrayMobile.push(docs[i]);
        }
        for (var i = 0; i < resultArrayMobile.length; i += 4) {
          rev_resultArrayMobile.push(resultArrayMobile.slice(i, i + 4));
          break;
        }
      });
    })
    .then(() => {
      Product.find({ category: "camera", home: "true" }, function (err, docs) {
        for (var i = docs.length - 1; i > -1; i -= 1) {
          resultArrayCamera.push(docs[i]);
        }
        for (var i = 0; i < resultArrayCamera.length; i += 4) {
          rev_resultArrayCamera.push(resultArrayCamera.slice(i, i + 4));
          break;
        }
        res.render("home", {
          title: "general",
          productsPinned: rev_resultArrayPinned,
          productsLaptops: rev_resultArrayLaptop,
          productsMobiles: rev_resultArrayMobile,
          productsCameras: rev_resultArrayCamera,
          stored_product:unique(stored_product),
          stored_brand:unique(stored_brand)
        });
      });
    });
});

//saves product details
router.post("/regiSave/:category/:num", ensureAuthenticated, upload.single("imagePath"), (req, res) => {
  var num = parseInt(req.params.num, 10);
 
  var data = [];
  if (num > 0) {
    
    data.push(JSON.parse("{\"label\":\""+req.body.feature1_label+"\",\"value\":\""+req.body.feature1_value+"\"}"));
    if (num > 1) {
      data.push(JSON.parse("{\"label\":\""+req.body.feature2_label+"\",\"value\":\""+req.body.feature2_value+"\"}"));
      if (num > 2) {
        data.push(JSON.parse("{\"label\":\""+req.body.feature3_label+"\",\"value\":\""+req.body.feature3_value+"\"}"));
        if (num > 3) {
          data.push(JSON.parse("{\"label\":\""+req.body.feature4_label+"\",\"value\":\""+req.body.feature4_value+"\"}"));
          if (num > 4) {
            data.push(JSON.parse("{\"label\":\""+req.body.feature5_label+"\",\"value\":\""+req.body.feature5_value+"\"}"));
            if (num > 5) {
              data.push(JSON.parse("{\"label\":\""+req.body.feature6_label+"\",\"value\":\""+req.body.feature6_value+"\"}"));
              if (num > 6) {
                data.push(JSON.parse("{\"label\":\""+req.body.feature7_label+"\",\"value\":\""+req.body.feature7_value+"\"}"));
                if (num > 7) {
                  data.push(JSON.parse("{\"label\":\""+req.body.feature8_label+"\",\"value\":\""+req.body.feature8_value+"\"}"));
                  if (num > 8) {
                    data.push(JSON.parse("{\"label\":\""+req.body.feature9_label+"\",\"value\":\""+req.body.feature9_value+"\"}"));
                    if (num > 9) {
                      data.push(JSON.parse("{\"label\":\""+req.body.feature10_label+"\",\"value\":\""+req.body.feature10_value+"\"}"));
                      if (num > 10) {
                        data.push(JSON.parse("{\"label\":\""+req.body.feature11_label+"\",\"value\":\""+req.body.feature11_value+"\"}"));
                        if (num > 11) {
                          data.push(JSON.parse("{\"label\":\""+req.body.feature12_label+"\",\"value\":\""+req.body.feature12_value+"\"}"));
                          if (num > 12) {
                            data.push(JSON.parse("{\"label\":\""+req.body.feature13_label+"\",\"value\":\""+req.body.feature13_value+"\"}"));
                            if (num > 13) {
                              data.push(JSON.parse("{\"label\":\""+req.body.feature14_label+"\",\"value\":\""+req.body.feature14_value+"\"}"));
                              if (num > 14) {
                                data.push(JSON.parse("{\"label\":\""+req.body.feature15_label+"\",\"value\":\""+req.body.feature15_value+"\"}"));
                                if (num > 15) {
                                  data.push(JSON.parse("{\"label\":\""+req.body.feature16_label+"\",\"value\":\""+req.body.feature16_value+"\"}"));
                                  if (num > 16) {
                                    data.push(JSON.parse("{\"label\":\""+req.body.feature17_label+"\",\"value\":\""+req.body.feature17_value+"\"}"));
                                    if (num > 17) {
                                      data.push(JSON.parse("{\"label\":\""+req.body.feature18_label+"\",\"value\":\""+req.body.feature18_value+"\"}"));
                                      if (num > 18) {
                                        data.push(JSON.parse("{\"label\":\""+req.body.feature19_label+"\",\"value\":\""+req.body.feature19_value+"\"}"));
                                        if (num > 19) {
                                          data.push(JSON.parse("{\"label\":\""+req.body.feature20_label+"\",\"value\":\""+req.body.feature20_value+"\"}"));
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
  var newProduct = {
    title: req.body.title,
    category: req.body.category,
    price: req.body.price,
    imagePath: "/images/"+req.file.originalname,
    user: req.user.id,
    brand: req.body.brand,
    model: req.body.model,
    warranty: req.body.warranty,
    features: data,
    pinned:"",
    home:""
  };

  new Product(newProduct).save().then(product => {
    req.flash("success_msg", "Product added.");
    res.redirect("/products/home");
  });
});

// shows the number of fields user wants
router.post("/showfields", (req, res) => {
  var num = parseInt(req.body.num, 10);
  console.log(num);
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
    for (var i = 0; i < docs.length; i++) {
      category.push(docs[i].category);
      brand.push(docs[i].brand);
      model.push(docs[i].model);
    }
    res.render("products/reg", {
      num: num, one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen,
      sixteen, seventeen, eighteen, nineteen, twenty,title: "general", brand: unique(brand), cat: unique(category), model: unique(model)
    });
  });
 
 
});

module.exports = router;

