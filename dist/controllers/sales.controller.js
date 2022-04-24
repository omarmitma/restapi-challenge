"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSales = exports.createSales = exports.getSale = exports.getSales = void 0;
const sales_1 = __importDefault(require("../models/sales"));
const productos_1 = __importDefault(require("../models/productos"));
async function getSales(req, res) {
    const sales = await sales_1.default.find();
    return res.json(sales);
}
exports.getSales = getSales;
async function getSale(req, res) {
    const sale = await sales_1.default.findById(req.params.id);
    return res.json(sale);
}
exports.getSale = getSale;
async function createSales(req, res) {
    const { pago, products } = req.body;
    const newSale = {
        pago: pago,
        products: products,
    };
    const sale = new sales_1.default(newSale);
    await sale.save();
    products.forEach(async (orden) => {
        console.log(orden);
        const items_a_procesar = await productos_1.default.findById(orden._id);
        await productos_1.default.findByIdAndUpdate(orden._id, {
            cantidad: items_a_procesar.cantidad - orden.cant
        });
    });
    return res.json({
        message: 'Sale succesfully saved',
        sale
    });
}
exports.createSales = createSales;
async function deleteSales(req, res) {
    console.log(req.params.id);
    const Sale = await sales_1.default.findByIdAndRemove(req.params.id);
    return res.json({
        message: 'Sale deleted',
        Sale
    });
}
exports.deleteSales = deleteSales;
