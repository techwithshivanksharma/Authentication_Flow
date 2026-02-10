const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try{
        //extract "TOKEN" from "BEARER TOKEN"
        token = req.headers.authorization.split(' ')[1];

        //verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //User ko DB se lao (password ke bina)
        req.user = await User.findById(decoded.id).select("-password");
        
        //Next middleware / Controller 
        return next();
    }catch(error){
        return res.status(401).json({message: "Token Invalid!"});
    }   
  }

  if(!token){
    res.status(401).json({message: "No Token, Authorization Denied"});
  }
};

module.exports = {protect};
