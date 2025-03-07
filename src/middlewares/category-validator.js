import { body, param } from "express-validator";
import { handleErrors } from "./handle-errors.js";
import { validarCampos } from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import Categoria from "../categoria/categoria.model.js";

const categoryExists = async (id) => {
    const category = await Categoria.findById(id);
    if (!category) {
        throw new Error(`La categoría con el ID ${id} no existe`);
    }
};

export const createdCategoryValidator = [
    validateJWT,
    body("nombre").notEmpty().withMessage("El nombre de la categoría es requerido"),
    body("descripcion").notEmpty().withMessage("La descripción es requerida"),
    validarCampos,
    handleErrors
];

export const updateCategoryValidator = [
    validateJWT,
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB").custom(categoryExists),
    body("descripcion").optional().notEmpty().withMessage("La descripción es requerida"),
    validarCampos,
    handleErrors
];

export const deleteCategoryValidator = [
    validateJWT,
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB").custom(categoryExists),
    validarCampos,
    handleErrors
];