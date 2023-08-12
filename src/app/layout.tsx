// "use client";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import AppProvider from "../context/AppContext";
import type { Metadata } from "next";
import React from "react";
import { Ubuntu } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignOutButton, SignedOut, UserButton } from "@clerk/nextjs";

const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["400", "700"],
    style: "normal",
});

export const metadata: Metadata = {
    title: "Outfit Generator Bot",
    description: "It is a bot that generates outfits for you.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const router = useRouter();
    // const pathname = usePathname();
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={ubuntu.className}>
                    <div className="min-h-screen md:px-8 bg-yellow/90">
                        <nav className="w-full h-20 border-b flex items-center justify-between">
                            {/* logo */}
                            <div className="flex flex-row justify-center items-center p-4 m-4 font-bold text-blue text-bold text-3xl md:text-4xl lg:text-5xl uppercase ">
                                Flip <p className="m-0 p-0 text-cherry">Bot</p>
                            </div>

                            {/* login */}
                            <SignedOut>
                                <div className="bg-cherry text-white hover:text-gray-200 p-2 md:p-4 m-4 rounded-md shadow-md hover:scale-95 transition-all duration-200 cursor-pointer text-lg font-semibold">
                                    <Link className="" href="/sign-in">
                                        Sign-In
                                    </Link>
                                </div>
                            </SignedOut>

                            <SignedIn>
                                <div className="p-2 m-4">
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
                        </nav>
                        <AppProvider>{children}</AppProvider>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}
