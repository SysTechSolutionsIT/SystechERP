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

const ProfessionalTaxMaster = sequelize.define("ProfessionalTaxMaster", {
    Gender: {
        type: DataTypes.STRING,
    },
    UpperLimit: {
        type: DataTypes.STRING,
    },
    LowerLimit: {
        type: DataTypes.STRING,
    },
    PTAmount: {
        type: DataTypes.STRING,
    },
    PTAmountFebruary: {
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
        console.log("Professional Tax Master table created successfully.");
    })
    .catch((error) => {
        console.error("Error Heads creating Professional Tax Master table:", error);
    });

module.exports = ProfessionalTaxMaster;