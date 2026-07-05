const express=require("express");
const router=express.Router();
const {createNote,getMyNotes,updateNote,deleteNote}=require("../controllers/noteController");
const protect=require("../middleware/authMiddleware");
router.post("/",protect,createNote);
router.get("/",protect,getMyNotes);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);
module.exports=router;