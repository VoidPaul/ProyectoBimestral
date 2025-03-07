import { Router } from "express";
import { historialFactura, actualizarFactura } from "./invoices.controller.js";
import { validarFactura } from "../middlewares/factura-validate.js";

const router = Router();

router.get("/historialFactura", validarFactura, historialFactura);
router.put("/actualizarFactura/:id", validarFactura, actualizarFactura);

export default router;