module.exports = function(sequelize: any, DataTypes: any) {
  const Encounter = sequelize.define(
    "Encounter",
    {
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      bloodType: DataTypes.STRING
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
        }
      }
    }
  );
  return Encounter;
};
