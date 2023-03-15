const UserClient = require('../api/models/userClient.model')
const { verifyToken } = require('../utils/token')

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) {
    return next(new Error('Unauthorized'))
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET)
    req.userClient = await UserClient.findById(decoded.id)
    next()
  } catch (error) {
    return next(error)
  }
}

module.exports = { isAuth }
