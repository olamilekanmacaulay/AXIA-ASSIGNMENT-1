const bcrypt = require('bcryptjs');

const userModel = require("../models/users.model");

const createUser = async (req, res) => {
    const { password, ...others } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const isUser = await userModel.findOne({email: others.email})
    if(isUser){
        return res.json({ message: "email is already registered with another account"});
    }
    try {
        const newUser = new userModel({...others, password: hashedPassword });
        await newUser.save()
        res.send("user created successfully")
    } catch (error) {
        res.send(error)
        res.send("something went wrong");
    }
};

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.json({message: "Either your email or password is empty"});
    }
    const checkUser = await userModel.findOne({email})
    if (!checkUser){
        return res.json({message: "user not found, please register"});
    }
    const isPasswordValid = bcrypt.compareSync(password, checkUser.password);
    if (!isPasswordValid) {
        return res.json({message: "Incorrect Password"});
    }
    return res.json(checkUser);
};

const getAllusers = async(req, res)=>{
    try{
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        res.send("something went wrong")
    }

};

const deleteUser = async (req, res) => {
    const {id} = req.body
    try {
        await userModel.findByIdAndDelete(id)
        res.send("user deleted successfully")
    } catch (error) {
        res.send('something went wrong')
    }
};


module.exports = { createUser, getAllusers, deleteUser, loginUser };