import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  //state
  const [notes, setNotes] = useState(null);
  const [CreateForm, SetCreateForm] = useState({
    title: "",
    body:"",
  });
  const [UpdateFormNew ,setUpdateFormNew] = useState({
    _id:null,
    title:"",
    body:"",
  });

  //useeffect
  useEffect(() => {
    fetchNotes();
  }, []);

  //functions
  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:3001/note");
    setNotes(res.data.notes);
    // console.log(res);
  }
  const UpdateForm = (e) =>{
    const {name,value} =e.target;
    SetCreateForm({
      ...CreateForm,
      [name]:value,
    });
    console.log({name,value});
  }
  const handleUpdateForm = (e) =>{
    const {name,value} =e.target;
    setUpdateFormNew({
      ...UpdateFormNew,
      [name]:value,
    });
    console.log({name,value});
  }
  const CreateNote = async(e) =>{
    e.preventDefault();
    const res = await axios.post("http://localhost:3001/note",CreateForm);
    setNotes([...notes,res.data.note]);
    SetCreateForm({title:"",body:""});
    // console.log(res);
  }
  const DeleteNote = async(_id) =>{
    const res = await axios.delete(`http://localhost:3001/note/${_id}`); 
    console.log(res);  
    // setNotes(notes.filter(note => note._id !== _id));
    const newNotes = [...notes].filter((note)=>{
      return note._id !== _id;
    });
    setNotes(newNotes);
  }
  const ToggleUpdate = (note)=>{
    setUpdateFormNew({title:note.title,body:note.body,_id:note._id})
  }
  const updateNote = async(e)=>{
    e.preventDefault();
    const {title,body} = UpdateFormNew
    const res = await axios.put(`http://localhost:3001/note/${UpdateFormNew._id}`, {title,body})
    // console.log(res);
    const newNotes = [...notes];
    const noteIndex = notes.findIndex((note)=>{
      return note._id == UpdateFormNew._id;
    });

    newNotes[noteIndex].title = title;
    newNotes[noteIndex].body = body;
    setNotes(newNotes);

    setUpdateFormNew({
      _id:null,
    title:"",
    body:"",
    });
  }

  return (
    <div className="App">
      <div> 
        <h2>Notes</h2>
        {notes && notes.map((note) => {
          return (<div key={note._id}>
            <h3>{note.title}</h3>
            <h4>{note.body}</h4>
            <button onClick={() => DeleteNote(note._id)}>delete Note</button>
            <button onClick={() => ToggleUpdate(note)}>update</button>
          </div>
          );
        })}
      </div>
      {UpdateFormNew._id && (
        <div>
        <h2>Update Note</h2>
        <form onSubmit={updateNote}>
          <input onChange={handleUpdateForm} value = {UpdateFormNew.title} name = "title"></input>
          <textarea onChange={handleUpdateForm} value = {UpdateFormNew.body}   name = "body"></textarea>
          <button type="submit">update</button>
        </form>
      </div>)}
      {!UpdateFormNew._id && (
        <div>
        <h3>Create Note</h3>
        <form onSubmit={CreateNote}>
          <input onChange = {UpdateForm} value = {CreateForm.title} name="title" ></input>
          <textarea onChange = {UpdateForm} value = {CreateForm.body} name = "body"></textarea>
          <button type="submit">Create</button>
        </form>
      </div>)}
    </div>
  );
}

export default App;
