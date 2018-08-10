/*Initial Route for CRUDING data specific to player profiling
  examples: name, picture, hometown, etc.*/

// const cloudinary = require('cloudinary')
// cloudinary.config({
//   cloud_name: 'brenmeyer2245',
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET
// })

const router = require('express').Router()
// const Players = require('Player')

router.post('/picSubmit', async (req, res, next) => {
  console.log('A message:', req)
  res.send('Stuff')
  // try {
  //   let imageFile = req.files.file
  //   imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, function(err) {
  //     if (err) next(err)

  //     res.json({message: 'picture stored'})
  //   })
  //   cloudinary.uploader.upload(
  //     `${__dirname}/public/${req.body.filename}.jpg`,
  //     result => {
  //       console.log(result)
  //     }
  //   )
  // } catch (err) {
  //   next(err)
  // }
})

module.exports = router
