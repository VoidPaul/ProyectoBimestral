import { Schema, model} from "mongoose";

const ClienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ["CLIENT"],
    default: "CLIENT",
  },
  direccion: {
    type: String,
    trim: true,
  },
  telefono: {
    type: String,
    trim: true,
  },
  historialCompras: [
    {
      factura: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Factura",
      },
    },
  ],
  creadoEn: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("Cliente", ClienteSchema)