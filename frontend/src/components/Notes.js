import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNote, editNote } = context;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6;

  // Pagination Logic
  const totalPages = Math.ceil(notes.length / notesPerPage);
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  useEffect(() => {
    getNote();
  }, []);

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    // toast.success("Note updated successfully!");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <AddNote toast={toast} />
      {/* Modal for editing notes */}
      <Button variant="primary d-none" onClick={handleShow} ref={ref}>
        Launch static backdrop modal
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="etitle">Title</label>
              <input
                type="text"
                className="form-control"
                id="etitle"
                name="etitle"
                value={note.etitle}
                onChange={onChange}
                minLength={5}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="edescription">Description</label>
              <input
                type="text"
                className="form-control"
                id="edescription"
                name="edescription"
                value={note.edescription}
                onChange={onChange}
                minLength={5}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="etag">Tag</label>
              <input
                type="text"
                className="form-control"
                id="etag"
                name="etag"
                value={note.etag}
                onChange={onChange}
                minLength={5}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button ref={refClose} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleClick}
            disabled={note.etitle.length < 5 || note.edescription.length < 5}
          >
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Notes Display */}
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {Array.isArray(currentNotes) && currentNotes.length === 0 && "No notes to display"}
        </div>
        {currentNotes.map((note) => (
          <NoteItem
            key={note._id}
            note={note}
            updateNote={updateNote}
            toast={toast}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <nav
        aria-label="Page navigation example"
        className="pagination-controls d-flex justify-content-center"
      >
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Notes;
