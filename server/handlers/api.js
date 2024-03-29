import {
    create,
    list,
    get,
    edit,
    destroy
} from '../models/entries';
import autoCatch from "../lib/auto-catch";
import { v4 as uuidv4 } from 'uuid';

export default autoCatch({
    listEntries,
    getEntries,
    createEntries,
    updateEntries,
    deleteEntries
});

async function listEntries (req, res) {
    const { offset = 0, limit = 25, tag } = req.query

    const entries = await list({
        offset: Number(offset),
        limit: Number(limit),
        tag
    })
    res.json(entries)
}

async function getEntries (req, res, next) {
    const { id } = req.params

    const entry = await get(id)
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


    const entry = await create(fields)
    res.json(entry)

}

async function updateEntries(req, res, next) {
    const { id } = req.params
    let data = req.body
    data.timestamp = Date.now()

    const entry = await edit(id, data)
    res.json(entry)
}

async function deleteEntries(req, res, next) {
    const { id } = req.params

    const result = await destroy(id)
    res.json(result)

}
