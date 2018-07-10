const {User} = require('../models')

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      res.status(400).send({
          error:'This email account already exsists!!'
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
    if(!user) {
      return res.status(403).send({
        error: 'The User is not registered!!'})
    } 
    const isPassword = password === user.password
    if (!isPassword) {
      return res.status(403).send({
      error: 'The Password entered is invalid'})
    }
    const userJson = user.toJSON()
    res.send({
      user: userJson
    })    
    } catch (error) {
      res.status(400).send({
      error:'Some issue with login'
    })
    }
  }
}