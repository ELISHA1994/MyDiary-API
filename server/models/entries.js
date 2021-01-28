import 'regenerator-runtime/runtime'
const helpers = require('../../helpers/helpers')

export async function create(fields) {
    // Check that all required field are filled out
    const idPT = typeof (fields.id) === 'string' && fields.id.length > 0
    const titlePT = typeof (fields.title) === 'string' && fields.title.length > 0
    const descriptionPT = typeof (fields.description) === 'string' && fields.description.length > 0
    if( idPT && titlePT && descriptionPT ) {
        // console.log(fields)
        return await helpers.write(
            'entries',
            'entries.json',
            fields
        )
    }
    return {
        error: 'Missing required fields'
    }
}

export async function list(opts = {}) {
    const { offset = 0, limit = 25, tag } = opts
    const data = await helpers.read('entries', 'entries.json')
    return JSON.parse(data)
        .filter((p, i) => !tag || p.tags.indexOf(tag) >= 0)
        .slice(offset, offset + limit)
}

export async function get(id) {

    const data = await helpers.read('entries', 'entries.json')
    const entries = JSON.parse(data)
    // console.log(entries)
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].id === id) return entries[i]
    }
    return null

}

export async function edit(id, change) {
    const entry = await helpers.update(
        'entries',
        'entries.json',
        change,
        id
    )
    return entry
}

export async function destroy (id) {
    const check = await getEntry(id)

    if (check) {
        await helpers.delete(
            'entries',
            'entries.json',
            id
        )
        return { message: 'Entry deleted' }
    }
    return { message: 'Entry does not exist in file'}
}

const getEntry = async (id) => {
    const data = await helpers.read('entries', 'entries.json')
    const entries = JSON.parse(data)

    if (entries.length > 0) {
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].id === id) return true
        }
    }
    return null
}
