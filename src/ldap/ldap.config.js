const basicAuth = require('basic-auth')

const ldapPassportOptions = {
    server: {
        url: process.env.LDAP_URL,
        bindDn: process.env.LDAP_ADMIN,
        bindCredentials: process.env.LDAP_ADMIN_PASSWORD,
        searchBase: process.env.LDAP_BASE,
        searchFilter: process.env.LDAP_FILTER
    },
    credentialsLookup: basicAuth
};

const ldapConnectionOptions = {
        url: process.env.LDAP_URL,
        reconnect: true
}

module.exports = {
    ldapConnectionOptions,
    ldapPassportOptions
}
