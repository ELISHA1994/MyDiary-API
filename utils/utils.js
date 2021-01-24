const fs = require('fs').promises
const path = require('path')

// Base directory of the data folder
const basePath = path.join(__dirname, '../../.data/')

module.exports.read = async (dir, file) => {
    return await fs.readFile(`${basePath}${dir}/${file}`, 'utf8')
}

module.exports.write = async (dir, file, data) => {
    const fileData = JSON.parse(
        await fs.readFile(`${basePath}${dir}/${file}`)
    )
    fileData.push(data)
    return await  fs.writeFile(
        `${basePath}${dir}/${file}`,
        JSON.stringify(fileData, null, 2)
    )
}

module.exports.update = async (dir, file, data, id) => {


    const fileData = JSON.parse(
        await fs.readFile(`${basePath}${dir}/${file}`)
    )
    for (let i = 0; i < fileData.length; i++) {
        if (fileData[i].id === id) {
            const entryToUpdate = fileData[i]
            // fileDataSub.splice(i, 1)
            Object.keys(data).forEach(function (key) {
                entryToUpdate[key] = data[key]
            })
            fileData.splice(i, 1, entryToUpdate)
            await fs.writeFile(
                `${basePath}${dir}/${file}`,
                JSON.stringify(fileData, null, 2)

            )
            return fileData[i]
        }
    }
    // return  new Error('Entry does not exist in file')
}

module.exports.delete = async (dir, file, id) => {
    const fileData = JSON.parse(
        await fs.readFile(`${basePath}${dir}/${file}`)
    )
    for (let i = 0; i < fileData.length; i++) {
        if (fileData[i].id === id) {
            fileData.splice(i, 1)
            await fs.writeFile(
                `${basePath}${dir}/${file}`,
                JSON.stringify(fileData, null, 2)

            )
            return
        }
    }
}
