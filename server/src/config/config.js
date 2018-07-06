module.exports = {
    port: process.env.PORT || 8081, 
    db: {
      database: process.env.DB_NAME || 'tabtrack',
      user: process.env.DB_USER || 'tabtrack',
      password: process.env.DB_PASS || 'tabtrack',
      options: {
        dialect: process.env.DIALECT || 'sqlite',
        host: process.env.HOST || 'localhost',
        storage: './tabtrack.sqlite'
      }
    } 
}
