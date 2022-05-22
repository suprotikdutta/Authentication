const bcrypt = require("bcrypt")
const SALT_ROUNDS = 10

module.exports.hashPassword = async(password)=> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

module.exports.comparePassword = async(password, hashed)=> {
    const match = await bcrypt.compare(password, hashed);
    return match;
}








  