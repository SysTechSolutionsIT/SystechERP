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


const BankMaster = sequelize.define("BankMaster", {
    bankId:{
        type: DataTypes.INTEGER,
    },
    bankName: {
        type: DataTypes.STRING,
    },
    branchName: {
        type: DataTypes.STRING,
    },
    branchAddress: {
        type: DataTypes.STRING,
    },
    accountType: {
        type: DataTypes.STRING,
    },
    accountNo: {
        type: DataTypes.STRING,
    },
    ifscCode: {
        type: DataTypes.STRING,
    },
    swiftCode: {
        type: DataTypes.STRING,
    },
    registeredEmail: {
        type: DataTypes.STRING,
    },
    registeredContact: {
        type: DataTypes.STRING,
    },
    currencyType: {
        type: DataTypes.STRING,
    },
    bankGst: {
        type: DataTypes.STRING,
    },
    authPersonCount: {
        type: DataTypes.INTEGER,
    },
    remark: {
        type: DataTypes.STRING,
    },
    authPerson1: {
        type: DataTypes.STRING,
    },
    authPerson2: {
        type: DataTypes.STRING,
    },
    authPerson3: {
        type: DataTypes.STRING,
    },
})

sequelize
  .sync()
  .then(() => {
    console.log("Bank Master table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating Bank Master table:", error);
  });

module.exports = BankMaster;
