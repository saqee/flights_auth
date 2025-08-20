const validateUserAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: "Email and password are required",
      success: false,
    })
  }
  next()
}

const validateIsAdmin = (req, res, next) => {
  if (!req.body.userId) {
    res.status(400).json({
      message: "User ID is required",
      success: false,
    })
  }
  next()
}

module.exports = {
  validateUserAuth,
  validateIsAdmin,
}
