const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const upload = require("../middleware/uploads");

const {
    getCustomers,
    getCustomer,
    register,
    login,
    uploadImage,
    updateCustomer
} = require("../controllers/customer");

// Routes
router.post("/register", upload.single("profilePicture"), register);
router.post("/login", login);

// Restrict these routes to logged-in users
router.get("/getAllCustomers", protect, authorize("admin"), getCustomers);
router.get("/getCustomer/:id", protect, authorize("admin", "customer"), getCustomer);
router.put("/updateCustomer/:id", protect, authorize("admin", "customer"), upload.single("profilePicture"), updateCustomer);
router.post("/uploadImage", protect, authorize("admin", "customer"), upload.single("profilePicture"), uploadImage);
router.post("/address", customerController.addAddress);
router.get("/addresses/:userId", customerController.getAddresses);
router.put("/address", customerController.updateAddress);
router.delete("/address", customerController.deleteAddress);

module.exports = router;