const express = require(`express`);
const bodyParser = require(`body-parser`);
const { Sequelize, DataTypes } = require(`sequelize`);
const jwt = require(`jsonwebtoken`);
const router = express.Router();
const TMonthlyAttendance = require('../model/TMonthlyAttendanceModels')

const authToken = (req, res, next) => {
  const authHeader = req.headers[`authorization`];
  const token = authHeader && authHeader.split(` `)[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Configure Sequelize with database connection details
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: `mysql`,
    port: process.env.DB_PORT,
  }
);

// const TMonthlyAttendance = sequelize.define(
//   `TMonthlyAttendance`,
//   {
//     CompanyId: {
//       type: DataTypes.STRING(5),
//       allowNull: false,
//       defaultValue: `00001`,
//     },
//     BranchId: {
//       type: DataTypes.STRING(5),
//       allowNull: false,
//       defaultValue: `00001`,
//     },
//     MAttendanceId: {
//       type: DataTypes.STRING(5),
//       allowNull: false,
//       primaryKey: true,
//     },
//     EmployeeId: {
//       type: DataTypes.STRING(5),
//       allowNull: false,
//     },
//     ManualAttendance: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     PaidLeaves: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     UnpaidLeaves: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     PaidHolidays: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     UnpaidHolidays: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     WeeklyOffs: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     TotalDays: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     MAYear: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     MAMonth: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     Presenty: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     Absences: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     TotalSalariedDays: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

// Middleware for parsing JSON
router.use(bodyParser.json());

// Model synchronization

sequelize
  .authenticate()
  .then(() => {
    console.log(`Connection has been established successfully.`);
  })
  .catch((err) => {
    console.error(`Unable to connect to the database:`, err);
  });

TMonthlyAttendance.sync()
  .then(() => {
    console.log(` MOnthly Attendance model synchronized successfully.`);
  })
  .catch((error) => {
    console.error(`Error synchronizing MOnthly Attendance model:`, error);
  });

router.get(`/FnShowAllData`, authToken, async (req, res) => {
  try {
    const Record = await TMonthlyAttendance.findAll({
      order: [[`MAttendanceId`, `ASC`]],
    });
    res.json(Record);
  } catch (error) {
    console.error(`Error retrieving data:`, error);
    res.status(500).send(`Internal Server Error`);
  }
});

router.get(`/FnShowMonthlyData`, authToken, async (req, res) => {
  const month = req.query.MAMonth;
  const year = req.query.MAYear;
  try {
    const Record = await TMonthlyAttendance.findAll({
      where: {
        MAMonth: month,
        MAYear: year, // Adding condition for the year
      },
      order: [[`MAttendanceId`, `ASC`]],
    });
    res.json(Record);
  } catch (error) {
    console.error(`Error retrieving data:`, error);
    res.status(500).send(`Internal Server Error`);
  }
});

router.get(`/FnShowParticularData`, authToken, async (req, res) => {
  const MAttendanceId = req.query.MAttendanceId;
  try {
    const Record = await TMonthlyAttendance.findOne({
      where: {
        MAttendanceId: MAttendanceId,
      },
      order: [[`MAttendanceId`, `ASC`]],
    });
    res.json(Record);
  } catch (error) {
    console.error(`Error retrieving data:`, error);
    res.status(500).send(`Internal Server Error`);
  }
});

//showing pending entries
router.get(`/FnShowEmployeeData`, authToken, async (req, res) => {
  const empID = req.query.EmployeeId;
  try {
    const approvedRecords = await TMonthlyAttendance.findAll({
      where: {
        EmployeeId: empID,
      },
      order: [[`MAttendanceId`, `ASC`]],
    });
    res.json(approvedRecords);
  } catch (error) {
    console.error(`Error retrieving approved data:`, error);
    res.status(500).send(`Internal Server Error`);
  }
});

// Middleware for generating Id

const generateMAttendanceId = async (req, res, next) => {
  try {
    const totalRecords = await TMonthlyAttendance.count();

    req.body.forEach((item, index) => {
      const newId = (totalRecords + index + 1).toString().padStart(5, `0`);
      item.MAttendanceId = newId;
    });

    next();
  } catch (error) {
    console.error(`Error generating Leave Balance Id`, error);
    res.status(500).send(`Internal Server Error`);
  }
};



router.post(
  `/FnAddUpdateDeleteRecord`,
  generateMAttendanceId,
  authToken,
  async (req, res) => {
    const MonthlyAttendance = req.body;

    try {
      if (Array.isArray(MonthlyAttendance)) {
        // Handle multiple inserts
        const results = await Promise.all(
          MonthlyAttendance.map(async (item) => {
            return TMonthlyAttendance.upsert(item, {
              where: { MAttendanceId: item.MAttendanceId },
              returning: true,
            });
          })
        );

        res.json({
          message: results ? `Operations successful` : `Operations failed`,
        });
      } else {
        // Handle single insert or update
        const MAttendanceId = MonthlyAttendance.MAttendanceId;

        if (MonthlyAttendance.IUFlag === `D`) {
          // `Soft-delete` operation
          const result = await TMonthlyAttendance.update(
            { AcFlag: `N` },
            { where: { MAttendanceId: MAttendanceId } }
          );

          res.json({
            message: result[0]
              ? `Record Deleted Successfully`
              : `Record Not Found`,
          });
        } else {
          // Add or update operation
          const result = await TMonthlyAttendance.upsert(MonthlyAttendance, {
            where: { MAttendanceId: MAttendanceId },
            returning: true,
          });

          res.json({
            message: result ? `Operation successful` : `Operation failed`,
          });
        }
      }
    } catch (error) {
      console.error(`Error performing operation:`, error);
      res.status(500).send(`Internal Server Error`);
    }
  }
);



process.on(`SIGINT`, () => {
  console.log(`Received SIGINT. Closing Sequelize connection...`);
  sequelize.close().then(() => {
    console.log(`Sequelize connection closed. Exiting...`);
    process.exit(0);
  });
});

module.exports = router;
