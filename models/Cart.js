const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
    name: String,
});


module.exports = mongoose.model("Cart", cartSchema);