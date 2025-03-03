import User from '../src/cliente/cliente.model.js';

const createAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: "ADMIN" });
        if (!adminExists) {
            const adminData = {
                name: "Admin",
                apellido: "User",
                email: "admin@example.com",
                password: "Adminpassword123",
                role: "ADMIN",
                direccion: "zona 7",
                telefono: "12345678",
                
            };
            await User.create(adminData);
            console.log("Admin user created successfully");
        } else {
            console.log("Admin user already exists");
        }
    } catch (err) {
        console.error("Error creating admin user or default category:", err);
    }
};

export default createAdmin;