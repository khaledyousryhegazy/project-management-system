import axios from "axios";

export const getProjectByMember = async (memberId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/projects/user/${memberId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.message || "Fetch getProjectByMember failed"
      );
    }
    throw new Error("Something went wrong");
  }
};

// Get project by id
export const getProjectById = async (projectId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${projectId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.message || "Fetch getProjectByMember failed"
      );
    }
    throw new Error("Something went wrong");
  }
};

// add task to the project
export const addTaskToProject = async ({
  taskId,
  projectId,
}: {
  taskId: string;
  projectId: string;
}) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${projectId}/tasks`,
      taskId
    );

    return res?.data;
  } catch (error) {
    throw new Error("Error fetching user projects: " + error);
  }
};

// remove task from the project
export const removeTaskFromProject = async ({
  taskId,
  projectId,
}: {
  taskId: string;
  projectId: string;
}) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${projectId}/tasks`,
      { data: { taskId } }
    );

    return res?.data;
  } catch (error) {
    throw new Error("Error fetching user projects: " + error);
  }
};
