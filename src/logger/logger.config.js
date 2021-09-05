module.exports = {
    appenders: {
        file: {
            type: "file",
            filename: "file.log",
            maxLogSize: 100000,
            backups: 2,
            compress: true,
            threshold: 'info',
            keepFileExt: true
        },
        console: {type: 'console', threshold: 'all'}
    },
    categories: {default: {appenders: ["console"], level: "all"}, file: {appenders: ['file'], level: 'info'}}
}
