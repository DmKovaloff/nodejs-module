import { IUser, IUserDto } from "../interfaces/user.interface";
import { read, write } from "../services/fs.service";

class UserRepository {
  public async getList(): Promise<any[]> {
    return await read();
  }

  public async create(dto: Partial<IUser>): Promise<any> {
    const users = await read();
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
    users.push(newUser);
    await write(users);
    return newUser;
  }

  public async getById(userId: number): Promise<IUser> {
    const user = await read();
    return user.find((user) => user.id === userId);
  }

  public async updateUser(userId: number, dto: IUserDto): Promise<IUser> {
    const users = await read();
    const index = users.findIndex((user) => user.id === Number(userId));
    const user = users[index];
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;
    await write(users);
    return user;
  }

  public async deleteUser(userId: number): Promise<void> {
    const users = await read();
    const index = users.findIndex((user) => user.id === Number(userId));
    users.splice(index, 1);
    await write(users);
  }
}

export const userRepository = new UserRepository();
