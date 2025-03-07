import { validateJWT } from "./validate-jwt.js";

export const validarCarrito = (req, res, next) => {
    validarJWT(req, res, (err) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Token no válido"
            });
        }
        next();
    });
};