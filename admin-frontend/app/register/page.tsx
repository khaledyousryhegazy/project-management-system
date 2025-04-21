"use client"
import Image from "next/image";
import loginImage from "@/assets/images/loginImage.svg"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRegister } from "@/hooks/useRegister";

export default function Register() {
    const [ isVisible, setIsVisible ] = useState<boolean>( false );
    const toggleVisibility = () => setIsVisible( ( prevState ) => !prevState );

    const { loading, handleRegister, registerErrors } = useRegister();

    return (
        <div className="bg-[#F5F5F5]">
            <div className="max-w-[1200px] m-auto px-2 h-screen flex items-center justify-center ">
                <div>
                    <Image src={ loginImage } className="max-w-[500px] w-full hidden md:block" alt="Login Page" />
                </div>

                <div className="flex flex-col gap-5">
                    <div className="mb-10">
                        <h1 className="font-bold text-4xl">Welcome !</h1>
                        <p className="font-semibold text-sm mt-2">Welcome ! Please enter your details.</p>
                    </div>
                    
                    <form
                        onSubmit={ ( e ) => {
                            e.preventDefault();
                            const formData = new FormData( e.currentTarget );
                            handleRegister( formData );
                        } }
                        className="flex flex-col gap-5">
                        <div className="space-y-5 min-w-[300px]">
                            {/* Avatar */ }
                            <div >
                                <Label htmlFor="register-avatar" className="mb-2">Choose Avatar</Label>
                                <Input id="register-avatar" name="register-avatar" type="file" />
                                {
                                    registerErrors.avatar && <p className="text-red-500 text-sm">{ registerErrors.avatar }</p>
                                }
                            </div>

                            {/* Username */ }
                            <div >
                                <Label htmlFor="register-username" className="mb-2">Enter Your Username</Label>
                                <Input id="register-username" name="register-username" placeholder="Username" type="text" />
                                {
                                    registerErrors.username && <p className="text-red-500 text-sm">{ registerErrors.username }</p>
                                }
                            </div>

                            {/* Email */ }
                            <div >
                                <Label htmlFor="register-email" className="mb-2">Enter Your Email</Label>
                                <Input id="register-email" name="register-email" placeholder="Email" type="email" />
                                {
                                    registerErrors.email && <p className="text-red-500 text-sm">{ registerErrors.email }</p>
                                }
                            </div>

                            {/* Password */ }
                            <div>
                                <Label htmlFor="register-password" className="mb-2">Enter Your Password</Label>
                                <div className="relative">
                                    <Input
                                        id="register-password"
                                        name="register-password"
                                        className="pe-9"
                                        placeholder="Password"
                                        type={ isVisible ? "text" : "password" }
                                    />
                                    <button
                                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
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
                                {
                                    registerErrors.password && <p className="text-red-500 text-sm">{ registerErrors.password }</p>
                                }
                            </div>
                        </div>

                        <Button variant={ "default" } className="w-full mt-5 cursor-pointer">
                            { loading ? "Loading..." : "Create Account" }
                        </Button>

                    </form>
                    <div className="flex items-center justify-center text-xs font-semibold gap-2">
                        <p>Already have an account?</p>
                        <Link href={ '/login' } className="hover:underline">Login Now !!</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}