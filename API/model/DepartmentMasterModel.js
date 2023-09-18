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

const DepartmentMaster = sequelize.define("DepartmentMaster", {
    deptName:  {
        type: DataTypes.STRING,
    },
    companyBranchName: {
        type: DataTypes.STRING,
    },
    parentDept: {
        type: DataTypes.STRING,
    },
    deptType: {
        type: DataTypes.STRING,
    },
    deptGroup: {
        type: DataTypes.STRING,
    },
    deptHead: {
        type: DataTypes.STRING,
    },
    deptSubHead: {
        type: DataTypes.STRING,
    },
    costCenter: {
        type: DataTypes.STRING,
    },
    standardStaffStrength: {
        type: DataTypes.STRING,
    },
    standardWorkerStrength: {
        type: DataTypes.STRING,
    },
    remark: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
    },
})

sequelize
.sync()
.then(() => {
    console.log('Department master table creates successfully')
})
.catch((error) => {
    console.log('Error creating Department Master table', error)
})

module.exports = DepartmentMaster