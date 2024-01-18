import { Router } from "express";
import schemaValidator from "../middlewares/schemaValidator.middleware";

import userValidation from "../validation/employee.validation";
import employeeController from "../controller/user/employee.controller";

const router = Router();
const EmployeeController = new employeeController();
const validationRequest = schemaValidator(userValidation);
router.get("/", (req, res) => EmployeeController.getEmployees(req, res));
router.post("/", validationRequest, (req, res) =>
  EmployeeController.addEmployee(req, res)
);
router.put("/:id", validationRequest, (req, res) =>
  EmployeeController.updateEmployee(req, res)
);

router.delete("/:id", (req, res) =>
  EmployeeController.deleteEmployee(req, res)
);
router.get("/:id", (req, res) => EmployeeController.getEmployee(req, res));

export default router;
