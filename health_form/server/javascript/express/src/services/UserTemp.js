const UserTempRepository = require("../repositories/UserTemp")

exports.LogUserTemp = async function(name, temperature, is_symptomatic, in_contact) {
    if (!name) {
        throw new Error("Required missing parameter 'name'")
    }
    if (name.length >= 100) {
        throw new Error("Parameter 'name' too long")
    }
    if (!temperature) {
        throw new Error("Required missing parameter 'temperature'")
    }
    if (temperature < 30 || temperature > 100) {
        throw new Error("Invalid temperature")
    }

    return UserTempRepository.LogToDB(name, temperature, is_symptomatic, in_contact)
}