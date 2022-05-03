const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/products');
const auth = require('../security/authentication');

router.get('/all', auth, ProductController.getAllProducts);
router.get('/get/:id', auth, ProductController.getById);
router.get('/find/:key-:value', auth, ProductController.find);
router.post('/add', auth, ProductController.add);
router.put('/edit/:id', auth, ProductController.update);
router.delete('/delete/:id', auth, ProductController.delete);

module.exports = router;
