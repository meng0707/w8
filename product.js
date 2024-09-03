const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  tell: { type: Number, required: false },
  email: { type: String, required: false },

  description: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
