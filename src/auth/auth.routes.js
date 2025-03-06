import { Router } from "express";
import { register, login, registerAdmin } from "./auth.controller.js";
import { registerValidator, loginValidator, registerAdminValidator } from "../middlewares/user-validators.js";

const router = Router();

router.post(
  "/register",
  registerValidator,
  register
);

router.post(
  "/login",
  loginValidator,
  login
);

router.post(
  "/admin/register",
  registerAdminValidator,
  registerAdmin
);

export default router;