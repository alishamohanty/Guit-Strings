const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return  jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      console.log('After creating the entry in database');      
      res.send(user.toJSON())
    } catch (err) {
      res.status(400).send({
          error:'Error Occured while creating an account!!'
      })
    }   
  },
  async login(req, res){
    try {
      console.log('Inside login method')
      const {email, password} = req.body;
      const user = await User.findOne({
        where:{
        email: email
      }
    })
    console.log('After find method!')
    console.log('user ',user)
    if(!user) {
      return res.status(403).send({
        error: 'The User is not registered!!'})
    }
    const isPassword =  await user.comparePassword(password)
    console.log('Checking for isPassword ', password, isPassword)
    if (!isPassword) {
      return res.status(403).send({
      error: 'The Password entered is invalid'})
    }
    const userJson = user.toJSON()
    res.send({
      user: userJson,
      token: jwtSignUser(userJson)
    })    
    } catch (error) {
      res.status(400).send({
      error:'Some issue with login'
    })
    }
  }
}
