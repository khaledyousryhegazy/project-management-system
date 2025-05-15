"use client"
import Image from "next/image";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import logo from "@/assets/icons/logo.svg";
import avatar from "@/assets/icons/avatar.svg";
import notification from "@/assets/icons/notification.svg";
import Link from "next/link";



export default function Navbar() {
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove( "token" );
        router.push( "/login" );
    }

    return (
        <div className="flex justify-between fixed left-0 top-0 right-0 z-50 shadow-md py-2 px-6  bg-white">
            <div className="flex items-center gap-2">
                <Image src={ logo } width={ 35 } alt="logo of the AProjectO" />
                <h2 className="text-lg font-semibold">AProjectO</h2>
            </div>

            <div className="flex items-center gap-2 md:gap-5">

                <Image src={ notification } width={ 30 } height={ 30 } alt="notification" />

                <div className="flex items-center gap-2">
                    <div className="text-end">
                        <h3 className="font-semibold text-sm">Khalid Yousry</h3>
                        <p className="font-semibold text-xs">Description</p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Image src={ avatar } className="cursor-pointer" width={ 35 } alt="user profile" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>

                            <DropdownMenuItem>
                                <Link href="/v1/profile" className="flex items-center gap-2 w-full">
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={ handleLogout }>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}