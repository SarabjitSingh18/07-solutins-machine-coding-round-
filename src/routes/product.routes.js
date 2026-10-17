import express from "express"
import { allProducts, createProduct } from "../controllers/product.controller.js"

const router = express.Router()


router.post("/",createProduct)
router.get("/",allProducts)


export default router