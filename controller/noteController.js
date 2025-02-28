const Note = require("../models/note");

const fetchNotes = async(req,res)=>{
    //find the notes
    const notes = await Note.find();

    //respond with them
    res.json({notes});
};

const fetchNotesById = async(req,res)=>{
    const noteId = req.params.id;
    const note = await Note.findById(noteId);
    res.json({note:note});
};

const createNote = async (req,res)=>{
    //get data off req body
    // const{title,body} = req.body;    
    const title = req.body.title;
    const body = req.body.body;

    //create a new note
    const note = await Note.create({
        title:title,
        body:body,
    })

    //respond with new note
    res.json({note:note});
};

const updateNote = async(req,res)=>{
    const noteId = req.params.id;
    const title = req.body.title;
    const body = req.body.body;

     await Note.findByIdAndUpdate(noteId,{
        title:title,
        body:body,
    })

    const note = await Note.findById(noteId);
    res.json({note:note});
};

const deleteNote = async(req,res)=>{
    const noteId = req.params.id;
    await Note.findByIdAndDelete(noteId);
    res.json({message:"Note deleted"});
};

module.exports= {
    fetchNotes,
    fetchNotesById:fetchNotesById,
    createNote,
    updateNote:updateNote,
    deleteNote,
}