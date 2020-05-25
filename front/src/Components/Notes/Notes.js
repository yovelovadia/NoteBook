import React from "react"
import Navbar from "../Navbar"
import NoteComp from "./NoteComp"

function Notes(){

const items = [1,2,3,4]


    return(    <div className={"background_images notes"}>
              <Navbar nav_color={"#2b2b2b"} font_color={"aliceblue"} />
              <div className={"notes_container"}>
              {items.map((note)=>
                  <NoteComp/>
              )}
              </div>


      
        </div>
        
    )

}
export default Notes