const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    image: String,
    price: Number,
});


module.exports = mongoose.model("Product", productSchema);