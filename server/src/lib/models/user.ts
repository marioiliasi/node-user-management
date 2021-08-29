export enum UserRole {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}
export interface User {
  _id: string,
  email: string,
  firstName: string,
  lastName: string,
  passwordEncrypted: string,
  role: UserRole,
  deleted?: boolean,
  createdAt: Date;
  createdUser: string;
  updatedAt?: Date;
  updatedUser?: string;
  deletedAt?: Date;
  deletedUser?: string;
}
