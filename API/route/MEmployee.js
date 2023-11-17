const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

const router = express.Router();
const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

// Configure Sequelize with database connection details
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
  

const MEmployee = sequelize.define('MEmployee', {
    CompanyId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '00001',
      primaryKey: true,
    },
    BranchId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '00001',
      primaryKey: true,
    },
    EmployeeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    EmployeeTypeId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '001',
    },
    EmployeeName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    EmployeeTypeGroupId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Salutation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    MiddleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    MEmployeeName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AadharCardNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PANNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PassportNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PassportIssueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    PassportExpireDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    CurrentAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CurrentPincode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PermanentAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PermanentPincode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DOB: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    EmailId1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    EmailId2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PhoneNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CellNo1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CellNo2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    BankId1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AccountNo1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    IFSCCode1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    BankId2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AccountNo2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    IFSCCode2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    MaritalStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ReferenceId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DestinationId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ReligionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CategoryId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CasteId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    EmployeePhoto: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    Gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    BloodGroup: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DrivingLicence: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    FinanceAccountNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Remark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AcFlag: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Y',
    },
    IUFlag: {
        type: DataTypes.STRING,
      },
    CreatedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CreatedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ModifiedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ModifiedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'MEmployee',
    timestamps: false,
  });
  
  // Middleware for parsing JSON
  router.use(bodyParser.json());
  
  // Model synchronization
  sequelize.sync().then(() => {
    console.log('Models synced');
  });


router.get('/FnShowAllData', authToken, async (req, res) => {
  try {
    const employees = await MEmployee.findAll({
      attributes: {
        // Your attribute configuration here
      },
      order: [['EmployeeId', 'ASC']],
    });
    res.json(employees);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET endpoint to retrieve active companies
router.get('/FnShowActiveData', authToken, async (req, res) => {
    try {
      const employees = await MEmployee.findAll({
        where: {
          AcFlag: 'Y',
        },
        attributes: {
          exclude: ['IUFlag'],
        },
        order: [['EmployeeId', 'ASC']],
      });
      res.json(employees);
    } catch (error) {
      console.error('Error retrieving data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

router.get('/FnShowPerticularData', authToken, async (req, res) => {
  const employeeId = req.query.value;
  try {
    const employees = await MEmployee.findOne({
      where: {
        EmployeeId: employeeId,
      },
      attributes: {
        exclude: ['IUFlag'],
      },
      order: [['EmployeeId', 'ASC']],
    });
    res.json(employees);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Add other routes similarly...

router.post('/FnAddUpdateDeleteRecord', authToken, async (req, res) => {
  const employee = req.body;
  try {
    if (employee.IUFlag === 'D') {
      // "Soft-delete" operation
      const result = await MEmployee.update(
        { AcFlag: 'N' },
        { where: { EmployeeId: employee.EmployeeId } }
      );

      res.json({ message: result[0] ? 'Record Deleted Successfully' : 'Record Not Found' });
    } else {
      // Add or update operation
      const result = await MEmployee.upsert(employee, {
        returning: true,
      });

      res.json({ message: result ? 'Operation successful' : 'Operation failed' });
    }
  } catch (error) {
    console.error('Error performing operation:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
