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

const EarningHeadsMaster = sequelize.define("EarningHeadsMaster", {
    Name: {
        type: DataTypes.STRING,
    },
    ShortName: {
        type: DataTypes.STRING,
    },
    HeadPosition: {
        type: DataTypes.STRING,
    },
    CalculationType: {
        type: DataTypes.STRING,
    },
    CalculationValue: {
        type: DataTypes.STRING,
    },
    SalaryParameter1: {
        type: DataTypes.STRING,
    },
    SalaryParameter2: {
        type: DataTypes.STRING,
    },
    SalaryParameter3: {
        type: DataTypes.STRING,
    },
    SalaryParameter4: {
        type: DataTypes.STRING,
    },
    SalaryParameter5: {
        type: DataTypes.STRING,
    },
    SalaryParameter6: {
        type: DataTypes.STRING,
    },
    SalaryParameter7: {
        type: DataTypes.STRING,
    },
    SalaryParameter8: {
        type: DataTypes.STRING,
    },
    SalaryParameter9: {
        type: DataTypes.STRING,
    },
    SalaryParameter10: {
        type: DataTypes.STRING,
    },
    Formula: {
        type: DataTypes.STRING,
    },
    Status: {
        type: DataTypes.STRING,
    },
    Remark: {
        type: DataTypes.STRING,
    }
})

sequelize
    .sync()
    .then(() => {
        console.log("Earning Master table created successfully.");
    })
    .catch((error) => {
        console.error("Error creating Earning Master table:", error);
    });

module.exports = EarningHeadsMaster;