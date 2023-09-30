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

const JobMaster = sequelize.define("JobMaster", {
  jobID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  jobName: {
    type: DataTypes.STRING,
  },
  jobShortName: {
    type: DataTypes.STRING,
  },
  ratePerDay: {
    type: DataTypes.STRING,
  },
  rateGroup: {
    type: DataTypes.STRING,
  },
  Remark: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  position: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Job Master table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating Job Master table:", error);
  });

module.exports = JobMaster;
