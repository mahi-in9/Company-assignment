require("dotenv").config();

const mongoose =
    require("mongoose");

const bcrypt =
    require("bcryptjs");

const User =
    require("../models/User");

const connectDB =
    require("../config/db");

const seedAdmin =
    async () => {

        await connectDB();

        const existingAdmin =
            await User.findOne({
                email:
                    "admin@gmail.com"
            });

        if (existingAdmin) {
            console.log(
                "Admin already exists"
            );

            process.exit();
        }

        const hashedPassword =
            await bcrypt.hash(
                "admin123",
                10
            );

        await User.create({
            name: "Admin",
            email:
                "admin@gmail.com",
            password:
                hashedPassword,
            role: "Admin"
        });

        console.log(
            "Admin Created"
        );

        process.exit();
    };

seedAdmin();