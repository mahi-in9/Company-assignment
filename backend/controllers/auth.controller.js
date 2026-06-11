const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const logActivity = require("../utils/activityLog");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
};



const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "User"
        });

        res.status(201).json({
            success: true,
            message: "Registration successful",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        if (
            user.status ===
            "Inactive"
        ) {
            return res.status(403)
                .json({
                    success: false,
                    message:
                        "Account inactive"
                });
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token =
            generateToken(user._id);

        await logActivity({
            user: user._id,
            action: "LOGIN",
            description: `${user.name} logged in`
        });
        const safeUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        };

        res.json({
            success: true,
            token,
            user: safeUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    register,
    login
};