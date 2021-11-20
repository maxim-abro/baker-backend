const router = require('express-promise-router')()
const { upload } = require('../controller')
const uploadFoo = require('../middlewares/upload')

router.post('/general', uploadFoo.single('photo'), upload.uploadImg)

module.exports = router
