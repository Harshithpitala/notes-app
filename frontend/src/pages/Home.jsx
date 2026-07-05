import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";

const Home = () => {
  const [notes, setNotes] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const getNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createNote = async (e) => {
    e.preventDefault();

    try {
      await API.post("/notes", formData);

      setFormData({
        title: "",
        content: "",
      });

      getNotes();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      getNotes();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <form className="form" onSubmit={createNote}>
          <h2>Create Note</h2>

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            name="content"
            placeholder="Content"
            value={formData.content}
            onChange={handleChange}
          />

          <button>Create Note</button>
        </form>

        <div className="notes">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              deleteNote={deleteNote}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;