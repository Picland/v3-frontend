/**
 * Formidable just for uploading img
 *
 * @reference https://github.com/felixge/node-formidable#api
 * @reference https://github.com/noraesae/express-formidable
 */

import formidable from 'formidable'

function parse (opts) {
  const form = new formidable.IncomingForm()
  Object.assign(form, opts)

  return (req, res, next) => {
    if (req.is('multipart/form-data')) {
      form.parse(req, (err, fields, files) => {
        if (err) {
          next(err)
          return
        }
        Object.assign(req, { fields, files })
        next()
      })
    } else {
      next()
    }
  }
}

export default parse
