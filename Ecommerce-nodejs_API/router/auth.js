const express = require("express");
const router = express.Router();
const User  = require('../modals/user')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {verifyToken} = require("../verify/verifyToken")
 
router.post("/signup",async (req,res)=>{
   const user= await User.findOne({username:req.body.username})
   if(user){
      res.status(404).json("user already exists");
   }
   else if(!user){
      const newUser = new User({
         username: req.body.username,
         email:req.body.email,
         password:bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(8),null)
      })
      
      try{
         const savedUser = await newUser.save();
      res.status(201).json(savedUser);

      }catch(err){
      res.status(500).json(err);

      }

   }

});


//SIGNIN

router.post("/signin",async(req,res)=>{
   const user= await User.findOne({username:req.body.username})
   if(!user){
      res.status(404).json("user not exists");
   }

   else if(user){
     const matchPassword = bcrypt.compareSync(req.body.password,user.password)
     if(matchPassword){
      const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},"saif",{expiresIn:"3d"})
      res.status(201).json({user,token});
     }
     else{
      res.status(404).json("Wrong Password");
     }
   }

})



module.exports = router