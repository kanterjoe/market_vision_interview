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

userSchema.methods.addToCart = function(productId) {
    return this.update({$addToSet: {cart: productId}})
};
userSchema.methods.deleteFromCart = function(productId) {
    return this.update({$pullAll: {cart: productId}})
};

module.exports = mongoose.model("User", userSchema);