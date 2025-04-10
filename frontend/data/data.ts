import { ISidebar } from "../interfaces/uiInterfaces";

import DashboardIcon from "../assets/icons/dashboard.svg";
import ProjectsIcon from "../assets/icons/projects.svg";
import TasksIcon from "../assets/icons/tasks.svg";
import SettingsIcon from "../assets/icons/settings.svg";

// add paths
export const sidebarData: ISidebar[] = [
  { id: 1, title: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
  { id: 2, title: "Projects", icon: ProjectsIcon, path: "/dashboard/projects" },
  { id: 3, title: "Tasks", icon: TasksIcon, path: "/dashboard/tasks" },
  { id: 4, title: "Settings", icon: SettingsIcon, path: "/dashboard/settings" },
  // Add more items as needed
];
