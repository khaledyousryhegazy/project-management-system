import { create } from "zustand";
import { IProject } from "@/interfaces/uiInterfaces";
import {
  addTaskToProject,
  getProjectById,
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

  getProjectById: (projectId: string) => Promise<{
    success: boolean;
    error: string | null;
    project: IProject | null;
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
      set({ loading: false });
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        projects: [],
      };
    }
  },

  getProjectById: async (projectId) => {
    set({ loading: true });
    try {
      const res = await getProjectById(projectId);

      if (!res) {
        set({ loading: false });
        return {
          success: false,
          error: "Error fetching project",
          project: null,
        };
      }

      set({ loading: false });
      return { success: true, error: null, project: res.data };
    } catch (error) {
      const err = error instanceof Error ? error.message : String(error);
      return { success: false, error: err, project: null };
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
