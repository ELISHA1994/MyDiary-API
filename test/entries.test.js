const expect = require('expect')
const rewire = require('rewire')

const entries = require('../models/entries')
const entriesRewire = rewire('../models/entries')

describe('Entries', () => {
    describe('create', () => {

        const utils = {
            write: expect.createSpy()
        }
        entriesRewire.__set__('utils', utils)

        it('should call utils.write with provide fields', () => {
            const fields = {
                id: 'randomId123',
                title: 'randomTitle',
                description: 'randomDescription'
            }
            entriesRewire.create(fields)
            // const [data] =  Promise.all([entriesRewire.create(fields)])
            // console.log(data)
            expect(utils.write).toHaveBeenCalled()
            expect(utils.write).toHaveBeenCalledWith('entries', 'entries.json', fields)
            // expect(utils.write).toEqual(fields)
        })

    })
})
