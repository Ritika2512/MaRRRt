const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { addProduct, getProducts } = require('../controller/product');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const router = express.Router();

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'upload'))
    },
    filename: function(req, file, cb){
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({storage});

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPictures'),addProduct);

router.get('/product/getproduct', getProducts );

module.exports = router;