const users = (sequelize, DataTypes) => {
    return sequelize.define("user", {
      name:DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
};

module.exports = users;
