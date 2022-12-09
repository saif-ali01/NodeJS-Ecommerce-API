var mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    UserId: {
        type: String,
        required: true,
        unique: true
    },
    products: [
        {
            productId: {
                type: Array
            },
            quantity: {
                type: Number,
                default: 1,
            }
        },
    ],
    amount:{type:Number, required:true},
    address:{type:Object, required:true},
    status:{
        type:String, default:"pending"
    }

}, { timestamps: true });

module.exports = mongoose.model('order', orderSchema);