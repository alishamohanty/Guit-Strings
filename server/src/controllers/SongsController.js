const {Song} = require('../models')
module.exports = {
  async index (req, res) {
    try {
        const songs = await Song.findAll({
          limit: 10
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
  }
}