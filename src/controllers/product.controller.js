import Customer from "../models/customer.model.js";
import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
    // Implementation for creating a new product

    try {
        const { name, price } = req.body;
        const { id } = req.user;

        const user = await Customer.findById(id);
        console.log(user.role)
        if (!name || !price) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        if (user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Only admins can create products"
            });
        }
        const product = new Product({
            name,
            price
        });

        product.save()
            .then((savedProduct) => {
                res.status(201).json({
                    success: true,
                    message: "Product created successfully",
                    data: savedProduct
                });
            })
            .catch((error) => {
                res.status(500).json({
                    success: false,
                    message: "Error creating product",
                    error: error.message
                });
            });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


export const allProducts = async (req, res) => {
    const products = await Product.find({})
    if (!products) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
    res.status(200).json({
        success: true,
        message: "product fetched sucessfully",
        error: error.message
    });
}