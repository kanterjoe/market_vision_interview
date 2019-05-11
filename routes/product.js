const ejwt = require("express-jwt");
const router = require("express").Router();
const db = require('../models');

router.use(ejwt({ secret: process.env.JWT_SECRET}).unless({path:['user']}));



router.route('/')
    .get( (req, res, err) => db.Product.find({...req.query})
        .then(products => res.json(products))
        .catch(err => res.json(500, err))
    )
;
module.exports = router;