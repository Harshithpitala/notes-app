const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "please fill all fields",
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name, email, password: hashPassword,
        });
        res.status(201).json({
            message: "user Registered successfully",
            user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "please fill all fields",
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "invalid password",
            });
        }
        const token = jwt.sign(
            {
                id: user._id
            }, process.env.JWT_SECRET,
            { expiresIn: "7d" }

        );
        res.status(200).json({
            message: "login successfull", token,
            user: {
                id: user._id, name: user.name, email: user.email,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
module.exports = { registerUser, loginUser };