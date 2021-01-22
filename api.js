const Entries = require('./models/entries')
const autoCatch = require('./lib/auto-catch')
const utils = require('./utils/utils')

module.exports = autoCatch({
    listEntries,
    getEntries,
    createEntries,
    updateEntries,
    deleteEntries
})

async function listEntries (req, res) {
    const { offset = 0, limit = 25, tag } = req.query

    const entries = await Entries.list({
        offset: Number(offset),
        limit: Number(limit),
        tag
    })
    res.json(entries)
}

async function getEntries (req, res, next) {
    const { id } = req.params

    const entry = await Entries.get(id)
    if (!entry) return next()

    res.json(entry)
}

async function createEntries(req, res, next) {
    // console.log('request body:', req.body)
    const entry = await Entries.create(req.body)
    res.json(entry)
}

async function updateEntries(req, res, next) {
    const { id } = req.params

    const entry = await Entries.edit(id, req.body)
    res.json(entry)
}

async function deleteEntries(req, res, next) {
    const { id } = req.params

    const check = await getEntry(id)
    if (check) {
        await Entries.delete(id)
        res.json({ success: true })
    }
    res.json({message: 'Entry does not exist in file'})


}

const getEntry = async (id) => {
    const data = await utils.read('entries', 'entries.json')
    const entries = JSON.parse(data)

    for (let i = 0; i < entries.length; i++) {
        if (entries[i].id === id) return true
    }
    return null
}
