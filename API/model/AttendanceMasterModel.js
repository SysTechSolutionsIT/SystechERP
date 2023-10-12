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

const Device = sequelize.define("Device", {
  DeviceId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  DeviceName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  IpAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Port: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Remark: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Status: {
    type: DataTypes.ENUM("Active", "Inactive"),
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Attendance Master table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating Attendance Master table:", error);
  });

module.exports = Device;
