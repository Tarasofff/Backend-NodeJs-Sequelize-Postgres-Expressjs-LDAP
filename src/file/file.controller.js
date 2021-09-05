const Router = require("express").Router;
const fileService = require("./file.service");
const router = new Router();
const multer = require("multer");
const upload = multer();
const log = require('../logger/logger.connect');

router.post("/", upload.single('filedata'), async (req, res) => {
    try {
        const {file} = req
        log.debug("file.controller.js_upload: file= ", file)

        if (!file) return res.status(400).json({message: 'Bad Request'})
        const fileData = await fileService.create(file)
        log.debug("file.controller.js_upload: Upload file= ", fileData)

        return res.status(201).json({message: "success", data: fileData})
    } catch (error) {
        log.error("file.controller.js_upload: Create record error= ", error)
        res.status(500).json({message: "Internal server error"})
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { attachment } = req.query
        const downloadFlag = attachment === 'true'? 'attachment' : 'inline';
        log.debug("file.controller.js_getFile: fileId= ", req.params.id)
        log.debug("file.controller.js_getFile: Incoming download or send file flag= ", downloadFlag)

        const fileToSend = await fileService.getContentWithFileMetadata(req.params.id)
        log.debug("file.controller.js_getFile: Send or download file data= ", fileToSend)

        if(!fileToSend) return res.status(404).json({message: 'Not Found'});

        res.setHeader('Content-Type', 'image/jpeg')
        res.setHeader("Content-Disposition", `${downloadFlag};filename=` + fileToSend.fileData.name)
        res.status(200).end(fileToSend.bufferData)
    } catch (error) {
        log.error("file.controller.js_get: FileDownload file error= ", error)
        res.status(500).json({message: "Internal server error"})
    }
});


module.exports = router;


