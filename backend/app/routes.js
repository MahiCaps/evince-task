import { Router } from "express";
import employeeRoutes from "./routes/employee";

const router = Router();

router.use("/employee", employeeRoutes);

module.exports = router;
