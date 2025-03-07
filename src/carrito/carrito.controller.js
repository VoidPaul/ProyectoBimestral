import Carrito from "./carrito.model.js";
import Producto from "../product/product.model.js";
import Factura from "../invoices/invoices.model.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const agregarProductosAlCarrito = async (req, res) => {
    try {
        const { productos } = req.body;
        const usuarioId = req.usuario._id;

        let carrito = await Carrito.findOne({ usuarioId });

        if (!carrito) {
            carrito = new Carrito({ usuarioId, productos: [] });
        }

        for (const producto of productos) {
            const productoExistente = carrito.productos.find(p => p.productoId.toString() === producto.productoId);
            if (productoExistente) {
                productoExistente.cantidad += producto.cantidad;
            } else {
                carrito.productos.push({
                    productoId: producto.productoId,
                    cantidad: producto.cantidad
                });
            }
        }

        await carrito.save();

        res.status(200).json({
            success: true,
            message: "Productos agregados al carrito",
            carrito
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al agregar productos al carrito",
            error: err.message
        });
    }
};

export const obtenerProductosDelCarrito = async (req, res) => {
    try {
        const usuarioId = req.usuario._id;
        const carrito = await Carrito.findOne({ usuarioId }).populate('productos.productoId');

        if (!carrito) {
            return res.status(404).json({
                success: false,
                message: "Carrito no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            productos: carrito.productos
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al obtener los productos del carrito",
            error: err.message
        });
    }
};

export const completarCompra = async (req, res) => {
    try {
        const usuarioId = req.usuario._id;
        const { nombreTarjeta, numeroTarjeta, fechaExpiracion, cvv } = req.body;
        const carritoId = req.params.carritoId;

        if (!nombreTarjeta || !numeroTarjeta || !fechaExpiracion || !cvv) {
            return res.status(400).json({
                success: false,
                message: "Información del método de pago incompleta"
            });
        }

        const carrito = await Carrito.findById(carritoId).populate('productos.productoId');

        if (!carrito || carrito.productos.length === 0) {
            return res.status(400).json({
                success: false,
                message: "El carrito está vacío o no existe"
            });
        }

        for (const item of carrito.productos) {
            const producto = await Producto.findById(item.productoId);
            if (!producto) {
                return res.status(404).json({
                    success: false,
                    message: `Producto con ID ${item.productoId} no encontrado`
                });
            }
            if (producto.stock < item.cantidad) {
                return res.status(400).json({
                    success: false,
                    message: `Stock insuficiente para el producto ${producto.nombre}`
                });
            }
            producto.stock -= item.cantidad;
            await producto.save();
        }

        const total = carrito.productos.reduce((acc, item) => acc + item.productoId.precio * item.cantidad, 0);
        const factura = new Factura({
            usuarioId,
            productos: carrito.productos,
            total,
            metodoPago: {
                nombreTarjeta,
                numeroTarjeta,
                fechaExpiracion,
                cvv
            }
        });
        await factura.save();

        await Carrito.findByIdAndDelete(carritoId);

        const doc = new PDFDocument();
        const filePath = path.join(__dirname, '../../public/facturas', `factura_${factura._id}.pdf`);
        doc.pipe(fs.createWriteStream(filePath));

        doc.fontSize(25).text('Factura', { align: 'center' });
        doc.moveDown();
        doc.fontSize(16).text(`ID de Factura: ${factura._id}`);
        doc.text(`Fecha: ${factura.fecha}`);
        doc.text(`Total: Q${factura.total}`);
        doc.moveDown();
        doc.text('Productos:');
        doc.moveDown();

        factura.productos.forEach((item, index) => {
            doc.text(`${index + 1}. ${item.productoId.nombrePro} - Cantidad: ${item.cantidad}`);
            doc.text('----------------------------------------');
        });

        doc.end();

        res.status(200).json({
            success: true,
            message: "Compra completada con éxito",
            factura,
            pdfPath: filePath
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al completar la compra",
            error: err.message
        });
    }
};