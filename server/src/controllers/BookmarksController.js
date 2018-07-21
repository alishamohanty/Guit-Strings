const { Bookmark,
  Song,
  User} = require('../models')
  const _ = require('lodash')  
module.exports = {
  async index (req, res) {
    try {
      console.log('Inside the index method', req.query)
      const SongId = req.query.SongId
      const UserId = req.user.id
      const where = {
        UserId: UserId
      }
      if (SongId) {
        where.SongId = SongId
      }
      const bookmarks = await Bookmark.findAll({
          where: where,
          include: [
            {
              model: Song
            }
          ]
      })
      .map( bookmark => bookmark.toJSON())
      .map( bookmark => _.extend({}, bookmark.Song, bookmark
       ))
      console.log('Bookmarks found??', bookmarks)
      res.send(bookmarks)
    } catch (error) {
        res.status(500).send({
        error:'Some issue finding Songs and fetching it'
      })
    }
  },
  async post (req, res) {
    try {      
      console.log('Inside post method')
      const UserId = req.user.id
      const {SongId} = req.body
      console.log(req.body,UserId,SongId)
      const bookmark = await Bookmark.findOne({
        where: {
            SongId: SongId,
            UserId: UserId
        }
      })
      console.log('bookmark is', !!(bookmark), bookmark)
      if (bookmark) {
        return res.status(400).send({
          error: 'You already have this set as a bookmark'
        })
      }
      console.log('req.body is', bookmark)
      const newBookmark = await Bookmark.create({
        SongId: SongId,
        UserId: UserId        
      })
      console.log('bookmark created', created)
      res.send(newBookmark)
    } catch (error) {
      console.log('An error occured while creating the Bookmark',error)
    }
  },
  async delete (req, res) {
    try {
      const bookmarkId = req.params.bookmarkId
      const UserId = req.user.id
      console.log('bookmarkId is', bookmarkId)
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId,
          UserId: UserId 
        }
      })
      if (!bookmark) {
        return res.status(403).send({
          error: 'You do not have access to this Bookmark'
        })
      }
      await bookmark.destroy()
      res.send(bookmark)
    } catch (error) {
      console.log('An error occured while deleting the Bookmark',error)
    }
  },
  async findAll (req, res) {
    try {
      const allbookmarks = await Bookmark.findAll()
      res.send(allbookmarks)
    } catch (error) {
      res.status(500).send({
        error: 'Error while sending fetching all bookmarks'
      })
    }
  }
}