const { User, Appointment } = require('../models')
const moment = require('moment')

class AppointmentController {
  async create (req, res) {
    const provider = await User.findByPk(req.params.provider) // busca User por ID
    return res.render('appointments/create', { provider })
  }

  async store (req, res) {
    const { id } = req.session.user
    const { provider } = req.params
    const { date } = req.body

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date
    })

    return res.redirect('/app/dashboard')
  }

  async list (req, res) {
    const { id } = req.session.user
    const today = new Date()

    const appointments = await Appointment.findAll({
      where: {
        provider_id: id,
        date: today[0].getTime()
      }
    })

    return res.render('appointments/list', { appointments })
  }
}

module.exports = new AppointmentController()
