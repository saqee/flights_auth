const express = require("express")
const { PORT } = require("./config/serverConfig")
const userRoutes = require("./routes/index")
const db = require("./models/index")
//const { User, Role } = require("./models/index")
const app = express()

const prepareAndStartServer = async () => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use("/api", userRoutes)
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`)
    db.sequelize.sync()
    /* const u1 = await User.findByPk(8)
    const r1 = await Role.findByPk(2)
    u1.addRole(r1) */
  })
}

prepareAndStartServer()
