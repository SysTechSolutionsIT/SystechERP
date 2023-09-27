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

const ThreeFieldMaster = sequelize.define("ThreeFieldMaster", {
    masterName: {
        type: DataTypes.STRING,
    },
    fieldDetails1: {
        type: DataTypes.STRING,
    },
    fieldDetails2: {
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
        console.log("Three Field master table created successfully");
    })
    .catch((error) => {
        console.log("Error creating Three Field Master table", error);
    });

module.exports = ThreeFieldMaster;
