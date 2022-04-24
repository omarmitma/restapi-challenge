"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    pago: Number,
    products: [
        {
            cant: Number,
            _id: String
        }
    ]
});
exports.default = (0, mongoose_1.model)('Sales', schema);
