"use client";
import Webcam from "react-webcam";
import React, { useCallback, useRef, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AiFillCamera } from "react-icons/ai";
import { useRouter } from "next/navigation";

const videoConstraints = {
    width: 512,
    height: 512,
    facingMode: "user",
};

const WebcamCapture = () => {
    const router = useRouter();
    // const { image, setImage } = useContext(AppContext);

    const webcamRef = useRef(null);
    const capture = useCallback(
        (e: any) => {
            e.preventDefault();
            const imageSrc = webcamRef.current.getScreenshot();
            // setImage(imageSrc);
            console.table(imageSrc);
            localStorage.setItem("image", imageSrc);
            fetch("/api/canvas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image: imageSrc,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    router.push("/canvas");
                })
                .catch((err) => console.log(err));
        },
        [webcamRef]
    );
    return (
        <>
            <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
            />
            <div className="flex justify-around items-center flex-row text-center my-2">
                <button
                    className="group border-none w-fit bg-white/90 shadow-gray-300 text-gray-600 p-2 rounded-md text-center flex justify-center items-center flex-col hover:shadow-md text-xl tracking-tight font-semibold hover:scale-105 hover:text-black transition-all duration-200"
                    onClick={capture}
                >
                    <p className="flex justify-center items-center text-center flex-row gap-2">
                        <AiFillCamera className="font-bold group-hover:animate-pulse h-6 w-6" />
                        <span>Capture</span>
                    </p>
                </button>
            </div>
        </>
    );
};

export default WebcamCapture;
