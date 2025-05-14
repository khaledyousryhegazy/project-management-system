import dueDateIcon from "@/assets/icons/due-date.svg";
import { IProject } from "@/interfaces/uiInterfaces";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

export default function ProjectCard( { project }: { project: IProject } ) {
    console.log( "🚀 ~ ProjectCard ~ project:", project )
    return (
        <Link href={ `/v1/projects/${ project._id }` } className="bg-[#fff] p-3 rounded-md hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div className="flex justify-between items-center pb-2 border-b border-[#000]">
                <div className="flex items-center gap-2">
                    <Image src={ `http://localhost:3001/uploads/${ project?.owner.avatar }` } className="rounded-full border border-[#fff]" width={ 32 } height={ 32 } alt={ project?.owner?.username || "Owner" } />

                    <h1 className="font-bold text-xl">{ project.title }</h1>
                </div>
                <span className="bg-[#c2838359] text-sm font-semibold text-[#BD1E1E] py-1.5 px-2 rounded-md capitalize">{ project.status }</span>
            </div>

            <p className="text-[#424242] my-6 ">
                { project.description }
            </p>

            <div>
                <div className="text-[#D62222] uppercase text-sm font-semibold mb-4 flex items-center gap-2">
                    <Image src={ dueDateIcon } alt="due date icon" width={ 10 } />
                    { moment( project.dueDate ).format( "DD MMMM YYYY" ) }
                </div>
                <div className="flex justify-between gap-2">
                    <div className="text-sm text-[#D62222] font-semibold">
                        { project.members.length } Member
                    </div>
                    <div className="text-sm text-[#D62222] font-semibold">{ project.tasks.length } Tasks</div>
                </div>
            </div>
        </Link>
    );
}
