module.exports = function(sequelize, DataTypes) {
    var Memory = sequelize.define("Memory", {
        description: {
            type: DataTypes.STRING(200)
        },
		date: {
			type: DataTypes.DATE
		}
    }, {
        freezeTableName: true
    });
    return Memory;
};
