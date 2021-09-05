const passport = require('passport');
const LdapStrategy = require('passport-ldapauth');
const ldapConfig = require('../ldap/ldap.config');

const authStrategy = passport.authenticate('ldapauth', {session: false});
passport.use('ldapauth', new LdapStrategy(ldapConfig.ldapPassportOptions, async (user, done) => done(null, {username: user.uid})));

module.exports = authStrategy;