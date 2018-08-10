/*Initial Route for CRUDING data specific to player profiling
  examples: name, picture, hometown, etc.*/

// const cloudinary = require('cloudinary')
// cloudinary.config({
//   cloud_name: 'brenmeyer2245',
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET
// })

const router = require('express').Router()
const {User} = require('../db/models/index')
router.post('/picSubmit', async (req, res, next) => {
  try {
    if (!req.files) res.status(401).send('No Files')
    else if (
      !req.files.image.name.endsWith('.jpeg') &&
      !req.files.image.name.endsWith('.jpg') &&
      !req.files.image.name.endsWith('.png')
    ) {
      res.status(401).send('File is not jpeg, jpg, png format')
    } else {
      let photo = req.files.image
      photo.mv(`public/pics/${req.user.id}_${req.files.image.name}`, function(
        err
      ) {
        if (err) next(err)
      })
      const user = await User.findById(req.user.id)
      user.update({imageURL: `/pics/${req.user.id}_${req.files.image.name}`})
      photo.mv(`public/pics/${req.user.id}_${req.files.image.name}`, function(
        err
      ) {
        if (err) next(err)
      })
      res.send({url: `${req.user.id}_${req.files.image.name}`})
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
