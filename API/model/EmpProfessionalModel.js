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

const EmpProfessional = sequelize.define("EmpProfessional", {
  Employer: {
    type: DataTypes.STRING,
  },
  Experience: {
    type: DataTypes.STRING,
  },
  Designation: {
    type: DataTypes.STRING,
  },
  JobResponsibility: {
    type: DataTypes.STRING,
  },
  Salary: {
    type: DataTypes.STRING,
  },
  Status: {
    type: DataTypes.STRING,
  }
});

sequelize
  .sync()
  .then(() => {
    console.log("Emp Professional table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating Emp Professional table:", error);
  });

module.exports = EmpProfessional;
