"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        error: {
            message: 'Endpoint not found',
            path: req.path
        }
    });
};
exports.notFoundHandler = notFoundHandler;
