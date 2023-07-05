"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const data_source_1 = require("../config/data.source");
class UsersService {
    async getUserByEmail(email) {
        const data = await data_source_1.userRepository.findOne({ where: { email } });
        return data;
    }
    async getUserById(id) {
        const data = await data_source_1.userRepository.findOne({ where: { id } });
        return data;
    }
    async getUserByAct(activation) {
        const data = await data_source_1.userRepository.findOne({ where: { activation } });
        return data;
    }
    async createUser(userData) {
        const data = await data_source_1.userRepository.save(userData);
        return data;
    }
    async updateUser(userData) {
        const data = await data_source_1.userRepository.save(userData);
        return data;
    }
}
exports.default = UsersService;
exports.userService = new UsersService();
//# sourceMappingURL=user.service.js.map