import { Router } from "express";
import { addCategory, deleteCategory, getCategory, updateCategory } from "./categoria.controller.js";
import { createdCategoryValidator, deleteCategoryValidator, updateCategoryValidator } from "../middlewares/category-validator.js";

const router = Router();

router.post("/addCategory", createdCategoryValidator, addCategory);

router.get("/", getCategory);

router.patch("/updateCategory/:id", updateCategoryValidator, updateCategory);

router.delete("/deleteCategory/:id", deleteCategoryValidator, deleteCategory);

export default router;