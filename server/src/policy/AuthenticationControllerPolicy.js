const joi = require('joi')
module.exports = {
    register(req, res, next) {
      console.log('Inside AuthPlicy register method')
      const schema = {
        email: joi.string().email(),
        password: joi.string().regex(
          new RegExp ('^[a-zA-Z0-9]{8,32}$')
        )
      }
      const {error, value} = joi.validate(req.body ,schema)
      console.log('After validating by joi')
      if (error) {
        switch(error.details[0].context.key){
          case 'email':
            console.log('Inside authpolicy email error')
            res.status(400).send({
                error:'You must provide an valid email'
            })
            break;
          case'password':
            console.log('Inside authpolicy password error')
            res.status(400).send({
              error: `The password provided failed to match the following rules:
              <br>
              1.It must contain the following charachters: Lowercase, uppercase and numberics
              <br>
              2.Ti should have a length of 8 charachters to maximun of 32 charachters`
            })
            break;
          default: 
            res.status(400).send({
              error: 'Invalid registration details'
            })
        }
          
      } else {
          console.log('Inside authpolicy default else')
          next()
      } 
    }
}