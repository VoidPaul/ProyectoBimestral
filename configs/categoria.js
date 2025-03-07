import Categoria from '../src/categoria/categoria.model.js';

const createCategory = async () => {
    try {
        const categoryExists = await Categoria.findOne({ nombre: "General" });
        if (!categoryExists) {
            const categoryData = {
                nombre: "General",
                descripcion: "Categoría por defecto",
                estado: true
            };
            await Categoria.create(categoryData);
            console.log("Categoría por defecto creada exitosamente");
        } else {
            console.log("La categoría por defecto ya existe");
        }
    } catch (err) {
        console.error("Error creando la categoría por defecto:", err);
    }
};

export default createCategory;