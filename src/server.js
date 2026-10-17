import "dotenv/config"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import express from "express"
import { connectDB } from "./utils/db.js"
import { authMiddleware } from "./middleware/auth.middleware.js"
import productRoutes from "./routes/product.routes.js"
import { checkAdmin } from "./middleware/isAdmin.js"
const PORT = process.env.PORT || 5000
const app = express()

//db connection
connectDB()
// this is not good practice i am just doing this for test purposes
app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.get("/health", authMiddleware ,(req, res) => {
    res.send({
        sucess: true,
        message: "Server is Healthy"
    })
})


//api's

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/products",authMiddleware,checkAdmin, productRoutes)
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})