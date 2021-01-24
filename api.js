const Entries = require('./models/entries')
const autoCatch = require('./lib/auto-catch')
const utils = require('./utils/utils')
const { v4: uuidv4 } = require('uuid')

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

// Entries - post
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
async function createEntries(req, res, next) {
    const { title, description } = req.body
    let fields = {}
    fields.id = uuidv4()
    fields.title = title
    fields.description = description
    fields.timestamp = Date.now()


    const entry = await Entries.create(fields)
    res.json(entry)

}

async function updateEntries(req, res, next) {
    const { id } = req.params

    const entry = await Entries.edit(id, req.body)
    res.json(entry)
}

async function deleteEntries(req, res, next) {
    const { id } = req.params

    const result = await Entries.delete(id)
    res.json(result)

}
