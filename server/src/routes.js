const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policy/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
const HistoriesController = require('./controllers/HistoriesController')
const isAuthenticated = require('./policy/isAuthenticated')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register, AuthenticationController.register)
  app.post('/login', AuthenticationController.login)
  app.get('/songs', SongsController.index)
  app.post('/songs', SongsController.post)
  app.get('/songs/:songId', SongsController.show)
  app.put('/song/:songId', SongsController.update)
  app.get('/bookmarks', 
    isAuthenticated,
    BookmarksController.index)
  app.post('/bookmarks',
    isAuthenticated,
    BookmarksController.post)
  app.get('/bookmarks/:bookmarkId',
    isAuthenticated,
    BookmarksController.delete)
  app.get('/books', BookmarksController.findAll)
  app.get('/histories', isAuthenticated, HistoriesController.index)
  app.post('/histories', isAuthenticated, HistoriesController.post)
  
}
