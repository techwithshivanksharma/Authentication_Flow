const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerUser = async(req, res) => {

    const {name, email, password} = req.body;

    //Check User Exists
    const userExists = await User.findOne({email});

    if(userExists){
        return res.status(400).json({message: "User already exists"});
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    //Generate token
    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: "15d"}
    );

    res.status(201).json({
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        token
    });
};

module.exports = {registerUser};