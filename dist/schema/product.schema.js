"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yup_1 = require("yup");
var product = {
    body: (0, yup_1.object)({
        name: (0, yup_1.string)().required("name is required"),
        price: number().rquired("price is required")
    }),
};
