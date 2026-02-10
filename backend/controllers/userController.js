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


//Login User

const loginUser = async (req, res) =>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid Email or Password"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({message: "Invalid Password or Email"});
        }

        //token generate
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "15d"}
        );

        res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });
    }catch(error){
        console.error("LOGIN ERROR 👉", error);
        res.status(500).json({message:"Server Error"});
    }
};

const getUserProfile = async (req, res) => {
    //req.user middleware se aaya hai
    res.json(req.user);
};


module.exports = {registerUser, loginUser, getUserProfile};