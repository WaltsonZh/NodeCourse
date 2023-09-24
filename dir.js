const fs = require('fs')

// create directory if it does not exist
if (!fs.existsSync('./new')) {
  fs.mkdir('new', (err) => {
    if (err) throw err
    console.log('Derectory created')
  })
}

// remove if the directory exist
if (fs.existsSync('./new')) {
  fs.rmdir('new', (err) => {
    if (err) throw err
    console.log('Derectory removed')
  })
}
