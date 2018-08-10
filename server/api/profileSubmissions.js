/*Initial Route for CRUDING data specific to player profiling
  examples: name, picture, hometown, etc.*/

const cloudinary = require('cloudinary')
cloudinary.config({
  cloud_name: 'brenmeyer2245',
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const router = require('express').Router()
const Players = require('Player')

router.post('/picSubmit', async (req, res, next) => {
  try {
    if (!req.files) throw Error('No file Attached')
    if (
      !req.files.image.name.endsWith('.jpg') &&
      !req.files.image.name.endsWith('.png')
    ) {
      throw Error('File is not a jpg or png format')
    }
    let photo = req.files.image
    photo.mv(`public/pics/${req.user.id}_${req.files.image.name}`, function(
      err
    ) {
      if (err) next(err)
    })

    //ADD TO PLAYER
    Players.findById(req.user.id)
    res.send({url: `${req.user.id}_${req.files.image.name}`})
  } catch (err) {
    next(err)
  }
})

module.exports = router
