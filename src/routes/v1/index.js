const express = require("express")
const { create, getById, signIn } = require("../../controllers/user-controller")
const router = express.Router()
router.post("/signup", create)
router.post("/user/:id", getById)
router.post("/signin", signIn)

module.exports = router
