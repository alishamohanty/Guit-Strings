const {Bookmark} = require('../models')
module.exports = {
  async index (req, res) {
    try {
      console.log('Inside the index method', req.query)
      const songId = req.query.songid
      const userId = req.query.userid
      const bookmark = await Bookmark.findOne({
          where: {
              songId: songId,
              userId: userId
          }
      })
      console.log('Bookmark found??', bookmark)
      res.send(bookmark)
    } catch (error) {s
        res.status(500).send({
        error:'Some issue finding Songs and fetching it'
      })
    }
  },
  async post (req, res) {
    try {
      const bookmark = req.body
      console.log('req.body is', bookmark)
      const created = await Bookmark.create(req.body)
      console.log('bookmark created', created)
      res.send(bookmark)
    } catch (error) {
      console.log('An error occured while creating the Bookmark',error)
    }
  },
  async delete (req, res) {
    try {
      const bookmarkId = req.params.bookmarkId
      console.log('bookmarkId is', bookmarkId)
      const bookmark = await Bookmark.findById(bookmarkId)
      await bookmark.destroy()
      res.send(bookmark)
    } catch (error) {
      console.log('An error occured while deleting the Bookmark',error)
    }
  }
}