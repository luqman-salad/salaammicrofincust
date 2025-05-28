const express = require("express");
const router = express.Router();
const {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  getCustomerById,
  deleteCustomer,
} = require("../controllers/customerControllers");

router.get("/", getAllCustomers);
router.post("/", createCustomer);
router.get("/:id", getCustomerById); // <== Add this route
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;
