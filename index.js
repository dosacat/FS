const phonebook = [
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
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get("/api/persons",(req,res)=>{
  res.json(phonebook)
})

app.post("/api/persons",(req,res)=>{
  res.status(200).end()
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
  phonesbook= phonebook.filter(elem=>elem.id===id)
  response.status(204).end()
  
})


const port = 3001
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})

