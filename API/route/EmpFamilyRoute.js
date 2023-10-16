const express = require("express");
const router = express.Router();
const EmpFamily = require("../model/EmpFamilyModel");

router.get("/get", async (req, res) => {
  try {
    const EmpFamilys = await EmpFamily.findAll();
    res.status(200).json(EmpFamilys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get/:id", async (req, res) => {
  const EmpFamilyId = req.params.id;

  try {
    const EmpFamilyInstance = await EmpFamily.findByPk(EmpFamilyId);

    if (!EmpFamilyInstance) {
      return res.status(404).json({ message: "EmpFamily not found" });
    }

    res.status(200).json(EmpFamilyInstance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST
router.post("/add", async (req, res) => {
  try {
    const EmpFamilyData = req.body;
    const createdEmpFamily = await EmpFamily.create(EmpFamilyData);
    res.status(201).json(createdEmpFamily);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PATCH by ID
router.patch("/update/:id", async (req, res) => {
  const EmpFamilyId = req.params.id;

  try {
    const [updated] = await EmpFamily.update(req.body, {
      where: { id: EmpFamilyId },
    });

    if (updated === 0) {
      return res.status(404).json({ message: "EmpFamily not found" });
    }

    const updatedEmpFamily = await EmpFamily.findByPk(EmpFamilyId);
    res.status(200).json(updatedEmpFamily);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE by ID
router.delete("/delete/:id", async (req, res) => {
  const EmpFamilyId = req.params.id;

  try {
    const EmpFamilyInstance = await EmpFamily.findByPk(EmpFamilyId);

    if (!EmpFamilyInstance) {
      return res.status(404).json({ message: "EmpFamily not found" });
    }

    await EmpFamilyInstance.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
