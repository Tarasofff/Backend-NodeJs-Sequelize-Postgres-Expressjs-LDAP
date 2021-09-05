const client = require('./ldap.connection');
const ldap = require('ldapjs');
const log = require('../logger/logger.connect');

const authenticateDN = () => {
    return client.bind(process.env.LDAP_ADMIN, process.env.LDAP_ADMIN_PASSWORD, error => {
        if (error) log.error("Error in ldap connection: ", error)
        else log.info("Success ldap connection")
        // searchUser('(cn=*)', 'sub', ['sn', 'cn', 'uid', 'displayName'])
        // deleteUser('cn=New,ou=users,ou=system')
        // addUser("Ivann","Person1", 'inetOrgPerson')
        // updateUser('cn=mike,ou=users,ou=system')
    })
}

const searchUser = (filter, scope, attributes) => {
    const opts = {filter: filter, scope: scope, attributes: attributes}
    return new Promise((resolve, reject) => {
        client.search(process.env.LDAP_USERS, opts, (error, res) => {
            if (error) log.error("Error in search: ", error)
            else {
                res.on('searchRequest', searchRequest => log.info('searchRequest: ', searchRequest.messageID));
                res.on('searchEntry', entry => {
                    log.info("Entry + ", JSON.stringify(entry.object));
                    resolve(entry.object)
                });
                res.on('searchReference', referral => log.info('referral: ' + referral.uris.join()));
                res.on('error', err => {
                    log.error('error: ' + err.message);
                    reject(err)
                });
                res.on('end', result => {
                    if (!result) reject(result);
                    log.info('end + ', result)
                });
            }
        });
    })
}

const addUser = async (name, surname, uid, classObj) => {
    await authenticateDN()
    const entry = {sn: surname, uid: uid, objectclass: classObj}
    return client.add(`cn=${name},${process.env.LDAP_USERS}`, entry, (error) => {
        if (error) log.error("Creating user error: ", error)
        else log.info("Added user")
    });
}

const deleteUser = (username) => {
    client.del(username, (error) => {
        if (error) log.error("Delete error: ", error)
        else log.info("Deleted")
    });
}

const updateUser = (name, changes) => {
    const change = new ldap.Change({
        operation: 'add',
        modification: {
            displayName: '222'
        }
    });

    client.modify(name, change, (error) => {
        if (error) log.error("Update error: ", error)
        else log.error("Update")
    });
}

module.exports = {
    authenticateDN,
    addUser,
    searchUser,
}