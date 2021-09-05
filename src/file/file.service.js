const FileMetadata = require('./file.metadata.model');
const fs = require('fs').promises;
const path = require('path');
const fileDto = require('./file.dto');

const getContentFolderPath = () => {
    const date = new Date();
    return `${date.getFullYear() + '-' + (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth())}`;
};

const getMetadataById = async id => new fileDto(await FileMetadata.findOne({where: {id: id}}))

const create = async file => {
    const {originalname, mimetype, size, buffer} = file;

    const contentFolderPath = getContentFolderPath();
    await fs.mkdir(path.join(process.env.FILE_PATH, contentFolderPath), {recursive: true});

    const fileData = await FileMetadata.create({
        name: originalname,
        mimetype: mimetype,
        size: size,
        contentFolderPath: process.env.FILE_PATH + '/' + contentFolderPath
    });
    await fs.writeFile(path.join(process.env.FILE_PATH, contentFolderPath, String(fileData.id)), buffer);
    return new fileDto(fileData);
}

const getContentWithFileMetadata = async id => {
    const contentFolderPath = getContentFolderPath();
    const fileData = await getMetadataById(id);
    if (!fileData) return null;

    const bufferData = await fs.readFile(path.join(process.env.FILE_PATH, contentFolderPath, String(id)))
    return { bufferData, fileData }
}

module.exports = {
    create,
    getContentWithFileMetadata,
}