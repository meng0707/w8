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

// POST /api/products
router.post('/', async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newProduct = new Product({
      name,
      price,
      description
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PUT /api/products/:id
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, description } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, price, description },
        { new: true, runValidators: true }
      );
      if (!updatedProduct) {
        return res.status(404).send('Product not found');
      }
      res.json(updatedProduct);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  // DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).send('Product not found');
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

module.exports = router;
