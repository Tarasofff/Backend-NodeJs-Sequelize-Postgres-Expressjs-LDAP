const dateHelper = require('../date-helper/date');

class FileDto {
    constructor(file) {
        this.id = file.id
        this.name = file.name
        this.mimetype = file.mimetype
        this.size = file.size
        this.contentFolderPath = file.contentFolderPath
        this.updatedAt = dateHelper(file.updatedAt)
        this.createdAt= dateHelper(file.createdAt)
    }
}

module.exports = FileDto;