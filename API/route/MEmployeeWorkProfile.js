const express = require(`express`);
const bodyParser = require(`body-parser`);
const { Sequelize, DataTypes } = require(`sequelize`);
const jwt = require(`jsonwebtoken`);
const router = express.Router();
const CompanyConfig = require(`./CompanyConfigModels`);
const MEmployeeType = require(`../model/MEmployeeTypeModels`);
const MEmployeeWorkProfile = require(`../model/MEmployeeWorkProfileModels`)
 
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

// const MEmployeeWorkProfile = sequelize.define(
//   `MEmployeeWorkProfile`,
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
//     EmployeeId: {
//       type: DataTypes.STRING(5),
//       allowNull: false,
//       primaryKey: true,
//     },
//     DOJ: { type: DataTypes.DATEONLY, allowNull: true },
//     DOL: { type: DataTypes.DATEONLY, allowNull: true },
//     ContractorId: {
//       type: DataTypes.STRING(50),
//       allowNull: true,
//       defaultValue: null,
//     },
//     ContractorStartDate: {
//       type: DataTypes.DATEONLY,
//       allowNull: true,
//       defaultValue: null,
//     },
//     ContractorEndDate: {
//       type: DataTypes.DATEONLY,
//       allowNull: true,
//       defaultValue: null,
//     },
//     DeptGroupId: {
//       type: DataTypes.STRING(50),
//       allowNull: true,
//       defaultValue: null,
//     },
//     DeptId: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null },
//     SubDeptId: {
//       type: DataTypes.STRING(50),
//       allowNull: true,
//       defaultValue: null,
//     },
//     DesgId: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null },
//     ReportingTo: {
//       type: DataTypes.STRING(5),
//       allowNull: true,
//     },
//     WeeklyOff: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       defaultValue: null,
//     },
//     ShiftId: {
//       type: DataTypes.STRING(50),
//       allowNull: true,
//       defaultValue: null,
//     },
//     BandId: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null },
//     ZoneId: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null },
//     GradeId: {
//       type: DataTypes.STRING(50),
//       allowNull: true,
//       defaultValue: null,
//     },
//     CostCenterId: {
//       type: DataTypes.STRING(50),
//       allowNull: true,
//       defaultValue: null,
//     },
//     BondApplicable: {
//       type: DataTypes.STRING(1),
//       allowNull: true,
//       defaultValue: `N`,
//     },
//     BondAttachment: { type: DataTypes.STRING(500), allowNull: true },
//     CurrentJob: { type: DataTypes.STRING(500), allowNull: true },
//     Remark: { type: DataTypes.STRING(100), allowNull: true },
//     AcFlag: { type: DataTypes.STRING(1), allowNull: true, defaultValue: `Y` },
//     CreatedBy: { type: DataTypes.STRING(50), allowNull: true },
//     CreatedOn: { type: DataTypes.STRING(50), allowNull: true },
//     ModifiedBy: { type: DataTypes.STRING(50), allowNull: true },
//     ModifiedOn: { type: DataTypes.STRING(50), allowNull: true },
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

sequelize.sync();

router.get(`/FnShowAllData`, authToken, async (req, res) => {
  try {
    const employees = await MEmployeeWorkProfile.findAll({
      attributes: {
        // Your attribute configuration here
      },
      order: [[`EmployeeId`, `ASC`]],
    });
    res.json(employees);
  } catch (error) {
    console.error(`Error retrieving data:`, error);
    res.status(500).send(`Internal Server Error`);
  }
});

// GET endpoint to retrieve active companies
router.get(`/FnShowActiveData`, authToken, async (req, res) => {
  try {
    const employees = await MEmployeeWorkProfile.findAll({
      where: {
        AcFlag: `Y`,
      }, 
      attributes: {
        exclude: [`IUFlag`],
      },
      order: [[`EmployeeId`, `ASC`]],
    });
    res.json(employees);
  } catch (error) {
    console.error(`Error retrieving data:`, error);
    res.status(500).send(`Internal Server Error`);
  }
});

router.get(`/FnShowParticularData`, authToken, async (req, res) => {
  const employeeId = req.query.EmployeeId;
  try {
    const employees = await MEmployeeWorkProfile.findOne({
      where: {
        EmployeeId: employeeId,
      },
      attributes: {
        exclude: [`IUFlag`],
      },
      order: [[`EmployeeId`, `ASC`]],
    });
    res.json(employees);
  } catch (error) {
    console.error(`Error retrieving data:`, error);
    res.status(500).send(`Internal Server Error`);
  }
});

