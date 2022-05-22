const { DataTypes } = require("sequelize");
const sequelize = require("../config/db-connection");
const tokenRepository = require("../models/token.model")(sequelize, DataTypes);

module.exports.createToken = (data) => {
    console.log(data);
    tokenRepository.sync({force:false});
    return tokenRepository.create(data);
}


module.exports.findToken = (data) => {
    return tokenRepository.findOne({ where: { userId:data } });
}

module.exports.findUserByToken = (data) => {
    return tokenRepository.findOne({ where: { token:data } });
}

module.exports.deleteTokenById = (data) => {
     return tokenRepository.destroy({ where: { id: data } });
}

