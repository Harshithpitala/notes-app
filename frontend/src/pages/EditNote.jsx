import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

const EditNote = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    getNote();
  }, []);

  const getNote = async () => {
    try {
      const res = await API.get("/notes");

      const note = res.data.find((item) => item._id === id);

      if (note) {
        setFormData({
          title: note.title,
          content: note.content,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateNote = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/notes/${id}`, formData);

      navigate("/home");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={updateNote}>
        <h2>Edit Note</h2>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
        />

        <button>Update Note</button>
      </form>
    </div>
  );
};

export default EditNote;