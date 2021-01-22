const utils = require('../utils/utils')

module.exports.create = async (fields) => {
    await utils.write(
        'entries',
        'entries.json',
        fields
    )
    return fields
}

module.exports.list = async (opts = {}) => {
    const { offset = 0, limit = 25, tag } = opts
    const data = await utils.read('entries', 'entries.json')
    return JSON.parse(data)
        .filter((p, i) => !tag || p.tags.indexOf(tag) >= 0)
        .slice(offset, offset + limit)
}

module.exports.get = async (id) => {

    const data = await utils.read('entries', 'entries.json')
    const entries = JSON.parse(data)
    // console.log(entries)
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].id === id) return entries[i]
    }
    return null

}

module.exports.edit = async (id, change) => {
    const entry = await utils.update(
        'entries',
        'entries.json',
        change,
        id
    )
    return entry
}

module.exports.delete = async (id) => {
    await utils.delete(
        'entries',
        'entries.json',
        id
    )
}
