import { ApiError } from "../errors/apiError";
import { IUser, IUserDto } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<any[]> {
    return await userRepository.getList();
  }
  public async create(dto: IUserDto): Promise<IUser> {
    if (!dto.name || dto.name.length < 3) {
      throw new ApiError("Name is required and should be longer", 400);
    }
    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError("Email is required", 400);
    }
    if (!dto.password || dto.password.length < 5) {
      throw new ApiError("Password is required", 400);
    }
    return await userRepository.create(dto);
  }
  public async getUserById(userId: number): Promise<any> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }
  public async updateUser(userId: number, dto: IUserDto): Promise<any> {
    if (!dto.name || dto.name.length < 3) {
      throw new ApiError("Name is required and should be longer", 400);
    }
    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError("Email is required", 400);
    }
    if (!dto.password || dto.password.length < 5) {
      throw new ApiError("Password is required", 400);
    }
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return await userRepository.updateUser(userId, dto);
  }
  public async deleteUser(userId: number): Promise<any> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    await userRepository.deleteUser(userId);
  }
}

export const userService = new UserService();
