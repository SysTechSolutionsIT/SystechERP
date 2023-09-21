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

const DestinationMaster = sequelize.define("DestinationMaster", {
    name: {
        type: DataTypes.STRING,
    },
    contractorName: {
        type: DataTypes.TEXT,
    },
    distance: {
        type: DataTypes.STRING,
    },
    employeeFare: {
        type: DataTypes.STRING,
    },
    remark: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
    },
});

sequelize
    .sync()
    .then(() => {
        console.log('Destination master table created successfully')
    })
    .catch((error) => {
        console.log('Error creating Destination Master table', error)
    })

module.exports = DestinationMaster