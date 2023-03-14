const express = require('express')
const cors = require('cors')
const { connect } = require('./utils/connect')
const dotenv = require('dotenv')
dotenv.config()
const AppointmentRoutes = require('./api/routes/appointment.routes')
const ConsultRoutes = require('./api/routes/consult.routes')

const PORT = process.env.PORT || 8081

const server = express()
connect()

server.use(
  cors({
    origin: [`http://localhost:${PORT}`],
    credentials: true,
  })
)

server.use(express.json({ limit: '5mb' }))
server.use(express.urlencoded({ limit: '5mb', extended: true }))

server.use('/neovet/appointments', AppointmentRoutes)
server.use('/neovet/consults', ConsultRoutes)

server.use('*', (req, res, next) => {
  const error = new Error('Route not found')
  error.status = 404
  return next(error)
})

server.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || 'Unexpected error')
})

server.disable('x-powered-by')

server.listen(PORT, () => {
  console.log(`Server listening on port 🙈: http://localhost:${PORT}`)
})
