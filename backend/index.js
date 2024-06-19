const cors = require('cors')
const express = require('express')
const app = express()
const PORT = 3000




// Enable CORS for all routes
app.use(cors())

let boards = [
    { id: 1, name: "board1", type: "Celebration"},
    { id: 2, name: "board2", type: "Celebration"}
]

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/boards', (req, res) => {
    res.json(boards)
})

app.get('/boards/:boardId', (req, res) => {
    const boardId = parseInt(req.params.boardId)
    const board = boards.find(board => board.id === boardId)
    
    if (board) {
      res.json(board)
    } else {
      res.status(404).send('Board not found')
    }
})

app.post('/boards', (req, res) => {
    const { name, type } = req.body
  
    const newEvent = {
      id: boards.length + 1,
      name,
      type
    }
  
    boards.push(newEvent)
    res.status(201).json(newEvent)
})

app.put('/boards/:boardId', (req, res) => {
    const { boardId } = req.params
    const boardIndex = boards.findIndex(board => board.id === parseInt(boardId))
  
    if (boardIndex !== -1) {
      const updatedBoardInfo = req.body
      boards[boardIndex] = { ...boards[boardIndex], ...updatedBoardInfo }
      res.json(boards[boardIndex])
    } else {
      res.status(404).send('Board not found')
    }
})

app.delete('/boards/:boardId', (req, res) => {
    const { boardId } = req.params
    const initialLength = boards.length
    boards = boards.filter(board => board.id !== parseInt(boardId))
  
    if (boards.length < initialLength) {
      res.status(204).send()
    } else {
      res.status(404).send('board not found')
    }
})


app.get('/', (req, res) => {
    res.send('Welcome to my app!')
})