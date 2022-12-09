var mongoose=require('mongoose');

const cartSchema=mongoose.Schema({
    UserId:{
        type: String,
        required: true,
        unique: true
    },
    products:[{
        productId:{
            type:Array
        },
        quantity:{
            type:Number,
            default:1,
        }        
    },
],
},{timestamps:true});

module.exports=mongoose.model('cart',cartSchema);