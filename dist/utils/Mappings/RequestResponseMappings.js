"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    sendSuccessMessage: (body = {}, message = "Action Performed Successfully", status = 200, res) => {
        return res.send({ body, message, status });
    },
    sendErrorMessage: () => {
    }
};
