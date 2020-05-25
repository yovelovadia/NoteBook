import React ,{useState}from "react"


function NoteComp(){
    const [noteValue,setNoteValue] = useState('blaa')

    function handleChange(info){
        setNoteValue(info.target.value)

    }
    

    return(<div className={"noteComp"}>
        <textarea className={"notesInput"}
        type={"text"}
        value={noteValue}
        rows={10}
        onChange={handleChange}></textarea>

        
    </div>)
}

export default NoteComp