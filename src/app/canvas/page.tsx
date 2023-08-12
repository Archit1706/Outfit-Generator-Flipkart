"use client";
import React, { useRef, useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Image from "next/image";
import { AiOutlineClear } from "react-icons/ai";
import { BsPencil, BsFillEraserFill } from "react-icons/bs";
import { FiSend } from "react-icons/fi";

const page = () => {
    const context = useContext(AppContext);
    console.log(context);
    const [imgURL, setImgURL] = useState("/assets/taj.jpeg");
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentTool, setCurrentTool] = useState("pen");
    // const imgURL = image; //SENT BY BACKEND
    const [penSize, setPenSize] = useState(10);
    const width = 512;
    const height = 512;

    useEffect(() => {
        const canvas = canvasRef.current;

        const context = canvas.getContext("2d");
        context.scale(1, 1);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = penSize; //WE CAN ADD A SLIDER TO CONTROL WIDTH OF BLACK LINE IF NEEDED.
        contextRef.current = context;
    }, [penSize]);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        if (currentTool === "eraser") {
            contextRef.current.globalCompositeOperation = "destination-out";
        } else {
            contextRef.current.globalCompositeOperation = "source-over";
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const sendImage = async () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL();
        try {
            console.table([dataURL, imgURL]);
            // console.log(dataURL);
            //send dataURL + imgURL + prompt to backend for next image
            //await axios.post('https://del.sidd065.repl.co/', { mask: dataUrl, image:imgURL, prompt:'xyz'});
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="flex justify-center items-center flex-col md:flex-row p-4 gap-4">
            <div className="flex justify-center items-center flex-col p-4 gap-4">
                <canvas
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    ref={canvasRef}
                    style={{
                        background: `url(${imgURL})`,
                        backgroundRepeat: "no-repeat",
                    }}
                    className="border-2 border-blue shadow-md shadow-blue/50 aspect-square md:h-[512px] md:w-[512px] mx-auto my-auto object-fill"
                />
                {/* hash tags and recommendations */}
                <div className="w-full text-center text-blue text-md font-medium">
                    <p>#tajmahal #agra #india</p>
                </div>
            </div>
            <div className="flex justify-center items-stretch flex-col h-full">
                <div className="flex flex-col justify-center items-start gap-4 ">
                    <button
                        className="bg-green text-cherry font-bold shadow-lg shadow-green/50 text-xl p-2 cursor-pointer hover:text-cherry/90 hover:scale-95 transition-all duration-200 rounded-md w-32 "
                        onClick={clearCanvas}
                    >
                        <p className="flex justify-center items-center text-center flex-row gap-4">
                            <AiOutlineClear className="font-bold h-6 w-6" />
                            <span>Clear</span>
                        </p>
                    </button>
                    <button
                        className="bg-green text-cherry font-bold shadow-lg shadow-green/50 text-xl p-2 cursor-pointer hover:text-cherry/90 hover:scale-95 transition-all duration-200 rounded-md w-32"
                        onClick={sendImage}
                    >
                        <p className="flex justify-center items-center text-center flex-row gap-4">
                            <FiSend className="font-bold h-6 w-6" />
                            <span>Send</span>
                        </p>
                    </button>
                    <button
                        className="bg-green text-cherry font-bold shadow-lg shadow-green/50 text-xl p-2 cursor-pointer hover:text-cherry/90 hover:scale-95 transition-all duration-200 rounded-md w-32 "
                        onClick={() =>
                            setCurrentTool(
                                currentTool === "pen" ? "eraser" : "pen"
                            )
                        }
                    >
                        {currentTool === "pen" ? (
                            <p className="flex justify-center items-center text-center flex-row gap-4">
                                <BsFillEraserFill className="font-bold h-6 w-6" />
                                <span>Eraser</span>
                            </p>
                        ) : (
                            <p className="flex justify-center items-center text-center flex-row gap-4">
                                <BsPencil className="font-bold h-6 w-6" />
                                <span>Pen</span>
                            </p>
                        )}
                    </button>
                </div>
                <div className="w-full font-bold ">
                    <input
                        className="w-full h-1 mb-6 bg-green rounded-lg appearance-none cursor-pointer range-sm dark:bg-blue-700"
                        type="range"
                        min="10"
                        max="30"
                        step={5}
                        value={penSize}
                        onChange={(e) => setPenSize(parseInt(e.target.value))}
                    />
                </div>
                {/* prompt input */}
                <div className="flex flex-col justify-center items-start gap-4">
                    <label className="text-blue font-bold text-xl">
                        Prompt
                    </label>
                    <textarea
                        className="w-full h-32 p-2 border-2 border-blue rounded-md shadow-md shadow-blue/50"
                        placeholder="Enter prompt here..."
                    ></textarea>
                </div>
            </div>
        </section>
    );
};

export default page;
