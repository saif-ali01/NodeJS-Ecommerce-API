const jwt = require("jsonwebtoken");


const verifyToken = (req,res,next)=>{
    const bearerHeader = req.headers["authorization"];
    if(bearerHeader){
      const bearer =bearerHeader.split(" ")[1];
      jwt.verify(bearer,"saif",(err,user)=>{
        if(err){ res.json({result:err});}
        req.user = user;
       next();
      })
    }else{
      return res.status(401).json("token is not valid")
    }
   
}

const verifyTokenAndAuthorization =(req,res,next)=>{
  verifyToken(req,res,()=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
      next();
    }
    else{
      res.status(403).json("U R Not Alowed")
    }
  })
}


const verifyTokenAndAdmin =(req,res,next)=>{
  verifyToken(req,res,()=>{
    if(req.user.isAdmin){
      next();
    }
    else{
      res.status(403).json("U R Not Alowed")
    }
  })
}

module.exports ={verifyToken , verifyTokenAndAuthorization, verifyTokenAndAdmin};