const usersDB = {
  users: require('../model/users.json'),
  setUser: function (data) {
    this.users = data
  },
}
const bcrypt = require('bcrypt')

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body

  // check for username and password
  if (!user || !pwd) return res.status(400).json({ message: 'Username and password are required.' })

  // find the user
  const foundUser = usersDB.users.find((person) => person.username === user)
  if (!foundUser) return res.sendStatus(401)

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password)
  if (match) {
    // create JWTs (JSON web tokens)
    res.json({ 'success': `User ${user} is logged in!` })
  } else {
    res.sendStatus(401)
  }
}

module.exports = { handleLogin }
