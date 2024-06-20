const cors = require('cors')
const express = require('express')
const app = express()
const PORT = 3000

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// Enable CORS for all routes
app.use(cors())


app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/boards', async (req, res) => {
  const boards = await prisma.board.findMany()
  res.json(boards)
})

app.get('/boards/:boardId', async (req, res) => {
    const id = parseInt(req.params.boardId)
    try{
        
        const boards = await prisma.board.findUnique({
          where: { id: parseInt(id)},
          include: {
            cards: true,
          },
        })
        res.json(boards.cards)
        } catch (error){

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

app.post('/boards/:boardId', async (req, res) => {
  const { message, author, gif, votes, board_id, title} = req.body
  const board_id_int = parseInt(board_id);
  const newCard = await prisma.cards.create({
    data: {
      message,
      author,
      gif,
      votes,
      board_id: board_id_int,
      title
    }
  })
  res.json(newCard)
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