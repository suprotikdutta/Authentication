 const tokens = (sequelize, DataTypes) => {
  return sequelize.define("token", {
    userId: {
      type: DataTypes.INTEGER,
      
    },
      token: DataTypes.STRING,
     
    });
};

module.exports = tokens;