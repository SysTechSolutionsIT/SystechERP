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

const CompanyConfig = sequelize.define("CompanyConfig", {
      currency: {
        type: DataTypes.STRING,
      },
      theme: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.STRING,
      },
      sessionTM: {
        type: DataTypes.STRING,
      },
      remarks: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      empID: {
        type: DataTypes.STRING,
      },
      cmulti: {
        type: DataTypes.STRING,
      },
      att: {
        type: DataTypes.STRING,
      },
      aProcess: {
        type: DataTypes.STRING,
      },
      atap: {
        type: DataTypes.STRING,
      },
      shiftFlag: {
        type: DataTypes.STRING,
      },
      jobApp: {
        type: DataTypes.STRING,
      },
      holiday: {
        type: DataTypes.STRING,
      },
      odFlag: {
        type: DataTypes.STRING,
      },
      otFlag: {
        type: DataTypes.STRING,
      },
      LAFlag: {
        type: DataTypes.STRING,
      },
      otCalc: {
        type: DataTypes.STRING,
      },
      esicSal: {
        type: DataTypes.STRING,
      },
      pfSal: {
        type: DataTypes.STRING,
      },
      gratuity: {
        type: DataTypes.STRING,
      },
      mlwf1: {
        type: DataTypes.STRING,
      },
      mlwf2: {
        type: DataTypes.STRING,
      },
      salLock: {
        type: DataTypes.STRING,
      },
      minWages: {
        type: DataTypes.STRING,
      },
      remarks1: {
        type: DataTypes.STRING,
      },
      salstat: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      smtpHost: {
        type: DataTypes.STRING,
      },
      sender: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      message: {
        type: DataTypes.STRING,
      },
      smsUrl: {
        type: DataTypes.STRING,
      },
      sms: {
        type: DataTypes.STRING,
      },
  });

  
  sequelize
    .sync()
    .then(() => {
      console.log("Company Config table created successfully.");
    })
    .catch((error) => {
      console.error("Error creating company Config table:", error);
    });
  
  module.exports = CompanyConfig;
  