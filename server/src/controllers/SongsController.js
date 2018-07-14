const {Songs} = require('../models')
module.exports = {
  async index (req, res) {
    try {
        const songs = await Song.findAll({
          limit: 10
        })
        res.send(songs)
    } catch (error) {
        res.status(400).send({
        error:'Some issue finding Songs and fetching it'
      })
    }
  },
  async post (req, res) {
    try {
        const song = await Song.create(req.body)
        res.send(song)
    } catch (error) {
      res.status(400).send({
      error:'Some issue creating Songs'
        })
    }
  }
}