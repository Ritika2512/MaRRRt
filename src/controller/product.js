const slugify = require('slugify');
const Product = require('../models/product');

exports.addProduct = (req, res)=>{
    const {name, price, description, quantity, offer, category, review} = req.body;

    let productPictures = [];

    if(req.files.length > 0){
        productPictures = req.files.map((file)=>{
            return ({img: file.filename});
        });
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        description,
        productPictures,
        quantity,
        offer, 
        category,
        review,
        createdBy: req.user._id
    });

    product.save((error, product)=>{
        if(error) return res.status(400).json({error});
        if(product) return res.status(200).json({product});
    });
}

exports.getProducts = (req, res)=>{
    Product.find({})
    .exec((error, products)=>{
        if(error) return res.status(400).json({error});
        if(products) return res.status(200).json({ProductList : products});
    });
}