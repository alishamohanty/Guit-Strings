const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  console.log('Inside hashpassword method')
  const SALT_FACTOR = 8
  
  if(!user.changed('password')){
    console.log('Inside if of hashpassword')
    return;
  }
  console.log('before random')
  const random = bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
    console.log('random is', random)
    return random;
}
module.exports = (sequelize , DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: hashPassword
   }
  })
  User.prototype.comparePassword = function (password) {
    console.log('this.password', this.password, 'password', password)
    const isCompare = bcrypt.compareAsync(password, this.password)
    console.log('value of bcrypt.compareAsync(password, this.password)', isCompare)
    return isCompare
  }
  return User
}
