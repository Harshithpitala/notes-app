import { Link } from "react-router-dom";

const NoteCard = ({ note, deleteNote }) => {
  return (
    <div className="card">

      <h2>{note.title}</h2>

      <p>{note.content}</p>

      <div className="buttons">

        <Link to={`/edit/${note._id}`}>
          <button>Edit</button>
        </Link>

        <button
          onClick={() => deleteNote(note._id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default NoteCard;