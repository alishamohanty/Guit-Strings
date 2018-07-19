const {Song} = require('../models')
module.exports = {
  async index (req, res) {
    try {
      let songs = ''
      const search = req.query.search
        if (search) {
          songs = await Song.findAll({
            where: {
              $or: [
                'title', 'artist', 'genre', 'album'
              ].map(key => ({
                [key]: {
                  $like: `%${search}%`
                }
              }))
            }
          })
        } else {
            songs = await Song.findAll({
            limit: 20
          })
        }
        res.send(songs)
    } catch (error) {
        res.status(500).send({
        error:'Some issue finding Songs and fetching it'
      })
    }
  },
  async post (req, res) {
    try {
        console.log('Before create method involked');        
        const song = await Song.create(req.body)
        console.log('After creating the entry and before sending song')
        res.send(song)
    } catch (error) {
      res.status(500).send({
      error:'Some issue creating Songs'
        })
    }
  },
  async show (req, res) {
    try {
      const song = await Song.findById(req.params.songId)
      res.send(song)
    } catch (error) {
      console.log('This is an error')
      res.status(500).send(error)
    }
  },
  async update (req, res){
    try {
      const song = await Song.update(req.body, {
        where: {
          id: req.params.songId
        }
      })
      console.log('Song Updated')
      res.send(song)
    } catch (error) {
      console.log('This is an error while updating the song')
      res.status(500).send(error)
    }
  }
}