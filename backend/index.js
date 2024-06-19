const cors = require('cors')
const express = require('express')
const app = express()
const PORT = 3000

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// Enable CORS for all routes
app.use(cors())

// let boards = [
//     { id: 1, name: "board1", type: "Celebration"},
//     { id: 2, name: "board2", type: "Celebration"}
// ]

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/boards', async (req, res) => {
  const boards = await prisma.board.findMany()
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



app.post('/boards', async (req, res) => {
  const { name, type, date } = req.body
  const newboard = await prisma.board.create({
    data: {
      name,
      type,
      date
    }
  })
  res.json(newboard)
})

app.put('/boards/:id', async (req, res) => {
  const { id } = req.params
  const { name, type, date } = req.body
  const updatedboard = await prisma.board.update({
    where: { id: parseInt(id) },
    data: {
      name,
      type,
      date
    }
  })
  res.json(updatedboard)
})

app.delete('/boards/:id', async (req, res) => {
  const { id } = req.params
  const deletedboard = await prisma.board.delete({
    where: { id: parseInt(id) }
  })
  res.json(deletedboard)
})




app.get('/', (req, res) => {
    res.send('Welcome to my app!')
})