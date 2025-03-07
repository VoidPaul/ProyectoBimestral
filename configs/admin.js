import { hash } from 'argon2';
import Cliente from '../src/cliente/cliente.model.js';

const createAdmin = async () => {
    try {
        const adminExists = await Cliente.findOne({ role: "ADMIN" });
        if (!adminExists) {
            const adminData = {
                nombre: "Admin",
                apellido: "User",
                email: "admin@example.com",
                password: await hash("Adminpassword123"), 
                role: "ADMIN",
                direccion: "zona 7",
                telefono: "12345678",
                profilePicture: "pictureAdmin.jpg" 
            };
            await Cliente.create(adminData);
            console.log("Admin creado exitosamente");
        } else {
            console.log("Admin ya existe");
        }
    } catch (err) {
        console.error("Error creando el usuario administrador:", err);
    }
};

export default createAdmin;