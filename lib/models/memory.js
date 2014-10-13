module.exports = function(sequelize, DataTypes) {
    var Memory = sequelize.define("Memory", {
        description: {
            type: DataTypes.STRING(200)
        }
    }, {
        freezeTableName: true
    });
    return Memory;
};
