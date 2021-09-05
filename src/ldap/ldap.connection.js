const ldap = require('ldapjs')
const ldapOptions = require('./ldap.config')

module.exports = ldap.createClient(ldapOptions.ldapConnectionOptions);