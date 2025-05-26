"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
function validate(schema, options = {}) {
    return (req, res, next) => {
        const { source = 'body', allowUnknown = false } = options;
        const { error, value } = schema.validate(req[source], {
            abortEarly: false,
            allowUnknown
        });
        if (error) {
            return res.status(400).json({
                errors: error.details.map(d => ({
                    message: d.message,
                    path: d.path
                }))
            });
        }
        req[source] = value;
        next();
    };
}
exports.validate = validate;
