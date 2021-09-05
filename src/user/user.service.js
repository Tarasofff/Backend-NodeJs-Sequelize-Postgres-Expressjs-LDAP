const User = require('./user.model');
const ldapServices = require('../ldap/ldap.service');
const UserDto = require("./user.dto");

const create = async (body) => {
    const fullName = body.fullName.toLowerCase().split(' ');
    const commonName = fullName[0];
    const secondName = fullName[1];
    const uid = commonName[0] + '.' + secondName;

    const userLdap = await ldapServices.addUser(commonName, secondName, uid,  process.env.LDAP_CLASSOBJECT);
    if (!userLdap) return null;
    const user = await ldapServices.searchUser(`(${process.env.LDAP_SEARCH_USER_FILTER}${uid})`, process.env.LDAP_SEARCH_SCOPE, process.env.LDAP_SEARCH_ATTRIBUTES.split(','));

    return new UserDto(await User.create({
        fullName: body.fullName,
        birthday: body.birthday,
        phoneNumber: body.phoneNumber,
        additionalPhoneNumber: body.additionalPhoneNumber,
        privateEmail: body.privateEmail,
        businessEmail: body.businessEmail,
        registrationAddress: body.registrationAddress,
        position: body.position,
        manager: body.manager,
        cvFileId: body.cvFileId,
        photoFileId: body.photoFileId,
        passport: body.passport,
        dateOfIssue: body.dateOfIssue,
        inn: body.inn,
        innFileId: body.innFileId,
        firstWorkday: body.firstWorkday,
        salary: body.salary,
        salaryNotes: body.salaryNotes,
        ldapUsername: user.uid
    }))
}

const getAll = async () => await User.findAll({raw: true})

const getById = async id => new UserDto(await User.findOne({where: {id: id}}))

const update = async user => {
    const record = await getById(user.id)
    await User.update({
        fullName: user.update.fullName,
        birthday: user.update.birthday,
        phoneNumber: user.update.phoneNumber,
        additionalPhoneNumber: user.update.additionalPhoneNumber,
        privateEmail: user.update.privateEmail,
        businessEmail: user.update.businessEmail,
        registrationAddress: user.update.registrationAddress,
        position: user.update.position,
        manager: user.update.manager,
        cvFileId: user.update.cvFileId,
        photoFileId: user.update.photoFileId,
        passport: user.update.passport,
        dateOfIssue: user.update.dateOfIssue,
        inn: user.update.inn,
        innFileId: user.update.innFileId,
        firstWorkday: user.update.firstWorkday,
        salary: user.update.salary,
        salaryNotes: user.update.salaryNotes,
        ldapUsername: user.update.ldapUsername
    }, {where: {id: record.id}})
    return new UserDto(await getById(record.id))
}

const deleting = async id => {
    const user = await getById(id)
    await User.update({deleted: true}, {where: {id: user.id}})
    return new UserDto(await getById(user.id))
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleting
}
