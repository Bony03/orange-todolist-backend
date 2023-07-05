"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../../controllers/user.controller"));
const tryCatch_middlewere_1 = __importDefault(require("../../middleweres/trycatch/tryCatch.middlewere"));
const authPassport_1 = require("../../middleweres/authPassport/authPassport");
const router = (0, express_1.Router)();
router.get('/', authPassport_1.authenticate, (0, tryCatch_middlewere_1.default)(user_controller_1.default.getUserData.bind(user_controller_1.default)));
router.get('/activate/:id', (0, tryCatch_middlewere_1.default)(user_controller_1.default.activate.bind(user_controller_1.default)));
router.put('/', authPassport_1.authenticate, (0, tryCatch_middlewere_1.default)(user_controller_1.default.changePass.bind(user_controller_1.default)));
router.post('/register', (0, tryCatch_middlewere_1.default)(user_controller_1.default.register.bind(user_controller_1.default)));
router.post('/login', (0, tryCatch_middlewere_1.default)(user_controller_1.default.login.bind(user_controller_1.default)));
router.post('/request', (0, tryCatch_middlewere_1.default)(user_controller_1.default.requestPassReset.bind(user_controller_1.default)));
router.post('/restore', authPassport_1.authenticate, (0, tryCatch_middlewere_1.default)(user_controller_1.default.restorePass.bind(user_controller_1.default)));
exports.default = router;
//# sourceMappingURL=user.route.js.map