const generateEmployeeId = async (req, res, next) => {
  try {
    if (req.body.IUFlag === `I`) {
      // Fetch the company configuration to check if empID column is `Yes` or `No`
      const config = await CompanyConfig.findAll({
        attributes: {
          exclude: [`IUFlag`],
        },
        order: [[`CCID`, `DESC`]],
      });
      // Check if config array is empty or not
      if (!config || config.length === 0) {
        throw new Error(`Company configuration not found`);
      }

      // Check if empID column is `Yes` or `No`
      if (config[0].empID === `Yes`) {
        // Fetch the EmployeeTypeId from the request body
        const employeeTypeId = req.query.EmployeeTypeId;

        // Fetch the corresponding employee type to get the ShortName
        const employeeType = await MEmployeeType.findOne({
          where: {
            EmployeeTypeId: employeeTypeId,
          },
        });
        if (!employeeType) {
          throw new Error(`Employee type not found`);
        }

        // Get the prefix from ShortName
        const prefix = employeeType.ShortName;

        // Generate EmployeeId with prefixes based on ShortName
        const totalRecords = await MEmployeeWorkProfile.count();
        const newId = (totalRecords + 1).toString().padStart(3, `0`);
        req.body.EmployeeId = prefix + newId;
      } else {
        // Generate EmployeeId without prefixes
        const totalRecords = await MEmployeeWorkProfile.count();
        const newId = (totalRecords + 1).toString().padStart(3, `0`);
        req.body.EmployeeId = newId;
      }
    }
    next();
  } catch (error) {
    console.error(`Error generating EmployeeId:`, error);
    res.status(500).send(`Internal Server Error`);
  }
};

router.post(
  `/FnAddUpdateDeleteRecord`,
  generateEmployeeId,
  authToken,
  async (req, res) => {
    const work = req.body;
    const EmployeeId = req.query.EmployeeId;
    try {
      if (work.IUFlag === `D`) {
        // `Soft-delete` operation
        const result = await MEmployeeWorkProfile.update(
          { AcFlag: `N` },
          { where: { EmployeeId: work.EmployeeId } }
        );

        res.json({
          message: result[0]
            ? `Record Deleted Successfully`
            : `Record Not Found`,
        });
      } else if (work.IUFlag === `U`) {
        // Add or update operation
        const result = await MEmployeeWorkProfile.update(work, {
          where: { EmployeeId: EmployeeId },
          returning: true,
        });

        res.json({
          message: result ? `Operation successful` : `Operation failed`,
        });
      } else {
        const result = await MEmployeeWorkProfile.create(work, {
          returning: true,
        });

        res.json({
          message: result ? `Operation successful` : `Operation failed`,
        });
      }
    } catch (error) {
      console.error(`Error performing operation:`, error);
      res.status(500).send(`Internal Server Error`);
    }
  }
);

//For monthly attendances
router.get(`/FnFetchWeeklyOff`, authToken, async (req, res) => {
  try {
    const employees = await MEmployeeWorkProfile.findAll({
      where: {
        AcFlag: `Y`,
      },
      attributes: [`EmployeeId`, `WeeklyOff`],
      order: [[`EmployeeId`, `ASC`]],
    });
    res.json(employees);
  } catch (error) {
    console.error(`Error retrieving data:`, error);
    res.status(500).send(`Internal Server Error`);
  }
});

//Getting Reporting to employee
router.get(`/FnFetchManager`, authToken, async (req, res) => {
  const EmpId = req.query.EmployeeId;
  try {
    const manager = await MEmployeeWorkProfile.findOne({
      where: {
        EmployeeId: EmpId,
      },
      attributes: [`ReportingTo`],
    });

    // Check if manager is found
    if (manager) {
      const reportingTo = manager.ReportingTo; // Access the ReportingTo property
      res.json(reportingTo); // Return only the ReportingTo value
    } else {
      res.status(404).send(`Manager not found`); // Send 404 if manager not found
    }
  } catch (error) {
    console.error(`Error retrieving data:`, error);
    res.status(500).send(`Internal Server Error`);
  }
});

module.exports = router;
