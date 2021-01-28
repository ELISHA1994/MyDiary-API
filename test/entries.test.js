import 'regenerator-runtime/runtime'
import expect from 'expect'
import rewire from 'rewire'

const entriesRewire = rewire('../server/models/entries')


describe('Entries', () => {
    describe('create', () => {

        const helpers = {
            write: expect.createSpy()
        }
        entriesRewire.__set__('helpers', helpers)

        it('should call helpers.write with provide fields', () => {
            const fields = {
                id: 'randomId123',
                title: 'randomTitle',
                description: 'randomDescription'
            }
            entriesRewire.create(fields)
            expect(helpers.write).toHaveBeenCalled()
            expect(helpers.write).toHaveBeenCalledWith('entries', 'entries.json', fields)
        })

    })
})
