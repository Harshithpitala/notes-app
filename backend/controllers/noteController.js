const Note = require("../models/Note");
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                message: "please fill all tables",
            });
        }
        const note = await Note.create({
            title, content, user: req.user._id,
        });
        res.status(201).json({
            message: "Note Created Successfully",
            note,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
const getMyNotes=async(req,res)=>{
    try{
        const notes=await Note.find({
            user:req.user._id
        });
        res.status(200).json(notes);
    }
    catch(error){
res.status(500).json({
    message:error.message
});
    }
};
const updateNote = async (req, res) => {
  try {

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    // Check ownership
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not Authorized"
      });
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
const deleteNote = async (req, res) => {
  try {

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    // Check Ownership
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not Authorized"
      });
    }

    await note.deleteOne();

    res.status(200).json({
      message: "Note Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
module.exports={
    createNote,getMyNotes,updateNote,deleteNote
};