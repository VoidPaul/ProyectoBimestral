import Cliente from "../cliente/cliente.model.js";

export const emailExists = async (email = "") => {
    const existe = await Cliente.findOne({ email });
    if (existe) {
        throw new Error(`El email ${email} ya está registrado`);
    }
};

export const userExists = async (uid = "") => {
    const existe = await Cliente.findById(uid);
    if (!existe) {
        throw new Error("No existe el cliente con el ID proporcionado");
    }
};