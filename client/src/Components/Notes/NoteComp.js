import React, { useState } from "react";
import axios from "axios";

function NoteComp(props) {
  const [noteValue, setNoteValue] = useState(props.note.data);

  function handleChange(info) {
    let words = info.target.value;
    if (words.match(/^ *$/)) {
      words = "";
    }

    setNoteValue(info.target.value);
    const data = {
      data: words,
      _id: props.note._id,
    };

    axios.put(`/api/notes/update`, data).catch((err) => console.log(err));
  }

  return (
    <div style={{ position: "relative" }}>
      <textarea
        className={"notesInput"}
        type={"text"}
        value={noteValue}
        rows={10}
        onChange={handleChange}
        spellCheck={false}
      ></textarea>
      {/* <button onClick={deleteNote} className={"note_garbage"}> /////experimenting
        {" "}
        &#128465;
      </button> */}
    </div>
  );
}

export default NoteComp;
