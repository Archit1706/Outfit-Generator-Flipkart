"use client";
import { UserButton } from "@clerk/nextjs";
import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    useContext,
} from "react";
import Webcam from "react-webcam";
import Link from "next/link";
import Image from "next/image";
import Modal from "react-modal";
import { redirect } from "next/navigation";
import WebcamCapture from "../components/WebcamCapture";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/fadein";

import { AppContext } from "../context/AppContext";
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

export default function Home() {
    // useEffect(() => {}, []);
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <section className="flex flex-col items-center md:flex-row my-24 md:my-0">
            <motion.div
                variants={fadeIn("up", 0.3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.5 }}
                className="md:w-1/2"
            >
                {/* Heading */}
                <div className="text-black">
                    {/* <h1 className="text-4xl md:text-5xl font-bold text-center">
                        Flip Bot
                    </h1> */}
                    {/* <p className="text-center text-xl md:text-2xl">
                        Your Personal Fashion Assistant
                    </p> */}

                    {/* typing effect  */}
                    <p className="text-center text-xl md:text-2xl text-blue shadow">
                        {/* <Typewriter
                            options={{
                                strings: [ 
                                    "Discover Your Style Revolution",
                                    "Elevate Your Fashion Journey",
                                    "Where Trends Meet Your Taste",
                                    "Unveil Your Personalized Wardrobe",
                                    "Empowering Your Unique Fashion Story",
                                ],
                                autoStart: true,
                                loop: true,
                            }}
                        /> */}
                    </p>
                </div>

                {/* buttons */}
                <div className="flex justify-center items-center flex-col gap-8 ">
                    {/* btn 1 */}
                    <motion.div
                        variants={fadeIn("up", 0.4)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.5 }}
                        className="bg-green text-cherry font-semibold shadow-lg shadow-green/50 text-xl p-6 cursor-pointer hover:text-cherry/90 hover:scale-95 transition-all duration-200 rounded-md min-w-sm"
                        whileHover={{
                            scale: 0.95,
                            transition: { duration: 0.2 },
                        }}
                    >
                        <Link className="" href="/canvas">
                            Start with Generated Image
                        </Link>
                        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                            Instant Style Magic: Explore AI-Generated Outfits
                        </p>
                    </motion.div>
                    {/* btn 2 */}
                    <motion.div
                        variants={fadeIn("up", 0.5)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.5 }}
                        className="bg-green text-cherry font-semibold shadow-lg shadow-green/50 text-xl p-6 cursor-pointer hover:text-cherry/90 hover:scale-95 transition-all duration-200 rounded-md min-w-sm "
                        onClick={openModal}
                        whileHover={{
                            scale: 0.95,
                            transition: { duration: 0.2 },
                        }}
                    >
                        <p className="">Start with Your Own Image</p>
                        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                            Your Fashion, Your Way: Begin with Your Own
                            Inspiration
                        </p>
                    </motion.div>
                    {/* user image capture modal */}
                    <Modal
                        ariaHideApp={false}
                        className="relative aspect-square md:h-[512px] md:w-[512px] mx-auto my-auto"
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        // style={customStyles}
                        contentLabel="Capture Your Image: "
                    >
                        <div
                            id="modal"
                            className="border-[10px] border-blue p-2 rounded-md shadow-md shadow-blue/60  "
                        >
                            <WebcamCapture />
                            <div className="absolute top-2 right-2">
                                <button
                                    className="bg-green text-cherry font-bold shadow-lg shadow-green/50 text-xl p-2 cursor-pointer hover:text-cherry/90 hover:scale-95 transition-all duration-200 rounded-md min-w-sm "
                                    onClick={closeModal}
                                >
                                    <AiOutlineClose className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </motion.div>

            {/* Image */}
            <motion.div
                variants={fadeIn("down", 0.6)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.7 }}
                className="md:w-1/2 hidden md:flex"
            >
                <Image
                    src="/assets/img/img2.png"
                    alt="hero"
                    width={500}
                    height={500}
                />
            </motion.div>
        </section>
    );
}

const videoConstraints = {
    width: 512,
    height: 512,
    facingMode: "user",
};

// const WebcamCapture = () => {
//     const { image, setImage } = useContext(AppContext);

//     const webcamRef = useRef(null);
//     const capture = useCallback(() => {
//         const imageSrc = webcamRef.current.getScreenshot();
//         setImage(imageSrc);
//         console.table(imageSrc);
//         // redirect("/canvas");
//         // window.location.href = "/canvas";
//     }, [webcamRef]);
//     return (
//         <>
//             <Webcam
//                 audio={false}
//                 height={720}
//                 ref={webcamRef}
//                 screenshotFormat="image/jpeg"
//                 width={1280}
//                 videoConstraints={videoConstraints}
//             />
//             <div className="flex justify-around items-center flex-row">
//                 <button
//                     className="bg-green text-cherry font-normal shadow-lg shadow-green/50 text-xl p-6 cursor-pointer hover:text-cherry/90 hover:scale-95 transition-all duration-200 rounded-md min-w-sm "
//                     onClick={capture}
//                 >
//                     Capture photo
//                 </button>
//             </div>
//         </>
//     );
// };
