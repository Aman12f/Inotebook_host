import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";
import { toast } from "react-toastify";

const NoteState = (props) => {
  // const host = "http://localhost:5000";
  const host = "https://inotebook-host-backend.vercel.app/";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // GET ALL NOTES
  const getNote = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setNotes(Array.isArray(json) ? json : []);
    } catch (error) {
      toast.error("Failed to fetch notes!");
      console.error(error);
    }
  };

  // TOGGLE PIN
  const togglePin = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/pin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { note: updatedNote } = await response.json();
      setNotes((prevNotes) => {
        const newNotes = prevNotes.map((note) =>
          note._id === updatedNote._id ? updatedNote : note
        );
        return newNotes.sort((a, b) => b.pinned - a.pinned);
      });

      // toast.success(updatedNote.pinned ? "Note pinned!" : "Note unpinned!");
      toast.info(updatedNote.pinned ? "Note unpinned" : "Note pinned");
    } catch (error) {
      toast.error("Failed to toggle pin status!");
      console.error(error);
    }
  };

  // ADD A NOTE
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();
      setNotes((prevnotes) => [...prevnotes, json]);
      toast.success("Note added successfully!");
    } catch (error) {
      toast.error("Failed to add note!");
      console.error(error);
    }
  };

  // DELETE A NOTE
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);

      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
      toast.success("Note deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete note!");
      console.error(error);
    }
  };

  // EDIT A NOTE
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();
      let newNotes = JSON.parse(JSON.stringify(notes));

      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }

      setNotes(newNotes);
      toast.success("Note updated successfully!");
    } catch (error) {
      toast.error("Failed to update note!");
      console.error(error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote, togglePin }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
