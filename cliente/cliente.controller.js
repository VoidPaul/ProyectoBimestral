import { hash, verify } from "argon2";
import Cliente from "./cliente.model.js";
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getClienteById = async (req, res) => {
    try {
        const { uid } = req.params;
        const cliente = await Cliente.findById(uid);

        if (!cliente) {
            return res.status(404).json({
                success: false,
                message: "Cliente no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            cliente
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el cliente",
            error: err.message
        });
    }
};

export const deleteCliente = async (req, res) => {
    try {
        const { uid } = req.params;

        const cliente = await Cliente.findByIdAndUpdate(uid, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Cliente eliminado",
            cliente
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el cliente",
            error: err.message
        });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params;
        const { newPassword } = req.body;

        const cliente = await Cliente.findById(uid);

        const matchOldAndNewPassword = await verify(cliente.password, newPassword);

        if (matchOldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            });
        }

        const encryptedPassword = await hash(newPassword);

        await Cliente.findByIdAndUpdate(uid, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        });
    }
};

export const updateCliente = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const updatedCliente = await Cliente.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Cliente Actualizado',
            cliente: updatedCliente,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar cliente',
            error: err.message
        });
    }
};

export const updateProfilePicture = async (req, res) => {
    try {
        const { uid } = req.params;
        let newProfilePicture = req.file ? req.file.filename : null;

        if (!newProfilePicture) {
            return res.status(400).json({
                success: false,
                msg: 'No se proporcionó una nueva foto de perfil',
            });
        }

        const cliente = await Cliente.findById(uid);

        if (cliente.profilePicture) {
            const oldProfilePicturePath = join(__dirname, "../../public/uploads/profile-pictures", cliente.profilePicture);
            await fs.unlink(oldProfilePicturePath);
        }

        cliente.profilePicture = newProfilePicture;
        await cliente.save();

        res.status(200).json({
            success: true,
            msg: 'Foto de perfil actualizada',
            cliente,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar la foto de perfil',
            error: err.message
        });
    }
};