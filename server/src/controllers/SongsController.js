const {Song} = require('../models')
module.exports = {
  async index (req, res) {
    try {
        const songs = await Song.findAll({
          limit: 20
        })
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
      console.log('This is song', song)
      res.send(song)
    } catch (error) {
      console.log('This is an error')
      res.status(500).send(error)
    }
  }
}