const express = require("express")
const {
  create,
  getById,
  signIn,
  isAuthenticated,
  isAdmin,
} = require("../../controllers/user-controller")
const { AuthRequestValidator } = require("../../middlewares")
const router = express.Router()
router.post("/signup", AuthRequestValidator.validateUserAuth, create)
router.post("/user/:id", getById)
router.post("/signin", AuthRequestValidator.validateUserAuth, signIn)

router.get("/isAuthenticated", isAuthenticated)
router.post("/isAdmin", isAdmin)

module.exports = router
