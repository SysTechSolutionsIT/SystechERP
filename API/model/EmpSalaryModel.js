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

const EmpSalary = sequelize.define("EmpSalary", {
    EmployeeName:{
        type: DataTypes.STRING,
    },
            Grade:{
        type: DataTypes.STRING,
    },
            Band:{
        type: DataTypes.STRING,
    },
            Salary:{
        type: DataTypes.STRING,
    },
            CTC:{
        type: DataTypes.STRING,
    },
            OTFlag: {
        type: DataTypes.STRING,
    },
            OTAmount:{
        type: DataTypes.STRING,
    },
            PFFlag:{
        type: DataTypes.STRING,
    },
            PFNo:{
        type: DataTypes.STRING,
    },
            PFDate:{
        type: DataTypes.STRING,
    },
            ESICFlag:{
        type: DataTypes.STRING,
    },
            ESICNo:{
        type: DataTypes.STRING,
    },
            ESICDate:{
        type: DataTypes.STRING,
    },
            MLWFFlag:{
        type: DataTypes.STRING,
    },
            MLWFNo:{
        type: DataTypes.STRING,
    },
            GratuityApplicable:{
        type: DataTypes.STRING,
    },
            GratuityAmount:{
        type: DataTypes.STRING,
    },
            Remark:{
        type: DataTypes.STRING,
    },
            Status: {
        type: DataTypes.STRING,
    },
})

sequelize
  .sync()
  .then(() => {
    console.log("Emp Salary table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating Emp Salary table:", error);
  });

module.exports = EmpSalary;