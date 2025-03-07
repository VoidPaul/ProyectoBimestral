import { Schema, model } from "mongoose";

const carritoSchema = new Schema({
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    productos: [
        {
            productoId: {
                type: Schema.Types.ObjectId,
                ref: "Producto",
                required: true
            },
            cantidad: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ]
}, {
    versionKey: false,
    timestamps: true
});

export default model("Carrito", carritoSchema);