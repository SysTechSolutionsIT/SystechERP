const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    "u172510268_systech",
    "u172510268_devs",
    "Ggwpfax@9990",
    {
        host: "srv1001.hstgr.io",
        dialect: "mysql",
        port: 3306,
    }
);

const TwoFieldMaster = sequelize.define("TwoFieldMaster", {
    masterName: {
        type: DataTypes.STRING,
    },
    fieldDetails: {
        type: DataTypes.STRING,
    },
    remark: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
    },
});

sequelize
    .sync()
    .then(() => {
        console.log("Two Field master table created successfully");
    })
    .catch((error) => {
        console.log("Error creating Two Field Master table", error);
    });

module.exports = TwoFieldMaster;
