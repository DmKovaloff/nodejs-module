export interface IUser {
  _id: string;
  name: string;
  email: string;
  age: number;
  password: string;
  role: number;
  phone?: string;
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IUserCreateDto = Pick<
  IUser,
  "name" | "email" | "password" | "phone"
>;

export type IUserUpdateDto = Pick<IUser, "name" | "age" | "phone">;
