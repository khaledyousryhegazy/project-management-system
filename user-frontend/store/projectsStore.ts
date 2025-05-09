import { create } from "zustand";
import { IProject } from "@/interfaces/uiInterfaces";
import {
  addTaskToProject,
  getProjectByMember,
  removeTaskFromProject,
} from "@/services/projectsServices";

type State = {
  loading: boolean;
};

type Action = {
  getUserProjects: (memberId: string) => Promise<{
    success: boolean;
    error: string | null;
    projects: IProject[];
  }>;

  addTaskToProject: ({
    projectId,
    taskId,
  }: {
    projectId: string;
    taskId: string;
  }) => Promise<{ success: boolean; error: string | null }>;

  removeTaskFromProject: ({
    projectId,
    taskId,
  }: {
    projectId: string;
    taskId: string;
  }) => Promise<{ success: boolean; error: string | null }>;
};

export const projectsStore = create<State & Action>((set) => ({
  loading: false,

  getUserProjects: async (memberId) => {
    set({ loading: true });
    try {
      const res = await getProjectByMember(memberId);

      if (!res) {
        set({ loading: false });
        return {
          success: false,
          error: "Error fetching projects",
          projects: [],
        };
      }

      set({ loading: false });
      return { success: true, error: null, projects: res.data };
    } catch (error) {
      console.log("🚀 ~ getUserProjects ~ error: in zustand store", error);
      set({ loading: false });
      return {
        success: false,
        error: "Error fetching projects",
        projects: [],
      };
    }
  },

  addTaskToProject: async ({ projectId, taskId }) => {
    set({ loading: true });

    const res = await addTaskToProject({ projectId, taskId });

    if (!res) {
      set({ loading: false });
      return { success: false, error: "Error adding task to project" };
    }

    set({ loading: false });
    return { success: true, error: null };
  },

  removeTaskFromProject: async ({ projectId, taskId }) => {
    set({ loading: true });

    const res = await removeTaskFromProject({ projectId, taskId });

    if (!res) {
      set({ loading: false });
      return { success: false, error: "Error removing task from project" };
    }

    set({ loading: false });
    return { success: true, error: null };
  },
}));
