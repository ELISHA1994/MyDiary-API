// import 'regenerator-runtime/runtime'
// const expect = require('expect')
// const rewire = require('rewire')
//
// // const entries = require('../models/entries')
// // const entriesRewire = rewire('../models/entries')
// const entriesRewire = rewire('../dist-server/models/entries')
// // require('../dist-server/models/entries')
//
// describe('Entries', () => {
//     describe('create', () => {
//
//         const helpers = {
//             write: expect.createSpy()
//         }
//         entriesRewire.__set__('helpers', helpers)
//
//         it('should call helpers.write with provide fields', () => {
//             const fields = {
//                 id: 'randomId123',
//                 title: 'randomTitle',
//                 description: 'randomDescription'
//             }
//             entriesRewire.create(fields)
//             // const [data] =  Promise.all([entriesRewire.create(fields)])
//             // console.log(data)
//             expect(helpers.write).toHaveBeenCalled()
//             expect(helpers.write).toHaveBeenCalledWith('entries', 'entries.json', fields)
//             // expect(helpers.write).toEqual(fields)
//         })
//
//     })
// })
