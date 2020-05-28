import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import NoteComp from "./NoteComp";
import axios from "axios";
import { useSelector } from "react-redux";

function Notes() {
  const userId = useSelector((state) => state.Logged.whoLogged);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    async function getNotes() {
      const data = await axios.get("http://localhost:5000/notes/get-notes", {
        params: { userId },
      });
      if (!notes) {
        setNotes(data.data);
      }
    }
    getNotes();
  }, [userId, notes]);

  function newNote() {
    const data = {
      userId,
      token: `bearer ${localStorage.getItem("jwtAuthToken")}`,
    };
    axios
      .post("http://localhost:5000/notes/add-note", { params: data })
      .then((res) => setNotes(notes));
  }
  return (
    <div className={"background_images notes"}>
      <Navbar nav_color={"#2b2b2b"} font_color={"aliceblue"} />
      <div className={"notes_container"}>
        {notes
          ? notes.map((note) => <NoteComp note={note} key={note._id} />)
          : null}
      </div>
      <button onClick={newNote} className={"note_add_button"}>
        +
      </button>
    </div>
  );
}
export default Notes;
