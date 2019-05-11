const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    cart: [
        {
            type: mongoose.ObjectId,
            ref: "Product"
        }
    ],
});


module.exports = mongoose.model("User", userSchema);