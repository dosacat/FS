import './App.css';
import { useState, useEffect } from 'react';
import Filter from './components/filter';
import PersonForm from './components/personform';
import Persons from './components/persons';
import service from "./services/phonebook.js"



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchy, viewSearch] = useState('')


  function addNumber(event){
    event.preventDefault()

    if(!newNum){
      alert("Number field must be filled!")
    }

    const exists = persons.find(person=>person.name===newName)
    
    if(exists){
      if(window.confirm(`${newName} is already added to phonebook,replace the old with a new one?`)){
        service
          .edit(exists.id,{number:newNum})
      }
    }

    else if (newName){
      var idNo = persons.length+1
      service
        .create({id:idNo,name:newName, number:newNum})
      }
      setNewName('')
      setNewNum('')
    
    
  }

  function deleteContact(event,selected){
    event.preventDefault(0)
    if(window.confirm("Are you sure you would like to delete this contact?")){
      console.log("You tried to delete!", selected)
      service.deleteId(selected)
    }
    
  }

  useEffect(() => {
    service.getAll()      
    .then(response => {setPersons(response)})
  }, [])




  return (
    <div>
      <h2>Phonebook</h2>
      Search numbers: <Filter searchy={searchy} viewSearch={viewSearch}/>
      
      <PersonForm addNumber={addNumber} newName={newName} newNum={newNum} setNewName={setNewName} setNewNum={setNewNum} />
      
      <h2>Numbers</h2>
      <Persons persons={persons} searchy={searchy} deleteContact={deleteContact}/>
    </div>
  )
}

export default App;
