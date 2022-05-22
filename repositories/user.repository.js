const { DataTypes } = require("sequelize");
const sequelize = require("../config/db-connection");
const userRepository = require("../models/user.model")(sequelize, DataTypes);

module.exports.createUser = (data) => {
  userRepository.sync();
  return userRepository.create(data);
}

module.exports.updateById = (data) => {
  return userRepository.update(data.body, { where: { id: data.params.id } });
};

module.exports.findById = (data) => {
  const id = data.id;
  return userRepository.findOne({ where: { id: id } });
}

module.exports.findByEmail = (data) => {
  return userRepository.findOne({ where: { email:data.email } });
}

module.exports.deleteById = (data) => {
  const id = data.id;
  return userRepository.destroy({ where: { id: id } });
}
