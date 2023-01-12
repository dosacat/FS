import React from 'react'

function Persons({persons,searchy,deleteContact}) {
  return (
    <div>
        <ul>
        {persons.map(person => {
        if((person.name.toLowerCase()).search(searchy)!==-1){
        return <li key={person.id}>{person.name} {person.number} <button onClick={(event)=>deleteContact(event,person.id)}>delete</button> </li>
        }
        else{
          return null
        }})}
      </ul>
    </div>
  )
}

export default Persons;