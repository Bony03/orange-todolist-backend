"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRepository = exports.userRepository = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Todo_1 = require("../entities/Todo");
const AppDataSource = new typeorm_1.DataSource({
    type: "mongodb",
    url: process.env.MONGO_HOST,
    entities: [User_1.Users, Todo_1.Todo],
    migrations: ["dist/migrations/**/*.{ts,js}"],
    subscribers: ["src/subscriber/**/*.ts"],
    synchronize: true,
    logging: false,
});
AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
exports.userRepository = AppDataSource.getMongoRepository(User_1.Users);
exports.todosRepository = AppDataSource.getMongoRepository(Todo_1.Todo);
//# sourceMappingURL=data.source.js.map