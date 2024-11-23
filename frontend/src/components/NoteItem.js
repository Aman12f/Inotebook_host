import React from "react";
import NoteContext from "../context/notes/NoteContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote, togglePin } = context; // Include togglePin function
  const { note, updateNote } = props;

  return (
    <>
      <div className="col-md-4">
        <div className="card my-3 shadow" style={{background:"rgb(252 252 252)"}}>
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="card-title">{note.title}</h5>
              <div className="ms-auto">
                {/* Pin/Unpin Icon */}
                <i
                  className={`fa-solid ${
                    note.pinned ? "fa-thumbtack" : "fa-thumbtack-slash"
                  } mx-2`}
                  onClick={() => {
                    togglePin(note._id); // Call togglePin function
                    // toast.info(note.pinned ? "Note unpinned" : "Note pinned");
                  }}
                  style={{
                    cursor: "pointer",
                    color: note.pinned ? "gold" : "gray",
                  }}
                  title={note.pinned ? "Unpin Note" : "Pin Note"}
                ></i>

                {/* Edit Note Icon */}
                <i
                  className="fa-regular fa-pen-to-square mx-2"
                  onClick={() => {
                    updateNote(note);
                    toast.info("Editing note...");
                  }}
                  style={{ cursor: "pointer" }}
                ></i>

                {/* Delete Note Icon */}
                <i
                  className="fa-regular fa-trash-can mx-2"
                  onClick={() => {
                    deleteNote(note._id);
                  }}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
            </div>
            <p className="card-text">{note.description}</p>
            <p className="card-text">{note.tag}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;

