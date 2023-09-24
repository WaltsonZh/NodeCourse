const fs = require('fs')

// read stream
const rs = fs.createReadStream('./files/lorem.txt', { encoding: 'utf-8' })

// write stream
const ws = fs.createWriteStream('./files/new-lorem.txt')

// rs.on('data', (dataChunk) => {
//   ws.write(dataChunk)
// })

// efficient!!
rs.pipe(ws)
