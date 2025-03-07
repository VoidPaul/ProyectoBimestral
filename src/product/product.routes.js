import { Router } from "express";
import { createdProductValidator, deleteProductValidator, updateProductValidator, getProductByNameValidator, getProductSouldOutValidator } from "../middlewares/product-validator.js";
import { addProduct, deleteProduct, getProduct, getProductByCategory, getProductByName, updateProduct, getProductSoldOut, getTopSellingProducts } from "./product.controller.js";

const router = Router();

router.post("/addProduct",createdProductValidator, addProduct);

router.get("/findProduct/:nameProduct", getProductByNameValidator, getProductByName);

router.get("/productCatalog/", getProduct);

router.get("/productCatalog/category/:uid", getProductByCategory);

router.get("/soldOut/", getProductSouldOutValidator, getProductSoldOut);

router.put("/updateProduct/:uid", updateProductValidator, updateProduct);

router.delete("/deleteProduct/:uid", deleteProductValidator, deleteProduct);

router.get("/topSellingProducts", getTopSellingProducts);

export default router;