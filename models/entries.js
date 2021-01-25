const utils = require('../utils/utils')

module.exports.create = async (fields) => {
    // Check that all required field are filled out
    const idPT = typeof (fields.id) === 'string' && fields.id.length > 0
    const titlePT = typeof (fields.title) === 'string' && fields.title.length > 0
    const descriptionPT = typeof (fields.description) === 'string' && fields.description.length > 0
    if( idPT && titlePT && descriptionPT ) {
        // console.log(fields)
        return await utils.write(
            'entries',
            'entries.json',
            fields
        )
    }
    return {
        error: 'Missing required fields'
    }
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
    const check = await getEntry(id)

    if (check) {
        await utils.delete(
            'entries',
            'entries.json',
            id
        )
        return { message: 'Entry deleted' }
    }
    return { message: 'Entry does not exist in file'}
}

const getEntry = async (id) => {
    const data = await utils.read('entries', 'entries.json')
    const entries = JSON.parse(data)

    if (entries.length > 0) {
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].id === id) return true
        }
    }
    return null
}
