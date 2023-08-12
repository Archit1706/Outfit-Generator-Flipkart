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
    const { image, setImage } = useContext(AppContext);

    const webcamRef = useRef(null);
    const capture = useCallback(
        (e) => {
            e.preventDefault();
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc);
            console.table(imageSrc);
            // setTimeout(() => {}, 6000);
            // router.push("/canvas");
            // redirect("/canvas");
            // window.location.href = "/canvas";
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
            <div className="flex justify-around items-center flex-row text-center">
                <button
                    className="group bg-green text-cherry font-normal shadow-lg shadow-green/50 text-xl p-6 cursor-pointer hover:text-cherry/90 hover:scale-95 transition-all duration-200 rounded-md min-w-sm  "
                    onClick={capture}
                >
                    <p className="flex justify-center items-center text-center flex-row gap-4">
                        <AiFillCamera className="font-bold group-hover:animate-pulse  h-6 w-6" />
                        <span>Capture photo</span>
                    </p>
                </button>
            </div>
        </>
    );
};

export default WebcamCapture;
