const UserService = require("../services/user-service")
const userService = new UserService()
const create = async (req, res) => {
  try {
    const user = await userService.create({
      email: req.body.email,
      password: req.body.password,
    })
    res.status(201).json({
      message: "User created successfully",
      data: user,
      success: true,
    })
  } catch (error) {
    console.log(`Error in UserController create: ${error.message}`)
    res.status(500).send({ error: "Internal Server Error" })
  }
}

const getById = async (req, res) => {
  try {
    const user = await userService.getById(req.params.id)
    res.status(201).json({
      message: "User created successfully",
      data: user,
      success: true,
    })
  } catch (error) {
    console.log(`Error in UserController create: ${error.message}`)
    res.status(500).send({ error: "Internal Server Error" })
  }
}
const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(req.body.email, req.body.password)
    return res.status(200).json({
      message: "User signed in successfully",
      data: response,
      success: true,
    })
  } catch (error) {
    console.log(`Error in UserController signIn: ${error.message}`)
    res.status(500).send({ error: "Internal Server Error" })
  }
}

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"]
    const response = await userService.isAuthenticated(token)
    console.log(response)

    return res.status(200).json({
      message: "User is authenticated",
      data: response,
      success: true,
    })
  } catch (error) {
    console.log(`Error in UserController isAuthenticated: ${error.message}`)
    res.status(500).send({ error: "Internal Server Error" })
  }
}

const isAdmin = async (req, res) => {
  try {
    const response = await userService.isAdmin(req.body.userId)
    return res.status(200).json({
      message: "User admin status checked",
      data: response,
      success: true,
    })
  } catch (error) {
    console.log(`Error in UserController isAdmin: ${error.message}`)
    res.status(500).send({ error: "Internal Server Error" })
  }
}
module.exports = {
  create,
  getById,
  signIn,
  isAuthenticated,
  isAdmin,
}
