import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createdProductValidator = [
    validateJWT,
    hasRoles(['admin', 'manager']),
    body("nameProduct").notEmpty().withMessage("El nombre del producto es requerido"),
    body("price").isFloat({ gt: 0 }).withMessage("El precio debe ser un número positivo"),
    body("category").notEmpty().withMessage("La categoría es requerida"),
    validarCampos,
    handleErrors
];

export const updateProductValidator = [
    validateJWT,
    hasRoles(['admin', 'manager']),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("nameProduct").optional().notEmpty().withMessage("El nombre del producto no puede estar vacío"),
    body("price").optional().isFloat({ gt: 0 }).withMessage("El precio debe ser un número positivo"),
    body("category").optional().notEmpty().withMessage("La categoría no puede estar vacía"),
    validarCampos,
    handleErrors
];

export const deleteProductValidator = [
    validateJWT,
    hasRoles(['admin']),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];

export const getProductByNameValidator = [
    param("nameProduct").notEmpty().withMessage("El nombre del producto es requerido"),
    validarCampos,
    handleErrors
];

export const getProductSouldOutValidator = [
    handleErrors
];