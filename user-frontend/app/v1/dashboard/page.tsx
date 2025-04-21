import { AchieveTarget } from "@/components/dashboard/AchieveTarget";
import Boxes from "@/components/dashboard/Boxes";
import { ProjectsChart } from "@/components/dashboard/ProjectsChart";
import { TasksChart } from "@/components/dashboard/TasksChart";

export default function Dashboard() {

    return (
        <>
            <Boxes />

            <div className="flex flex-col gap-4 md:flex-row w-full my-4 ">
                <ProjectsChart />
                <TasksChart />
            </div>
            <AchieveTarget />
        </>
    );
}