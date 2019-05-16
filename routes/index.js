const router = require("express").Router();
const path   = require('path');


router.use("/user", require('./user'));
router.use("/cart", require('./cart'));
router.use("/product", require('./product'));

router.get("*", (req,res,err) => res.sendFile(path.join(path.resolve(path.dirname('')) ,"client/build")))
router.get("/", (req,res,err) => res.sendFile(path.join(path.resolve(path.dirname('')) ,"client/build")))

module.exports = router;