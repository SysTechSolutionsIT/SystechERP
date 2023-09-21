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
      themes: {
        type: DataTypes.STRING,
      },
      dateFormat: {
        type: DataTypes.STRING,
      },
      sessionTimout: {
        type: DataTypes.STRING,
      },
      remarksGeneral: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      empIdPrefix: {
        type: DataTypes.STRING,
      },
      companyMultibranch: {
        type: DataTypes.STRING,
      },
      attendanceFlag: {
        type: DataTypes.STRING,
      },
      attendanceProcess: {
        type: DataTypes.STRING,
      },
      attendanceApprovalFlag: {
        type: DataTypes.STRING,
      },
      fixShiftFlag: {
        type: DataTypes.STRING,
      },
      jobApproval: {
        type: DataTypes.STRING,
      },
      paidHolidayLogic: {
        type: DataTypes.STRING,
      },
      OdApprovalFlag: {
        type: DataTypes.STRING,
      },
      OtApprovalFlag: {
        type: DataTypes.STRING,
      },
      LeaveApprovalFlag: {
        type: DataTypes.STRING,
      },
      attendanceLockDay: {
        type: DataTypes.STRING,
      },
      otCalculationFlag: {
        type: DataTypes.STRING,
      },
      esicSalaryLimit: {
        type: DataTypes.STRING,
      },
      pfSalaryLimit: {
        type: DataTypes.STRING,
      },
      gratuityYearsLimit: {
        type: DataTypes.STRING,
      },
      mlwfMonth1: {
        type: DataTypes.STRING,
      },
      mlwfMonth2: {
        type: DataTypes.STRING,
      },
      salaryLockDay: {
        type: DataTypes.STRING,
      },
      salaryMinWages: {
        type: DataTypes.STRING,
      },
      remarksPayroll: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      emailService: {
        type: DataTypes.STRING,
      },
      smtpHost: {
        type: DataTypes.STRING,
      },
      fromEmailId: {
        type: DataTypes.STRING,
      },
      mUsername: {
        type: DataTypes.STRING,
      },
      mPassword: {
        type: DataTypes.STRING,
      },
      emailFormat: {
        type: DataTypes.TEXT,
      },
      smsService: {
        type: DataTypes.STRING,
      },
      smsURL: {
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
  