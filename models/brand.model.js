const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Text = require('../node_modules/text/lib/text');


var BrandSchema = new Schema({
    name: { type: String, es_type: 'text', unique: true },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Brand', BrandSchema, 'brands');