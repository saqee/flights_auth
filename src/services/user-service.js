const UserRepository = require("../repository/user-repository")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { JWT_SECRET } = require("../config/serverConfig")
class UserService {
  constructor() {
    this.userRepository = new UserRepository()
  }
  async create(data) {
    try {
      const user = await this.userRepository.create(data)
      return user
    } catch (error) {
      console.log(`Error in UserService create: ${error.message}`)
    }
  }

  async destroy(userId) {
    try {
      const user = await this.userRepository.destroy(userId)
      return user
    } catch (error) {
      console.log(`Error in UserService create: ${error.message}`)
    }
  }

  async getById(userId) {
    try {
      const user = await this.userRepository.getById(userId)
      return user
    } catch (error) {
      console.log(`Error in UserService create: ${error.message}`)
    }
  }

  createToken(user) {
    try {
      const token = jwt.sign(user, JWT_SECRET, {
        expiresIn: "10d", // Token expiration time
      })
      return token
    } catch (error) {
      console.log(`Error in UserService createToken: ${error.message}`)
    }
  }
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      return decoded
    } catch (error) {
      console.log(`Error in UserService verifyToken: ${error.message}`)
      throw new Error("Invalid token")
    }
  }
  isAuthenticated(token) {
    const isTokenVerified = this.verifyToken(token)
    if (!isTokenVerified) {
      throw new Error("Unauthorized")
    }
    const user = this.userRepository.getById(isTokenVerified.id)
    if (!user) {
      throw new Error("User not found")
    }
    return user
  }
  checkPassword(userInputPassword, encryptedPassword) {
    try {
      const isMatch = bcrypt.compareSync(userInputPassword, encryptedPassword)
      return isMatch
    } catch (error) {
      console.log(`Error in UserService checkPassword: ${error.message}`)
      throw new Error("Password check failed")
    }
  }
  async signIn(email, password) {
    try {
      const isUser = await this.userRepository.getByEmail(email)
      if (!isUser) {
        throw new Error("User not found")
      }
      const isPasswordValid = this.checkPassword(password, isUser.password)
      if (!isPasswordValid) {
        throw new Error("Invalid password")
      }
      const token = this.createToken({ email: isUser.email, id: isUser.id })
      return token
    } catch (error) {
      console.log(`Error in UserService signIn: ${error.message}`)
      throw new Error("Sign-in failed")
    }
  }

  isAdmin(userId) {
    try {
      return this.userRepository.isAdmin(userId)
    } catch (error) {
      console.log(`Error in UserService isAdmin: ${error.message}`)
      throw new Error("Admin check failed")
    }
  }
}

module.exports = UserService
