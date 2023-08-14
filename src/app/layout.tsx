// "use client";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import AppProvider from "../context/AppContext";
import type { Metadata } from "next";
import React from "react";
import { Ubuntu } from "next/font/google";
import Navbar from "@/components/Navbar";

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
                <body
                    className={`${ubuntu.className} min-h-screen bg-gradient-to-bl to-[#F8E831] from-[#047BD5] overflow-x-hidden`}
                >
                    <div className="h-full min-h-screen w-full bg-white/50">
                        <Navbar />
                        <AppProvider>{children}</AppProvider>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}
