import { Router } from "express";
import userRoutes from "./user.routes";
import noteRoutes from "./notes.routes";
const router = Router();

router.use('/auth',userRoutes)
router.use('/notes',noteRoutes)

export default router;