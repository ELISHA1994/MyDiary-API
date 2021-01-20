const fs = require('fs').promises
const path = require('path')

const entriesFiles = path.join(__dirname, '../entries.json')

module.exports = {
    list,
    get
}

async function list (opts = {}) {
    const { offset = 0, limit = 25, tag } = opts
    const data = await fs.readFile(entriesFiles)
    return JSON.parse(data)
        .filter((p, i) => !tag || p.tags.indexOf(tag) >= 0)
        .slice(offset, offset + limit)
}

async function get(id) {
    const entries = JSON.parse(await fs.readFile(entriesFiles))
    for (let item of entries) {
        if (item.id === id) return item

        return null
    }
}
