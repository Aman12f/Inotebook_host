
import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import { toast } from "react-toastify";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote, getNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = async (e) => {
    e.preventDefault();

    if (note.title.length < 5 || note.description.length < 5) {
      toast.error("Title and description must be at least 5 characters long!");
      return;
    }

    try {
      await addNote(note.title, note.description, note.tag);
      setNote({ title: "", description: "", tag: "" });
      await getNote();
      // toast.success("Note added successfully!");
    } catch (error) {
      // toast.error("Failed to add note!");
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <div className="my-3">
        <form>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="title" className="form-label text-dark fw-bold">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Enter title"
                onChange={onChange}
                minLength={5}
                required
                value={note.title}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="tag" className="form-label text-dark fw-bold">Tag</label>
              <input
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                placeholder="Tag"
                onChange={onChange}
                minLength={5}
                required
                value={note.tag}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label text-dark fw-bold">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              placeholder="Description"
              onChange={onChange}
              minLength={5}
              required
              value={note.description}
            ></textarea>
          </div>
          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;

