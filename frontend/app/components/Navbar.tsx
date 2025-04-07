import Image from "next/image";

import logo from "../assets/icons/logo.svg";
import avatar from "../assets/icons/avatar.svg";
import notification from "../assets/icons/notification.svg";

export default function Navbar() {
    return (
        <div className="flex justify-between fixed left-0 top-0 right-0 z-50 shadow-md py-2 px-6  bg-white">
            <div className="flex items-center gap-2">
                <Image src={ logo } width={ 35 } alt="logo of the AProjectO" />
                <h2 className="text-lg font-semibold">AProjectO</h2>
            </div>

            <div className="flex items-center gap-5">
                <Image src={ notification } width={ 35 } height={ 35 } alt="notification" />
                <div className="flex items-center gap-2">
                    <div className="text-end">
                        <h3 className="font-semibold text-sm">Khalid Yousry</h3>
                        <p className="font-semibold text-xs">Description</p>
                    </div>
                    <Image src={ avatar } width={ 35 } alt="user profile" />
                </div>
            </div>
        </div>
    );
}