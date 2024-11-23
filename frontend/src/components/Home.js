import React from 'react'
// import { useContext } from 'react'
import Notes from './Notes'
// import NoteContext from '../context/notes/NoteContext'
// import AddNote from './AddNote'
// -----------------------------------------------------------------------------------------------------------------------------------------------------------
const Home = (props) => {
    // const context = useContext(NoteContext)
    // const {notes,setNotes} = context
    const {showAlert} = props
  return (
    <div>
      <Notes showAlert={showAlert}></Notes>
    </div>
  )
}

export default Home
