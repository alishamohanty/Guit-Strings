const path = require('path')
module.exports = {
    port: process.env.PORT || 8082, 
    db: {
      database: process.env.DB_NAME || 'tabtrack',
      user: process.env.DB_USER || 'tabtrack',
      password: process.env.DB_PASS || 'tabtrack',
      options: {
        dialect: process.env.DIALECT || 'sqlite',
        host: process.env.HOST || 'localhost',
        storage: path.resolve(__dirname, '../../tabtracker.sqlite')
      }
    },
    authentication:{
       jwtSecret : process.env.JWT_SECRET || 'secret' 
    }
}
