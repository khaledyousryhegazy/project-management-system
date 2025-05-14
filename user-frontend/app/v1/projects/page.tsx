"use client";

import { LoadingSpinner } from "@/components/global/LoadingSpinner";
import ProjectCard from "@/components/projects/ProjectCard";
import { IProject } from "@/interfaces/uiInterfaces";
import { projectsStore } from "@/store/projectsStore";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Projects() {

    const { loading, getUserProjects } = projectsStore();
    const [ projects, setProjects ] = useState<IProject[]>( [] );

    useEffect( () => {
        const token = Cookies.get( "token" );

        if ( !token ) return;

        try {
            const decoded: { userId: string } = jwtDecode( token );

            const getData = async () => {
                const res = await getUserProjects( decoded.userId );
                setProjects( res.projects );
            };

            getData();

        } catch ( error ) {
            const err = error instanceof Error ? error.message : String( error );
            toast( err )
        }
    }, [ getUserProjects ] );

    return (
        <div>
            { loading ? <LoadingSpinner /> : (
                <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4">
                    {
                        projects.map( ( project: IProject ) => (
                            <ProjectCard key={ project._id } project={ project } />
                        ) )
                    }
                </div>
            ) }
        </div>
    );
}