const { People } = require('../models/models');

class UserController {
  async createUser(req, res) {
    const {name, email} = req.body;
    const user = await People.create({name, email});
    return res.json(user);
  }

  async getAll(req, res) {
    const users = await People.findAll();
    return res.json(users);
  }
}

module.exports = new UserController();
