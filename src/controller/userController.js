// import userService from '../service/userService'
import renderService from '../service/renderService'

export default {
  renderProfilePage (req, res, next) {
    res.status(200).send(renderService(req.url))
  }
}
