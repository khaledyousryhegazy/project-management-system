"use client";

import { LoadingSpinner } from "@/components/global/LoadingSpinner";
import { IProject } from "@/interfaces/uiInterfaces";
import { projectsStore } from "@/store/projectsStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ideaIcon from "@/assets/icons/idea.svg";
import arrowRight from "@/assets/icons/arrow-right.svg";
import Image from "next/image";

export default function SingleProject() {
    const { _id } = useParams();
    const [ project, setProject ] = useState<IProject | null>();
    const { loading, getProjectById } = projectsStore();

    useEffect( () => {
        const getData = async () => {
            const res = await getProjectById( _id as string );
            setProject( res.project );
        };

        getData();
    }, [ _id, getProjectById ] );

    return (
        <div>
            { loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className="mb-10 flex flex-col md:flex-row items-center gap-3">
                        <h1 className="font-bold text-xl lg:text-2xl">{ project?.title }</h1>
                        <div className="flex items-center gap-2">

                            <Image
                                src={ `http://localhost:3001/uploads/${ project?.owner?.avatar }` }
                                className="rounded-full border border-[#fff]"
                                width={ 37 }
                                height={ 37 }
                                alt={ project?.owner?.username || "Owner" }
                            />
                            <Image src={ arrowRight } alt="arrowRight" />

                            <div className="flex items-center">
                                { project?.members?.map( ( member ) => (
                                    <Image
                                        key={ member._id }
                                        src={ `http://localhost:3001/uploads/${ member.avatar }` }
                                        className="rounded-full image-inside border-1 border-[#fff]"
                                        width={ 37 }
                                        height={ 37 }
                                        alt={ member.username }
                                    />
                                ) ) }
                            </div>

                            <span
                                className={ `text-xs capitalize py-1 px-3 font-semibold rounded-full ${ project?.status === "canceled"
                                    ? "bg-red-300 text-red-700"
                                    : project?.status === "inprogress"
                                        ? "bg-blue-300 text-blue-700"
                                        : project?.status === "completed"
                                            ? "bg-green-300 text-green-700"
                                            : ""
                                    }` }
                            >
                                { project?.status }
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        { project?.tasks?.map( ( task ) => (
                            <div key={ task._id } className="flex items-center gap-3 flex-col sm:flex-row  bg-white shadow-md rounded-lg p-4">
                                <Image src={ ideaIcon } alt={ task.title } />
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <h1 className="font-semibold">{ task.title }</h1>
                                            <div>

                                                <p className="text-sm my-2 text-[#555252]">{ task.description }</p>
                                                <div>
                                                    <span
                                                        className={ `text-xs me-2 capitalize py-1 px-3 font-semibold rounded-full ${ task.listOf === "ToDo"
                                                            ? "bg-red-300 text-red-700"
                                                            : task.listOf === "InProgress"
                                                                ? "bg-blue-300 text-blue-700"
                                                                : task.listOf === "Done"
                                                                    ? "bg-green-300 text-green-700"
                                                                    : ""
                                                            }` }
                                                    >
                                                        { task.listOf }
                                                    </span>

                                                    <span
                                                        className={ `text-xs capitalize py-1 px-3 font-semibold rounded-full ${ task.status === "canceled"
                                                            ? "bg-red-300 text-red-700"
                                                            : task.status === "inprogress"
                                                                ? "bg-blue-300 text-blue-700"
                                                                : task.status === "completed"
                                                                    ? "bg-green-300 text-green-700"
                                                                    : ""
                                                            }` }
                                                    >
                                                        { task.status }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Image
                                        src={ `http://localhost:3001/uploads/${ task.assignTo.avatar }` }
                                        className="rounded-full"
                                        width={ 36 }
                                        height={ 36 }
                                        alt={ task.title }
                                    />
                                </div>
                            </div>
                        ) ) }
                    </div>
                </>
            )
            }
        </div >
    );

}
