const express=require('express');
const mongoose= require('mongoose');
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');

const authRouter = require("./router/auth");
const userRouter = require("./router/user");
const productRouter = require("./router/Product");
const cartRouter = require("./router/Cart");
const orderRouter = require("./router/Order");
const app=express();

const cors = require("cors");

app.use(cors({
    origin:"http://localhost:3000"
}))


// app use
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieParser());

// database connection
mongoose.connect( 'mongodb://localhost:27017/Eshop',{ useNewUrlParser: true,useUnifiedTopology:true })
.then(()=>{
    console.log("Database Connected")
})
.catch((err)=>{
    console.log(err)

})

app.use("/api/auth",authRouter);
app.use("/api/users",userRouter);
app.use("/api/products",productRouter);
app.use("/api/orders",orderRouter);
app.use("/api/carts",cartRouter);






// listening port
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});