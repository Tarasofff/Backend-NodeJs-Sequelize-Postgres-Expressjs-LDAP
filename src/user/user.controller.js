const Router = require("express").Router;
const router = new Router();
const userService = require('./user.service');
const log = require('../logger/logger.connect');
const authStrategy = require('../passport/passport.config');
const audit = require('../audit/audit.service');
const {writeToBuffer} = require("fast-csv");

router.use(authStrategy);

router.post('/', async (req, res) => {
    try {
        log.debug("user.controller.js_create: user req.body= ", req.body)

        if (!Object.keys(req.body).length) return res.status(400).json({message: "Bad Request"});
        const user = await userService.create(req.body);
        if (!user) return res.status(400).json({message: "Bad Request"});

        await audit('create', 'user', null, null, req.user, user, null)
        log.debug("user.controller.js_create: Created user= ", user);

        return res.status(201).json({message: "success", data: user});
    } catch (error) {
        log.error("user.controller.js_create: Create user error= ", error);
        res.status(500).json({message: "Internal server error"});
    }
});

router.get('/export-csv', async (req, res) => {
    try {
        const usersToSendCSV = await userService.getAll()
        log.debug("user.controller.js_getCsv: Users cvs= ", usersToSendCSV)

        if (!usersToSendCSV.length) return res.status(404).json({message: "Not Found"});
        const csv = await writeToBuffer(usersToSendCSV)

        res.setHeader('Content-Type', 'text/plain')
        res.setHeader("Content-Disposition", "$attachment;filename=" + "users.csv")
        res.status(200).end(csv)
    } catch (error) {
        log.error("user.controller.js_getCsv: Get cvs file error= ", error)
        res.status(500).json({message: "Internal server error"})
    }
})

router.get('/', async (req, res) => {
    try {
        log.debug("user.controller_getAll: users");
        const users = await userService.getAll();
        if (!users.length || !Object.keys(users).length || !users) return res.status(404).json({message: "Not Found"});
        log.debug("user.controller.js_getAll: Get all users= ", users);

        return res.status(200).json({message: "success", data: users});
    } catch (error) {
        log.error("user.controller.js_getAll: Get all user error= ", error);
        res.status(500).json({message: "Internal server error"});
    }
})

router.get('/:id', async (req, res) => {
    try {
        log.debug("user.controller.js_getUser: userId=", req.params.id);

        const userToSend = await userService.getById(req.params.id);
        console.log(1)
        console.log(userToSend)
        if (!Object.keys(userToSend).length) return res.status(404).json({message: "Not Found"});

        log.debug("user.controller.js_getUser: Get one user by id= ", userToSend);

        return res.status(200).json({message: "success", data: userToSend});
    } catch (error) {
        log.error("user.controller.js_getUser: Get user by id error= ", error);
        res.status(500).json({message: "Internal server error"});
    }
})

router.put("/:id", async (req, res) => {
    try {
        log.debug("user.controller.js_update user id=", req.params.id);
        log.debug("user.controller.js_update user new fields=", req.body);

        if (!Object.keys(req.body).length) return res.status(400).json({message: "Bad Request"});
        const prev = await userService.getById(req.params.id)

        const userToUpdate = await userService.update({id: req.params.id, update: req.body});
        if (!userToUpdate) return res.status(404).json({message: "Not Found"});
        log.debug("user.controller.js_update: User was updated= ", true);

        await audit('update','user', prev, userToUpdate, req.user)

        return res.status(200).json({message: "success", data: userToUpdate});
    } catch (error) {
        log.error("user.controller.js_update: Update user error= ", error);
        res.status(500).json({message: "Internal server error"});
    }
})

router.delete("/:id", async (req, res) => {
    try {
        log.debug("user.controller.js_delete: userId= ", req.params.id);

        const prev = await userService.getById(req.params.id)

        const userToDelete = await userService.deleting(req.params.id);
        if (!userToDelete) return res.status(404).json({message: "Not Found"});
        log.debug("user.controller.js_delete: User was deleted= ", userToDelete);

        await audit("delete", 'user', prev, userToDelete, req.user)

        return res.status(200).json({message: "success", data: userToDelete});
    } catch (error) {
        log.error("user.controller.js_delete: Delete user error= ", error)
        res.status(500).json({message: "Internal server error"});
    }
})


module.exports = router;