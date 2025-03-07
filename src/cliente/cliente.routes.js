import { Router } from "express";
import { getClienteById, getClientes, deleteCliente, updatePassword, updateCliente, updateRol } from "./cliente.controller.js";
import { getUserByIdValidator, deleteUserValidator, updatePasswordValidator, updateUserValidator, updateRolValidator, getClientesValidator } from "../middlewares/user-validators.js";

const router = Router();

router.get("/findCliente/:uid", getUserByIdValidator, getClienteById);

router.get("/",getClientesValidator, getClientes );

router.delete("/deleteCliente/:uid", deleteUserValidator, deleteCliente);

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword);

router.put("/updateCliente/:uid", updateUserValidator, updateCliente);

router.patch("/updateRol/:uid", updateRolValidator, updateRol);


export default router;