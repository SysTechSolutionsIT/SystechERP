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

const EmpAcademic = sequelize.define("EmpAcademic", {
  EmployeeName: {
    type: DataTypes.STRING,
  },
  Qualification: {
    type: DataTypes.STRING,
  },
  Institute: {
    type: DataTypes.STRING,
  },
  Specialization: {
    type: DataTypes.STRING,
  },
  Grades: {
    type: DataTypes.STRING,
  },
  PassingYear: {
    type: DataTypes.STRING,
  },
  Languages: {
    type: DataTypes.STRING,
  },
  Status: {
    type: DataTypes.STRING,
  }
});

sequelize
  .sync()
  .then(() => {
    console.log("Emp Academic table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating Emp Academic table:", error);
  });

module.exports = EmpAcademic;
