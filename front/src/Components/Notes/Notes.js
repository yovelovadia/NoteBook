import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import NoteComp from "./NoteComp";
import axios from "axios";
import { useSelector } from "react-redux";

function Notes() {
  const userId = useSelector((state) => state.Logged.whoLogged);
  const [notes, setNotes] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    async function getNotes() {
      const data = await axios.get("http://localhost:5000/notes/get-notes", {
        params: { userId },
      });
      setNotes(data.data);
    }
    getNotes();
  }, [userId, refresh]);

  useEffect(() => {
    async function getNotes() {
      if (!userId) {
        const data = await axios.get("http://localhost:5000/notes/get-notes", {
          params: { userId: "globalID" },
        });
        setNotes(data.data);
      }
    }

    getNotes();
  }, [userId, refresh]);

  async function newNote() {
    const data = {
      userId,
      token: `bearer ${localStorage.getItem("jwtAuthToken")}`,
    };

    await axios
      .delete("http://localhost:5000/notes/delete-notes")
      .catch((err) => console.log(err));

    axios
      .post("http://localhost:5000/notes/add-note", { params: data })
      .then((res) => setRefresh(refresh + 1));
  }
  return (
    <div className={"background_images notes"}>
      <Navbar
        nav_color={"#ff9999"}
        font_color={"black"}
        burger_color={"aliceblue"}
      />
      <div className={"notes_container"}>
        {notes
          ? notes.map((note) => <NoteComp note={note} key={note._id} />)
          : null}
      </div>
      <button onClick={newNote} className={"note_add_button"}>
        +
      </button>
      <div style={{ bottom: "0" }} className={"logo"}>
        <a href={"/home"}>NoteBook</a>
      </div>
      {!userId ? (
        <h1>
          <a className={"loginError"} href={"/log-in"}>
            Must login for creating notes
          </a>
        </h1>
      ) : null}
    </div>
  );
}
export default Notes;
