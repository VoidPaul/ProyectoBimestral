import { Router } from "express";
import { agregarProductosAlCarrito, obtenerProductosDelCarrito, completarCompra } from "./carrito.controller.js";
import { validarCarrito } from "../middlewares/carrito-validate.js";

const router = Router();

router.post("/agregarCarrito/", validarCarrito, agregarProductosAlCarrito);

router.get("/verProductos/", validarCarrito, obtenerProductosDelCarrito);

router.post("/completarCompra/:carritoId", validarCarrito, completarCompra);

export default router;