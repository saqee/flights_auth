const express = require("express")
const router = express.Router()

const userRoutes = require("./v1/index")
router.use("/v1", userRoutes)

module.exports = router
