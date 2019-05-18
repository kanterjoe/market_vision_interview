const router = require("express").Router();
const path   = require('path');
const express= require('express');


router.use("/user", require('./user'));
router.use("/cart", require('./cart'));
router.use("/product", require('./product'));

if (process.env.NODE_ENV === 'production') {
    router.use(express.static(path.join(path.resolve(path.dirname('')), 'client/build')))
    router.get("*", (req,res,err) => res.sendFile(path.join(path.resolve(path.dirname('')) ,"client/build/index.html")))
    router.get("/", (req,res,err) => res.sendFile(path.join(path.resolve(path.dirname('')) ,"client/build/index.html")))

}

module.exports = router;