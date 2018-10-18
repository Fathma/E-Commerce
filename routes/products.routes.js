const express = require('express');
const router = express.Router();
const passport = require('passport');
const Product = require("../models/Product");
const multer = require("multer");
const { ensureAuthenticated } = require("../helpers/auth");
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


// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');



router.get('/home', product_controller.getHomePage);
router.get("/registration", ensureAuthenticated,  product_controller.getRegistrationPage);
router.get("/category/:category",product_controller.getCategoryWisePage);
router.get("/view", ensureAuthenticated, product_controller.getAllProducts);
router.get("/pin/:id", ensureAuthenticated, product_controller.pinToFrontPage);
router.get("/unpin/:id", ensureAuthenticated, product_controller.unPinToFrontPage);
router.get("/home/:id", ensureAuthenticated, product_controller.addToHomePage);
router.get("/unhome/:id", ensureAuthenticated, product_controller.removeFromHomePage);
router.get("/delete/:id",ensureAuthenticated, product_controller.deleteProduct);
router.post("/search", product_controller.searchProduct);
router.post("/showfields",ensureAuthenticated, product_controller.showProductRegistrationFields);
router.get("/singleProduct/:id",product_controller.singleProduct);

//saves product details
router.post("/regiSave/:category/:num", upload.single("imagePath"), (req, res) => {
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
module.exports = router;
