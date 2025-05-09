"use client"

import { useParams } from 'next/navigation'

export default function SingleProject() {
    const { _id } = useParams()
    console.log( "🚀 ~ SingleProject ~ _id:", _id )

    return (
        <div>IDDDDD</div>
    );
}

/*
1- create service and state for get project by id
2- create the ui and show the data
*/