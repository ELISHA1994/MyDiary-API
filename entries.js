const fs = require('fs').promises
const path = require('path')

const entriesFiles = path.join(__dirname, '../entries.json')

module.exports = {
    list
}

async function list () {
    const data = await fs.readFile(entriesFiles)
    return JSON.parse(data)
}
