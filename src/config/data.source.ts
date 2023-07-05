/* eslint-disable no-console */

import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "../entities/User";
import { Todo } from "../entities/Todo";

const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.MONGO_HOST,
  entities: [Users, Todo],
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

export const userRepository = AppDataSource.getMongoRepository(Users);
export const todosRepository = AppDataSource.getMongoRepository(Todo);
