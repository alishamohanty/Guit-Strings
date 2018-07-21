const { History,
  Song,
  User } = require('../models')
const _ = require('lodash')
module.exports = {
  async index(req, res) {
    try {
      console.log('Inside the index method of History', req.query)
      const UserId = req.query.UserId
      const where = {
        UserId: UserId
      }
      const histories = await History.findAll({
        where: where,
        include: [
          {
            model: Song
          }
        ]
      })
        .map(history => history.toJSON())
        .map(history => _.extend({}, history.Song, history
        ))
      console.log('Histories found??', histories)
      res.send(histories)
    } catch (error) {
      res.status(500).send({
        error: 'Some issue finding Songs and fetching it'
      })
    }
  },
  async post(req, res) {
    try {
      console.log('Inside post method')
      const { SongId, UserId } = req.body
      console.log(req.body, UserId, SongId)
      const newHistory = await History.create({
        SongId: SongId,
        UserId: UserId
      })
      console.log('History created', newHistory)
      res.send(newHistory)
    } catch (error) {
      console.log('An error occured while creating the History', error)
    }
  },
  async findAll(req, res) {
    try {
      const allHistory = await History.findAll()
      res.send(allHistory)
    } catch (error) {
      res.status(500).send({
        error: 'Error while sending fetching all histories'
      })
    }
  }
}