const ejwt = require("express-jwt");
const router = require("express").Router();
const db = require('../models');
const getProductId = body => body.productId? Promise.resolve(body.productId) : Promise.reject({status: 400, msg: "No Product id specficied."});

const pushProduct = (product, user) => db.User.findOneAndUpdate({_id: user._id}, {$addToSet: {cart: product}});
const deleteProduct = (product, user) => db.User.findOneAndUpdate({_id: user._id}, {$pullAll: {cart: [product]}});

router.use(ejwt({ secret: process.env.JWT_SECRET}).unless({path:['user']}));

// db.Product.create({
//     name: "XKCD",
//     description: "A webcomic",
//     category: "Non-things",
//     image: "https://imgs.xkcd.com/comics/cubesat_launch_2x.png",
// });

router.route('/')
    .get( (req, res, err) => db.User.findOne({_id: req.user.data._id})
        .then(dbUser => res.json(dbUser.cart))
        .catch( err => res.json(err))
    )
    .post( (req, res, err) => getProductId(req.params)
        .then( productId => pushProduct(productId, req.user.data))
        .then(dbUser => res.json(dbUser.cart))
        .catch( err => res.json(err))

    )
;
router.route('/:productId')
    .post( (req, res, err) => getProductId(req.params)
        .then( productId => pushProduct(productId, req.user.data))
        .then(dbUser => res.json(dbUser.cart))
    )
    .delete( (req, res, err) => getProductId(req.params)
        .then( productId => deleteProduct(productId, req.user.data))
        .then(dbUser => res.json(dbUser.cart))
        .catch( err=> res.json(500, err))
    )
;
module.exports = router;