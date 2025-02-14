import { Router } from "express";
import {
  getClienteById,
  getClientes,
  deleteCliente,
  updatePassword,
  updateCliente,
  updateProfilePicture,
} from "./cliente.controller.js";
import {
    getUserByIdValidator,
    deleteUserValidator,
    updatePasswordValidator,
    updateUserValidator,
    updateProfilePictureValidator,
  } from "../middlewares/user-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

/**
 * @swagger
 * /adoptionSystem/v1/cliente/findCliente/{uid}:
 *   get:
 *     summary: Retrieve a cliente by ID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A cliente object
 */
router.get("/findCliente/:uid", getUserByIdValidator, getClienteById);

/**
 * @swagger
 * /adoptionSystem/v1/cliente:
 *   get:
 *     summary: Retrieve a list of clientes
 *     responses:
 *       200:
 *         description: A list of clientes
 */
router.get("/", getClientes);

/**
 * @swagger
 * /adoptionSystem/v1/cliente/deleteCliente/{uid}:
 *   delete:
 *     summary: Delete a cliente by ID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente deleted
 */
router.delete("/deleteCliente/:uid", deleteUserValidator, deleteCliente);

/**
 * @swagger
 * /adoptionSystem/v1/cliente/updatePassword/{uid}:
 *   patch:
 *     summary: Update a cliente's password
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated
 */
router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword);

/**
 * @swagger
 * /adoptionSystem/v1/cliente/updateCliente/{uid}:
 *   put:
 *     summary: Update a cliente's information
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente updated
 */
router.put("/updateCliente/:uid", updateUserValidator, updateCliente);

/**
 * @swagger
 * /adoptionSystem/v1/cliente/updateProfilePicture/{uid}:
 *   patch:
 *     summary: Update a cliente's profile picture
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture updated
 */
router.patch(
  "/updateProfilePicture/:uid",
  uploadProfilePicture.single("profilePicture"),
  updateProfilePictureValidator,
  updateProfilePicture
);

export default router;