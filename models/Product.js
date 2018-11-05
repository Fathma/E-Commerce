const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const productSchema = new Schema({
	
  title: { type: String, required: false },
  price: { type: Number, required: false },
  imagePath: { type:String, required: false },
  category: { type: String, required: false },
  productID: { type: String, required: false },
  brand: { type: String, required: false },
  model: { type: String, required: false },
  warranty: { type: String, required: false },
  pinned: { type: String, required: false },
  home: { type: String, required: false },
  features:{type: Array, required: false }

});

module.exports = mongoose.model('product', productSchema, 'products');



