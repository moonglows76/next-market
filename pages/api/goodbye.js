const goodbye = (req, res) => {
  return res.status(200).json({ message: 'さようなら' })
}

export default goodbye