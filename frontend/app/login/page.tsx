'use client'
import Image from "next/image";
import loginImage from "@/assets/images/loginImage.svg"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login() {
    const [ isVisible, setIsVisible ] = useState<boolean>( false );

    const toggleVisibility = () => setIsVisible( ( prevState ) => !prevState );

    return (
        <div className="bg-[#F5F5F5]">
            <div className="max-w-[1200px] m-auto px-2 h-screen flex items-center justify-center ">
                <div>
                    <Image src={ loginImage } className="max-w-[500px] w-full hidden md:block" alt="Login Page" />
                </div>

                <div className="flex flex-col gap-5">
                    <div className="mb-10">
                        <h1 className="font-bold text-4xl">Welcome back !</h1>
                        <p className="font-semibold text-sm mt-2">Welcome back! Please enter your details.</p>
                    </div>
                    <form action="">
                        <div className="space-y-5 min-w-[300px]">
                            {/* Email */ }
                            <div >
                                <Label htmlFor="login-email" className="mb-2">Enter Your Email</Label>
                                <Input id="login-email" placeholder="Email" type="email" />
                            </div>

                            {/* Password */ }
                            <div>
                                <Label htmlFor="login-password" className="mb-2">Enter Your Password</Label>
                                <div className="relative">
                                    <Input
                                        id="login-password"
                                        className="pe-9"
                                        placeholder="Password"
                                        type={ isVisible ? "text" : "password" }
                                    />
                                    <button
                                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                        type="button"
                                        onClick={ toggleVisibility }
                                        aria-label={ isVisible ? "Hide password" : "Show password" }
                                        aria-pressed={ isVisible }
                                        aria-controls="password"
                                    >
                                        { isVisible ? (
                                            <EyeOff size={ 16 } strokeWidth={ 2 } aria-hidden="true" />
                                        ) : (
                                            <Eye size={ 16 } strokeWidth={ 2 } aria-hidden="true" />
                                        ) }
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Button variant={ "default" } className="w-full mt-5 cursor-pointer">Login</Button>

                    </form>
                    <div className="flex items-center justify-center text-xs font-semibold gap-2">
                        <p>Don’t have an account?</p>
                        <Link href={ '/register' } className="hover:underline">Sign up Now !!</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}