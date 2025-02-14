import { Schema, model} from "mongoose";

const clienteSchema = Schema({
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
    enum: ["CLIENTE"],
    default: "CLIENTE",
  },
  profilePicture:{
    type: String
  },
  direccion: {
    type: String,
    trim: true,
  },
  telefono: {
    type: String,
    trim: true,
  },
  creadoEn: {
    type: Date,
    default: Date.now,
  },
  status:{
    type: Boolean,
    default: true
}
},
{
versionKey: false,
timeStamps: true
});

clienteSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("Cliente", clienteSchema)