const express = require("express");
const { Router } = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const ProdController = require("../controllers/prods")
const multer = require("multer");

router.post("", checkAuth,ProdController.createProd);

router.put("/:id", checkAuth,ProdController.updateProd);

router.get("", ProdController.getProds);

router.get("/:id", ProdController.getProd);

router.delete("/:id", checkAuth,ProdController.deleteProd);

module.exports = router;
