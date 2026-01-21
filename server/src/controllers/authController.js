const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const register = async (req, res) => {
    // Get data from client request body
    const { username, email, password } = req.body;

    // Validation: Ensure all fields are present
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if user already exists (by email)
        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        });

        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash the password (Security step)
        // 10 is the salt rounds (complexity cost)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to MongoDB using Prisma
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                // wishlist will be empty by default
            }
        });

        // Send success response (Exclude password from response)
        res.status(201).json({
            message: "User registered successfully",
            data: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // Search User by Email
        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        // If user not found
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check Password (Compare input password vs hash in DB)
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT Token (Access Ticket)
        const token = jwt.sign(
            { userId: user.id, email: user.email }, // Payload (data stored in the token)
            process.env.JWT_SECRET,                 // Secret key from .env
            { expiresIn: '1d' }                     // Token valid for 1 day
        );

        // Send Token and User Data to Frontend
        res.json({
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { register, login };
