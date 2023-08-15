"use client";
import React, { useState, useEffect } from "react";
import { SignedIn, SignOutButton, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { FaMale, FaFemale } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/fadein";

type Props = {};

const Navbar = (props: Props) => {
    const [gender, setGender] = useState<any>(
        typeof window !== "undefined" && localStorage?.getItem("gender")
            ? localStorage?.getItem("gender")
            : "male"
    );

    useEffect(() => {
        localStorage.setItem("gender", gender);
        // console.log("gender seleccted", gender);
    }, [gender]);

    const handleToggle = (e: any) => {
        if (e.target.checked) {
            setGender("female");
        } else {
            setGender("male");
        }
    };
    return (
        <nav className="w-full h-20 bg-black/5 flex flex-row justify-between items-center p-4 md:px-6 ">
            {/* heading */}
            <div className="flex flex-row justify-start items-center">
                {/* logo */}
                {/* <div className="h-10 w-10 bg-inherit rounded-full p-2 ">
                    <Image
                        src="/vercel.svg"
                        alt="logo"
                        width={60}
                        height={60}
                    />
                </div> */}
                <h1 className="text-3xl md:text-4xl fort-bold text-blue-700 tracking-wide">
                    Flip
                    <span className="font-extrabold text-yellow-500 outline-2 outline-black">
                        Bot
                    </span>
                </h1>
            </div>

            {/* login */}
            <div className="flex flex-row justify-center items-center gap-2">
                {/* male-female toggle */}
                <div className="">
                    <label className="swap swap-flip text-2xl">
                        {/* this hidden checkbox controls the state */}
                        <input
                            type="checkbox"
                            onClick={handleToggle}
                            // onChange={() => {}}
                            defaultChecked={gender === "male" ? false : true}
                        />

                        <div
                            className="swap-on tooltip tooltip-left"
                            data-tip="Click to Change Gender"
                        >
                            👨🏻
                        </div>
                        <div
                            className="swap-off tooltip tooltip-left"
                            data-tip="Click to change gender"
                        >
                            👩🏻
                        </div>
                    </label>
                </div>

                <SignedOut>
                    <div className="bg-black text-white hover:text-gray-200 p-2 px-4 rounded-full shadow-md hover:scale-95 transition-all duration-200 cursor-pointer text-md md:text-md md:font-semibold font-normal">
                        <Link className="" href="/sign-in">
                            Sign-In
                        </Link>
                    </div>
                </SignedOut>

                <SignedIn>
                    <div className="">
                        <UserButton />
                    </div>
                    {/* <SignOutButton /> */}
                    {/* <SignOutButton
                                    signOutCallback={() =>
                                        router.push("/sign-in")
                                    }
                                >
                                    <div className="flex cursor-pointer gap-4 p-4">
                                        <Image
                                            src="/assets/logout.svg"
                                            alt="logout"
                                            width={24}
                                            height={24}
                                        />

                                        <p className="text-white max-lg:hidden">
                                            Logout
                                        </p>
                                    </div>
                                </SignOutButton> */}
                </SignedIn>
            </div>
        </nav>
    );
};

export default Navbar;
