import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createNotes, deleteAllNotes, deleteNote, getAllNotes, getSingleNote, updateNote, updateStatus } from "../controller/note.controller";
const router = Router();

router.use(authMiddleware)

router.post("/notes",createNotes)
router.get("/notes",getAllNotes)
router.get("/notes/:id",getSingleNote)
router.put("/notes/:id",updateNote)
router.put("/notes/:id",updateStatus)
router.delete("/notes/:id",deleteNote)
router.delete("/notes",deleteAllNotes)   



export default router;