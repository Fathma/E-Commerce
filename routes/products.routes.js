const express = require('express');
const router = express.Router();
const Product = require("../models/Product");
const SubCategory = require("../models/subCategory.model");
const multer = require("multer");
const { ensureAuthenticated } = require("../helpers/auth");
const path = require('path');
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
var mongo = require('mongodb');
var Brand = require("../models/brand.model")

mongoose.Promise = global.Promise;


const mongoo = 'mongodb://jihad:jihad1234@ds115353.mlab.com:15353/e-commerce_db';

const conn = mongoose.createConnection(mongoo);
let gfs;
conn.once('open', function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('fs');
})
var filename;
// create storage engine
const storage = new GridFsStorage(
  {
  url: mongoo,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'fs'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

const product_controller = require('../controllers/product.controller');
router.post('/filter/:category', product_controller.filter);
router.get("/registration", ensureAuthenticated, product_controller.getRegistrationPage);
router.get("/category/:category", product_controller.getCategoryWisePage);
router.get("/view", ensureAuthenticated, product_controller.getAllProducts);
router.get("/delete/:id", ensureAuthenticated, product_controller.deleteProduct);
router.post("/search", product_controller.searchProduct);
router.get("/showfields/:cat", ensureAuthenticated, product_controller.showProductRegistrationFields);
router.get("/singleProduct/:id", product_controller.singleProduct);
router.get("/Edit/:category/:id", product_controller.getEditpage);
router.get("/stock", product_controller.getAllProductStock);
router.get("/stockEditPage/:id", product_controller.getEditStockPage);
router.post("/stockEdit/:id", product_controller.getEditStock);
//saves product details
router.post("/regiSave/:category/:num", upload.single("imagePath"), (req, res) => {
  console.log(req.params.num)
  var num = parseInt(req.params.num, 10);
  var data = [];
  if (num > 0) {
    data.push(JSON.parse("{\"label\":\"" + req.body.feature0_label + "\",\"value\":\"" + req.body.feature0_value + "\"}"));
    if (num > 1) {
      data.push(JSON.parse("{\"label\":\"" + req.body.feature1_label + "\",\"value\":\"" + req.body.feature1_value + "\"}"));
      if (num > 2) {
        data.push(JSON.parse("{\"label\":\"" + req.body.feature2_label + "\",\"value\":\"" + req.body.feature2_value + "\"}"));
        if (num > 3) {
          data.push(JSON.parse("{\"label\":\"" + req.body.feature3_label + "\",\"value\":\"" + req.body.feature3_value + "\"}"));
          if (num > 4) {
            data.push(JSON.parse("{\"label\":\"" + req.body.feature4_label + "\",\"value\":\"" + req.body.feature4_value + "\"}"));
            if (num > 5) {
              data.push(JSON.parse("{\"label\":\"" + req.body.feature5_label + "\",\"value\":\"" + req.body.feature5_value + "\"}"));
              if (num > 6) {
                data.push(JSON.parse("{\"label\":\"" + req.body.feature6_label + "\",\"value\":\"" + req.body.feature6_value + "\"}"));
                if (num > 7) {
                  data.push(JSON.parse("{\"label\":\"" + req.body.feature7_label + "\",\"value\":\"" + req.body.feature7_value + "\"}"));
                  if (num > 8) {
                    data.push(JSON.parse("{\"label\":\"" + req.body.feature8_label + "\",\"value\":\"" + req.body.feature8_value + "\"}"));
                    if (num > 9) {
                      data.push(JSON.parse("{\"label\":\"" + req.body.feature9_label + "\",\"value\":\"" + req.body.feature9_value + "\"}"));
                      if (num > 10) {
                        data.push(JSON.parse("{\"label\":\"" + req.body.feature10_label + "\",\"value\":\"" + req.body.feature10_value + "\"}"));
                        if (num > 11) {
                          data.push(JSON.parse("{\"label\":\"" + req.body.feature11_label + "\",\"value\":\"" + req.body.feature11_value + "\"}"));
                          if (num > 12) {
                            data.push(JSON.parse("{\"label\":\"" + req.body.feature12_label + "\",\"value\":\"" + req.body.feature12_value + "\"}"));
                            if (num > 13) {
                              data.push(JSON.parse("{\"label\":\"" + req.body.feature13_label + "\",\"value\":\"" + req.body.feature13_value + "\"}"));
                              if (num > 14) {
                                data.push(JSON.parse("{\"label\":\"" + req.body.feature14_label + "\",\"value\":\"" + req.body.feature14_value + "\"}"));
                                if (num > 15) {
                                  data.push(JSON.parse("{\"label\":\"" + req.body.feature15_label + "\",\"value\":\"" + req.body.feature15_value + "\"}"));
                                  if (num > 16) {
                                    data.push(JSON.parse("{\"label\":\"" + req.body.feature16_label + "\",\"value\":\"" + req.body.feature16_value + "\"}"));
                                    if (num > 17) {
                                      data.push(JSON.parse("{\"label\":\"" + req.body.feature17_label + "\",\"value\":\"" + req.body.feature17_value + "\"}"));
                                      if (num > 18) {
                                        data.push(JSON.parse("{\"label\":\"" + req.body.feature18_label + "\",\"value\":\"" + req.body.feature18_value + "\"}"));
                                        if (num > 19) {
                                          data.push(JSON.parse("{\"label\":\"" + req.body.feature19_label + "\",\"value\":\"" + req.body.feature19_value + "\"}"));
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
 
  var pro = new Promise(function(resolve, reject){
    const readstream = gfs.createReadStream(req.file.filename);
    readstream.on('data', (chunk) => {
      arr = chunk.toString('base64');
      resolve();
    })
  })
 pro.then(()=>{
  
    SubCategory.findOne({ name: req.params.category }, function(err, ncategory){
      
      if(err) return next(err);
      Brand.findOne({ name: req.body.brand }, function(err, nbrand){
    
        newProduct = {
          name: req.body.title,
          subcategory: ncategory._id  ,
          productPrice: {
            listPrice: req.body.list_price,
            salePrice: req.body.salePrice,
            wholeSalePrice: req.body.wholeSalePrice
          },
          image: arr,
          owner: req.user.id,
          brand: nbrand._id,
          model: req.body.model,
          color:req.body.color,
          warranty: req.body.warranty,
          description: req.body.description,
          shippingInfo: req.body.shippingInfo,
          isActive:req.body.isActive,
          onSale:req.body.onSale,
          features: data,
          quantity:{
            stock: 0,
            storeLive: 0
          } ,
          pinned: "",
          home: ""
        };
        new Product(newProduct).save().then(product => {
          req.flash("success_msg", "Product added.");
          res.redirect("/products/view");
        });
      })
  })
  
  })
  pro.then(()=>{
    gfs.remove({ filename:req.file.filename }, (err) => {
      if (err) console.log(err)
     
  })
  })
});


module.exports = router;
