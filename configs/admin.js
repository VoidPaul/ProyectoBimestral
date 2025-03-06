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
                password: await hash("Adminpassword123"), // Encripta la contraseña
                role: "ADMIN",
                direccion: "zona 7",
                telefono: "12345678",
                profilePicture: "pictureAdmin.jpg" // Asegúrate de incluir la imagen de perfil si es necesario
            };
            await Cliente.create(adminData);
            console.log("Usuario administrador creado exitosamente");
        } else {
            console.log("El usuario administrador ya existe");
        }
    } catch (err) {
        console.error("Error creando el usuario administrador:", err);
    }
};

export default createAdmin;