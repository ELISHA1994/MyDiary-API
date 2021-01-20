const Entries = require('./entries')
const autoCatch = require('./lib/auto-catch')

module.exports = ({
    listEntries,
    getEntries
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

    const entries = await Entries.get(id)
    if (!entries) return next()

    res.json(entries)
}
