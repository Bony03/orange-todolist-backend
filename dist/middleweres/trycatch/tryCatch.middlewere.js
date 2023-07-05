"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tryCatch(controller) {
    return async (req, res, next) => {
        try {
            await controller(req, res);
        }
        catch (err) {
            next(err);
        }
    };
}
exports.default = tryCatch;
//# sourceMappingURL=tryCatch.middlewere.js.map