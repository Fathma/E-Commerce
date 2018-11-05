const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const categorySchema = new Schema({
    category:{ type: String, required: false },
    sub:{ type: Array, required: false }

});

module.exports = mongoose.model('category', categorySchema, 'category');



