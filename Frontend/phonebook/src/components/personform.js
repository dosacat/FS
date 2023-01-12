import React from 'react'

function PersonForm({addNumber,newName,newNum,setNewName,setNewNum}) {
  return (
    <div>
        <form onSubmit={addNumber}>
          <div>
            name: <input value={newName} onChange={(event)=>setNewName(event.target.value)}/>
          </div>
          <div>number: <input value={newNum} onChange={(event)=>setNewNum(event.target.value)}/></div>
          <div>
            <button type="submit">add</button>
          </div>
      </form>
    </div>
  )
}

export default PersonForm;