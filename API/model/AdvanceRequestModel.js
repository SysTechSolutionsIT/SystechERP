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

const AdvanceRequest = sequelize.define("AdvanceRequest", {
    AdvanceDate: {
        type: DataTypes.DATE,
    },
    Employee: {
        type: DataTypes.STRING,
    },
    AdvanceType: {
        type: DataTypes.STRING,
    },
    AdvanceStatus: {
        type: DataTypes.STRING,
    },
    Project: {
        type: DataTypes.STRING,
    },
    Amount: {
        type: DataTypes.STRING,
    },
    Installment: {
        type: DataTypes.STRING,
    },
    StartingMonth: {
        type: DataTypes.STRING,
    },
    StartingYear: {
        type: DataTypes.STRING,
    },
    Purpose: {
        type: DataTypes.STRING,
    },
    Remark: {
        type: DataTypes.STRING,
    },
    Status: {
        type: DataTypes.STRING,
    },
})

sequelize
    .sync()
    .then(() => {
        console.log("Advance Request table created successfully.");
    })
    .catch((error) => {
        console.error("Error creating Advance Request table:", error);
    });

module.exports = AdvanceRequest;