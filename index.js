var phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Pooppoo", 
      "number": "39-23-6423122"
    }
]

const express = require('express');
const app = express();
var morgan = require('morgan')

const cors = require('cors')
app.use(cors())



//Middleware
app.use(express.json())
app.use(morgan("tiny"))


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get("/api/persons",(req,res)=>{
  res.json(phonebook)
})

app.get("/info",(req,res)=>{
  const total=phonebook.length
  const time = Date()
  res.json(`This phonebook has info of ${total} people ${time}`)
})


app.get("/api/persons/:id",(req,res)=>{
  var pid = req.params.id
  const entry = phonebook.find(elem=>elem.id == pid)
  if (entry) {
    res.json(entry)
  } 
  else{
    res.status(404).end()  
  }
  
})


app.delete("/api/persons/:id",(req,res)=>{
  const id = Number(req.params.id)
  phonebook= phonebook.filter(elem=>elem.id!==id)
  res.status(204).end()
  
})

app.put("/api/persons/:id",(req,res)=>{
  const id = Number(req.params.id)
  phonebook= phonebook.map(elem=>{
    if(elem.id===id){
      return {...elem, number:req.body.number}
    }
    else{
      return {...elem}
    }
  })

  res.status(204).end()
  
})

morgan.token('namee', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':namee'))


app.post("/api/persons",(req,res)=>{
  var note = req.body
  if(phonebook.find(contact=>contact.name===note.name)){
    res.json("error:name must be unique")
  }
  else{
    phonebook = phonebook.concat(note)
    res.status(200).end()    
  }
  
})


const port = 3001
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})

