const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

app.get('/boards', async (req, res) => {
    const boards = await prisma.board.findMany()
    res.json(boards)
})

app.post('/boards', async (req, res) => {
    const { title, type } = req.body
    const newboard = await prisma.board.create({
      data: {
        title,
        type
      }
    })
    res.json(newboard)
})

app.put('/boards/:id', async (req, res) => {
    const { id } = req.params
    const { title, type } = req.body
    const updatedboard = await prisma.board.update({
      where: { id: parseInt(id) },
      data: {
        title,
        type
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