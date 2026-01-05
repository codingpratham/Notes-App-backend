import Express  from "express";
import { login, register } from "../controller/user.controller";
const router = Express.Router();

router.post("/login", login);
router.post("/register",register);
router.get("/logout",login);

export default router;