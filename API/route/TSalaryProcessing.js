const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Op } = require("sequelize");
const moment = require("moment");
const MEmployee = require('../model/MEmployeeModels')
const MEmployeeWorkProfile = require('../model/MEmployeeWorkProfileModels')
const MEmployeeSalary = require('../model/MEmployeeSalaryModels')
const TMonthlyAttendance = require('../model/TMonthlyAttendanceModels')
const MEmployeewiseEarning = require('../model/MEmployeewiseEarningModels')
const MEmployeewiseDeduction = require('../model/MEmployeewiseDeductionModels')
const TMonthlyEmployeeEarningUpload = require('../model/TMonthlyEarningImportModels')
const TMonthlyEmployeeDeductionUpload = require('../model/TMonthlyDeductionImportModels')

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
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
    dialect: "mysql",
    port: process.env.DB_PORT,
  }
);

const TSalaryProcessing = sequelize.define('TSalaryProcessing', {
    CompanyId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: '00001',
      primaryKey:true
    },
    BranchId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: '00001',
      primaryKey:true
    },
    FYear: {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    ProcessId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey:true
    },
    ProcessDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    EmployeeId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey:true
    },
    EmployeeTypeId: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    EmpType: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    DeptId: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    AMonth: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    AYear: {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    Salary: {
      type: DataTypes.DECIMAL(17, 2),
      allowNull: true
    },
    PerDaySalary: {
      type: DataTypes.DECIMAL(17, 2),
      allowNull: true
    },
    Presenty: {
      type: DataTypes.DECIMAL(17, 2),
      allowNull: true
    },
    MonthlySalary: {
      type: DataTypes.DECIMAL(17, 2),
      allowNull: true
    },
    GrossSalary: {
      type: DataTypes.DECIMAL(17, 2),
      allowNull: true
    },
    TotalEarning: {
      type: DataTypes.DECIMAL(17, 2),
      allowNull: true
    },
    TotalDeduction: {
      type: DataTypes.DECIMAL(17, 2),
      allowNull: true
    },
    NetSalary: {
      type: DataTypes.DECIMAL(17, 2),
      allowNull: true
    },
    BankSalary: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    CashSalary: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'Y'
    },
    Remark: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
})

sequelize
  .sync()
  .then(() => {
    console.log("TSalaryProcessing model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing TSalaryProcessing model:", error);
  });

try {
    TSalaryProcessing.sync()
} catch (error) {
    
}


