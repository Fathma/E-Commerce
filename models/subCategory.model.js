const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Text = require('../node_modules/text/lib/text');


var SubCategorySchema = new Schema({
    name: { type: Text, es_type: 'text', unique: true },
    features:{ type: Array },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SubCategory', SubCategorySchema, 'subCategories');