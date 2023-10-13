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
)

const EDImport = sequelize.define("EDImport", {
    Month: {
        type: DataTypes.STRING,
    },
    Year: {
        type: DataTypes.STRING,
    },
    SalaryHeads: {
        type: DataTypes.STRING,
    },
    File: {
        type: DataTypes.BLOB,
    },
})

sequelize
    .sync()
    .then(() => {
        console.log("EDImports table created successfully.");
    })
    .catch((error) => {
        console.error("Error creating EDImports table:", error);
    });

module.exports = EDImport;