router.get("/FnshowActiveData", authToken, async (req, res) => {
    try {
      const Shift = await TSalaryProcessing.findAll({
        where: {
          AcFlag: "Y",
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["ProcessId", "ASC"]],
      });
      res.json(Shift);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/FnShowParticularData", authToken, async (req, res) => {
    const ProcessId = req.query.ProcessId;
    try {
      const Shift = await TSalaryProcessing.findOne({
        where: {
          ProcessId: ProcessId,
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["ProcessId", "ASC"]],
      });
      res.json(Shift);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/FnShowParticularEmployeeData", authToken, async (req, res) => {
    const EmployeeId = req.query.EmployeeId;
    try {
      const Shift = await TSalaryProcessing.findAll({
        where: {
          EmployeeId: EmployeeId,
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["ProcessId", "DESC"]],
      });
      res.json(Shift);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/month-wise-salary", authToken, async (req, res) => {
    const AMonth = req.query.AMonth;
    const AYear = req.query.AYear

    try {
        const monthWiseData = await TSalaryProcessing.findAll({
            where: {
                AMonth,
                AYear,
            },
            attributes: {
                exclude: ["IUFlag"],
            },
            order: [["ProcessId", "ASC"]],
        });
        res.json(monthWiseData);
    } catch (error) {
        console.error("Error retrieving month-wise data:", error);
        res.status(500).send("Internal Server Error");
    }
});


  router.post("/SalaryProcessing", authToken, async (req, res) => {
    try {
        // Extract input parameters from request body
        const { ProcessDate, AMonth, AYear, FYear } = req.body;

        // Fetch all employees from MEmployee
        const employees = await MEmployee.findAll({
            attributes: ['EmployeeId', 'EmployeeName','EmployeeTypeId'],
        });

        // Fetch departments of employees from MEmployeeWorkProfile
        const employeeDepartments = await MEmployeeWorkProfile.findAll({
            attributes: ['EmployeeId', 'DeptId'],
        });

        // Fetch GrossSalary of employees from MEmployeeSalary
        const employeeSalaries = await MEmployeeSalary.findAll({
            attributes: ['EmployeeId', 'GrossSalary'],
        });

        // Calculate PerDaySalary
        const daysInMonth = moment(`${AYear}-${AMonth}`, 'YYYY-MM').daysInMonth();
        const perDaySalaries = employeeSalaries.map(empSalary => {
            return {
                EmployeeId: empSalary.EmployeeId,
                PerDaySalary: empSalary.GrossSalary / daysInMonth
            };
        });

        console.log('Per Day Salaries', perDaySalaries)

        // Fetch TotalSalariedDays from TMonthlyAttendance
        const totalSalariedDays = await TMonthlyAttendance.findAll({
            where: {
                MAMonth: AMonth,
                MAYear: AYear
            },
            attributes: ['EmployeeId', [sequelize.fn('sum', sequelize.literal('TotalSalariedDays')), 'SalariedDays']],
            group: ['EmployeeId']
        });

        console.log('Total Salaried Days', totalSalariedDays)

        const MonthlyEarningUpload = await TMonthlyEmployeeEarningUpload.findAll({
          where: {
            AMonth: AMonth,
            AYear: AYear
          },
          attributes: ['EmployeeId', [sequelize.fn('sum', sequelize.col('Amount')), 'Amount']],
          group: ['EmployeeId']
        })
        console.log('Monthly Earning Upload', MonthlyEarningUpload)

        // Calculate MonthlySalary and TotalEarning
        const monthlySalaries = perDaySalaries.map(perDaySalary => {
          const totalSalariedDaysForEmployee = totalSalariedDays.map(item => item.dataValues).find(record => record.EmployeeId === perDaySalary.EmployeeId);
          console.log('Total Salaried Days for Employee', perDaySalary.EmployeeId, totalSalariedDaysForEmployee); // Add this log statement     
          const MonthlySalary = (perDaySalary.PerDaySalary * totalSalariedDaysForEmployee.SalariedDays);
          console.log('Monthly Salary', perDaySalary.EmployeeId,'x', totalSalariedDaysForEmployee.SalariedDays,'=' ,MonthlySalary); // Add this log statement
          
          // Check if there is a monthly earning upload record for the employee
          const monthlyEarningAmount = MonthlyEarningUpload.map(item => item.dataValues).find(record => record.EmployeeId === perDaySalary.EmployeeId)?.Amount || 0;
          
          // Calculate total earning including monthly salary and monthly earning upload
          const TotalEarning = (+MonthlySalary) + (+monthlyEarningAmount);
          console.log(`Total Earning Calculation for ${perDaySalary.EmployeeId} :  `, MonthlySalary, '+', monthlyEarningAmount, '=', monthlyEarningAmount)
      
          return {
              EmployeeId: perDaySalary.EmployeeId,
              MonthlySalary,
              TotalEarning
          };
      });
      
    
        // Fetch TotalDeduction from MEmployeewiseDeduction and calculate NetSalary
        const employeeTotalDeductions = await MEmployeewiseDeduction.findAll({
            attributes: ['EmployeeId', [sequelize.fn('sum', sequelize.col('DCalculationValue')), 'TotalDeduction']],
            group: ['EmployeeId']
        });
        console.log('Total Deductions', employeeTotalDeductions)

        const salaryProcessingResults = monthlySalaries.map(salary => {
            const totalDeductionForEmployee = employeeTotalDeductions.map(item => item.dataValues).find(record => record.EmployeeId === salary.EmployeeId);
            const NetSalary = salary.MonthlySalary - (totalDeductionForEmployee ? totalDeductionForEmployee.TotalDeduction : 0);
            const SalaryObject = {
                EmployeeId: salary.EmployeeId,
                AMonth: AMonth,
                AYear: AYear,
                FYear: FYear,
                ProcessDate: ProcessDate,
                EmployeeName: employees.find(emp => emp.EmployeeId === salary.EmployeeId).EmployeeName,
                EmployeeTypeId: employees.find(emp => emp.EmployeeId === salary.EmployeeId).EmployeeTypeId,
                DeptId: employeeDepartments.find(empDept => empDept.EmployeeId === salary.EmployeeId).DeptId,
                Presenty: totalSalariedDays.map(item => item.dataValues).find(record => record.EmployeeId === salary.EmployeeId).SalariedDays,
                GrossSalary: employeeSalaries.find(empSalary => empSalary.EmployeeId === salary.EmployeeId).GrossSalary,
                PerDaySalary: perDaySalaries.find(perDay => perDay.EmployeeId === salary.EmployeeId).PerDaySalary,
                MonthlySalary: salary.MonthlySalary,
                TotalEarning: salary.TotalEarning,
                TotalDeduction: totalDeductionForEmployee ? totalDeductionForEmployee.TotalDeduction : 0,
                NetSalary: NetSalary
            }

            return SalaryObject
        });

        async function addSalariesToDatabase(salaryProcessingResults) {
          try {
              const createdSalaries = await TSalaryProcessing.bulkCreate(salaryProcessingResults);
              console.log('Salaries added to the database successfully.');
              return createdSalaries; // Optional: Return the created salaries
          } catch (error) {
              console.error('Error adding salaries to the database:', error);
              throw error; // Optional: Rethrow the error to handle it at a higher level
          }
      }

      try {
        addSalariesToDatabase(salaryProcessingResults)
      } catch (error) {
        console.error('Error Adding Salary',error);
      }

        res.json(salaryProcessingResults);
    } catch (error) {
        console.error("Error processing salary:", error);
        res.status(500).send("Internal Server Error");
    }
});

  module.exports = router