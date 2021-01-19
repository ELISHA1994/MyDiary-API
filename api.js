const Entries = require('./entries')

module.exports = {
    listEntries
}

async function listEntries (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    try {
        res.json(await Entries.list())
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}
