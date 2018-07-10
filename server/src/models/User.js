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
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
      beforeSave: hashPassword
   }
  })
  User.prototype.comparePassword = (password) => {
    return bcrypt.compareAsync(password, this.password)
  }
  return User
}
