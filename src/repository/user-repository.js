const { User } = require("../models/index")

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data)
      return user
    } catch (error) {
      console.log(`Error creating user: ${error.message}`)
    }
  }
  async destroy(userId) {
    try {
      const user = await User.destroy({
        where: {
          id: userId,
        },
      })
      return true
    } catch (error) {
      console.log(`Error deleteing user: ${error.message}`)
    }
  }

  async getById(id) {
    try {
      const user = await User.findByPk(id, {
        attributes: ["id", "email"],
      })
      return user
    } catch (error) {
      console.log(`Error fetching user by ID: ${error.message}`)
      throw new Error("User not found")
    }
  }
  async getByEmail(email) {
    try {
      const user = await User.findOne({
        where: { email },
      })
      return user
    } catch (error) {
      console.log(`Error fetching user by ID: ${error.message}`)
      throw new Error("User not found")
    }
  }
}

module.exports = UserRepository
