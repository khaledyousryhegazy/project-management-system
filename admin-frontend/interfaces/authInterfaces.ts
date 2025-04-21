export interface IUser {
  _id?: string;
  username: string;
  email: string;
  role: string;
  avatar: string;
}

export interface IRegisterData {
  username: string;
  email: string;
  password: string;
  role?: string;
  avatar?: string;
}

export interface ILoginData {
  email: string;
  password: string;
}
