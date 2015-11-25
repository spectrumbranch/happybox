module.exports = function(sequelize, DataTypes) {
    var memory = sequelize.define("memory", {
        description: {
            type: DataTypes.STRING(200)
        },
		date: {
			type: DataTypes.DATE
		}
    }, {
        freezeTableName: true
    });
    return memory;
};
