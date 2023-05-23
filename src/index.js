const express = require('express')
const cors = require('cors')
const { connect } = require('./utils/connect')
const dotenv = require('dotenv')
dotenv.config()
const { configCloudinary } = require('./middlewares/files.middleware')
const AppointmentRoutes = require('./api/routes/appointment.routes')
const ConsultRoutes = require('./api/routes/consult.routes')
const PetRoutes = require('./api/routes/pet.routes')
const UserClientsRoutes = require('./api/routes/userClient.routes')
const StaffRoutes = require('./api/routes/staff.routes')
const AdminRoutes = require('./api/routes/admin.routes')

configCloudinary()

const PORT = process.env.PORT || 8081

const server = express()
connect()

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

server.use(cors())

server.use(express.json({ limit: '5mb' }))
server.use(express.urlencoded({ limit: '5mb', extended: false }))

server.use('/neovet/appointments', AppointmentRoutes)
server.use('/neovet/consults', ConsultRoutes)
server.use('/neovet/pets', PetRoutes)
server.use('/neovet/userclients', UserClientsRoutes)
server.use('/neovet/staff', StaffRoutes)
server.use('/neovet/admins', AdminRoutes)

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
