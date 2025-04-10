import { StaticImageData } from "next/image";

export interface ISidebar {
  id: number;
  title: string;
  icon: StaticImageData;
  path: string;
}
