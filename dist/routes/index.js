"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const product_controller_1 = require("../controllers/product.controller");
const sales_controller_1 = require("../controllers/sales.controller");
const multer_1 = __importDefault(require("../libs/multer"));
router.route('/product')
    .get(product_controller_1.getProducts)
    .post(multer_1.default.single('image'), product_controller_1.createProduct);
router.route('/product/:id')
    .get(product_controller_1.getProduct)
    .delete(product_controller_1.deleteProduct)
    .put(product_controller_1.updateProduct);
router.route('/sale')
    .get(sales_controller_1.getSales)
    .post(sales_controller_1.createSales);
router.route('/sale/:id')
    .get(sales_controller_1.getSale)
    .delete(sales_controller_1.deleteSales);
exports.default = router;
