

module.exports = {
  async uploadImg(req, res) {
    return res.status(200).send({message: 'изображение загружено'})
  }
}
