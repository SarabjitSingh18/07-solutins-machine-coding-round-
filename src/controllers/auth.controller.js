import Customer from "../models/customer.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerCustomer = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    const checkExistingUser = await Customer.findOne({ email });
    if (checkExistingUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        })
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const customer = await Customer.create({
        name,
        email,
        password: hashedPassword,
        role
    })

    return res.status(200).json({
        success: true,
        message: "User registered successfully",
        customer
    })


}

export const loginCustomer = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    const customer = await Customer.findOne({ email });
    if (!customer) {
        return res.status(400).json({
            success: false,
            message: "User does not exist"
        })



    }
    const isPasswordCorrect = await bcryptjs.compare(password, customer.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        })
    }
    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token
    })
}
