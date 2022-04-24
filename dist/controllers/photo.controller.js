"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const productos_1 = __importDefault(require("../models/productos"));
async function getProducts(req, res) {
    const products = await productos_1.default.find();
    return res.json(products);
}
exports.getProducts = getProducts;
async function getProduct(req, res) {
    const product = await productos_1.default.findById(req.params.id);
    return res.json(product);
}
exports.getProduct = getProduct;
async function createProduct(req, res) {
    var _a;
    const { name, cantidad, precio, categoria } = req.body;
    const newProduct = {
        name: name,
        cantidad: cantidad,
        precio: precio,
        categoria: categoria,
        imagePath: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path
    };
    const product = new productos_1.default(newProduct);
    await product.save();
    return res.json({
        message: 'Product succesfully saved',
        product
    });
}
exports.createProduct = createProduct;
async function deleteProduct(req, res) {
    const product = await productos_1.default.findByIdAndRemove(req.params.id);
    if (product) {
        await fs_extra_1.default.unlink(path_1.default.resolve(product.imagePath));
    }
    return res.json({
        message: 'Product deleted',
        product
    });
}
exports.deleteProduct = deleteProduct;
async function updateProduct(req, res) {
    const { name, cantidad, precio, categoria } = req.body;
    const product = await productos_1.default.findByIdAndUpdate(req.params.id, {
        name,
        cantidad,
        precio,
        categoria
    }, { new: true });
    return res.json({
        message: 'Successfully updated',
        product
    });
}
exports.updateProduct = updateProduct;
