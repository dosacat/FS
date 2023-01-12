import React from 'react'

function Filter({searchy,viewSearch}) {
  return (
    <div><input value={searchy} onChange={(event)=>viewSearch(event.target.value)}/></div>
  )
}

export default Filter;