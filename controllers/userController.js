const { People } = require('../models/models');
const ApiError = require('../error/apiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email, role) => {
  return jwt.sign(
      {id, email},
      process.env.SECRET_KEY,
      {expiresIn: '24h'}
  )
}
class UserController {

  async registration(req, res, next) {
    const {email, password} = req.body;
  
    if(!password || !email) {
      return next(ApiError.badRequest('Incorrect name or email'))
    };

    const existingUser = await People.findOne({where: {email}})
    if (existingUser) {
        return next(ApiError.badRequest(`User with this email ${email} already exists`))
    };

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await People.create({email, password: hashPassword});
    const jwtToken = generateJwt(user.id, email);
    res.json({jwtToken});
  };

  async login(req, res, next) {
    const {email,password} = req.body;
    const userRegistered= await People.findOne({where:{email}});

    if(!userRegistered) {
      return next(ApiError.internal('No user found with this email'));
    }

    const comparePassword = bcrypt.compareSync(password, userRegistered.password);

    if(!comparePassword) {
      return next(ApiError.internal( 'Wrong password specified'))
    }

    const token = generateJwt(userRegistered.email, userRegistered.password);
    return res.json({token});  
  }

  async getAll(req, res) {
    const users = await People.findAll();
    return res.json(users);
  }

  async check(req, res) {
    res.json({message: 'All right'})
  }
}

module.exports = new UserController();
