const dateHelper = require('../date-helper/date');

class UserDto {
    constructor(user) {
        this.deleted = user.deleted
        this.id = user.id
        this.fullName = user.fullName
        this.birthday = dateHelper(user.birthday)
        this.phoneNumber = user.phoneNumber
        this.additionalPhoneNumber = user.additionalPhoneNumber || null
        this.privateEmail = user.privateEmail
        this.businessEmail = user.businessEmail
        this.registrationAddress = user.registrationAddress
        this.position = user.position
        this.manager = user.manager
        this.cvFileId = user.cvFileId
        this.photoFileId = user.photoFileId || null
        this.passport = user.passport || null
        this.dateOfIssue = dateHelper(user.dateOfIssue) || null
        this.inn = user.inn || null
        this.innFileId = user.innFileId || null
        this.firstWorkday = dateHelper(user.firstWorkday)
        this.salary = user.salary
        this.salaryNotes = user.salaryNotes
        this.ldapUsername = user.ldapUsername
        this.updatedAt = dateHelper(user.updatedAt)
        this.createdAt = dateHelper(user.createdAt)
        this.INNFileId = user.INNFileId
        this.CVFileId = user.CVFileId
    }
}

module.exports = UserDto;