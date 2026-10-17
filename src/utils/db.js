import mongoose from "mongoose";

export const connectDB = async () => {
    if(!process.env.MONGO_URI) return new Error("MONGO_URI is not defined");
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};