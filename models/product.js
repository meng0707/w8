// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // ดึงข้อมูลผลิตภัณฑ์ทั้งหมด
    res.json(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
