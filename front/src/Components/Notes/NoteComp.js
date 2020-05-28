import React, { useState, useEffect } from "react";
import axios from "axios";

function NoteComp(props) {
  const [noteValue, setNoteValue] = useState(props.note.data);

  function handleChange(info) {
    setNoteValue(info.target.value);
    const data = {
      data: info.target.value,
      _id: props.note._id,
    };

    axios
      .put(`http://localhost:5000/notes/update`, data)
      .then((res) => {
        console.log(console.log(res));
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={"noteComp"}>
      <textarea
        className={"notesInput"}
        type={"text"}
        value={noteValue}
        rows={10}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}

export default NoteComp;
