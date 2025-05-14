import { StaticImageData } from "next/image";
import { IUser } from "./authInterfaces";

export interface ISidebar {
  id: number;
  title: string;
  icon: StaticImageData;
  path: string;
}

export interface IProject {
  _id?: string;
  title: string;
  description: string;
  status: string;
  owner: IUser;
  dueDate: string;
  members: IUser[];
  tasks: ITasks[];
}

export interface ITasks {
  _id?: string;
  title: string;
  description: string;
  status: string;
  assignTo: IUser;
  dueDate: string;
  listOf: string;
  project: IProject;
}
