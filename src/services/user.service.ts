import { Users } from '../entities/User';
import { userRepository } from '../config/data.source';

export default class UsersService {
  async getUserByEmail(email: string) {
    const data = await userRepository.findOne({ where: { email } });
    return data;
  }

  async getUserById(id: string) {
    const data = await userRepository.findOne({ where: { id } });
    return data;
  }

  async getUserByAct(activation: string) {
    const data = await userRepository.findOne({ where: { activation } });
    return data;
  }

  async createUser(userData: Users) {
    const data = await userRepository.save(userData);
    return data;
  }

  async updateUser(userData: Users) {
    const data = await userRepository.save(userData);
    return data;
  }
}

export const userService = new UsersService();
