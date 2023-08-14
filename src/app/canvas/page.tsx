"use client";
import React, { useRef, useEffect, useState, useContext } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { BsPencil, BsFillEraserFill } from "react-icons/bs";
import { FiSend } from "react-icons/fi";

const page = () => {
    // const context = useContext(AppContext);
    // console.log(context);

    // const [imgURL, setImgURL] = useState<any>(
    //     typeof window !== "undefined" && localStorage?.getItem("image")
    //         ? localStorage.getItem("image")
    //         : ""
    // );

    const canvasRef = useRef<any>(null);
    const contextRef = useRef<any>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentTool, setCurrentTool] = useState("pen");
    const [outfitPrompt, setOutfitPrompt] = useState<string>("");
    const imgURL =
        "https://cdn6.dissolve.com/p/D1028_55_728/D1028_55_728_1200.jpg"; //SENT BY BACKEND
    const [penSize, setPenSize] = useState(10);
    const width = 512;
    const height = 512;

    useEffect(() => {
        if (window) {
            localStorage.setItem("image", imgURL);
        }
        const canvas: any = canvasRef.current;

        const context: any = canvas.getContext("2d");
        context.scale(1, 1);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = penSize; //WE CAN ADD A SLIDER TO CONTROL WIDTH OF BLACK LINE IF NEEDED.
        contextRef.current = context;
    }, [penSize, imgURL]);

    const startDrawing = ({ nativeEvent }: any) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }: any) => {
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
        const canvas: any = canvasRef.current;
        const context: any = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const sendImage = async () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL();
        try {
            console.table([dataURL, imgURL, outfitPrompt]);
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
                {/* <canvas
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    ref={canvasRef}
                    style={{
                        background: `url(${imgURL})`,
                        backgroundRepeat: "no-repeat",
                        // backgroundSize: `${width}px ${height}px`,
                    }}
                    className="border-2 border-primary shadow-md shadow-primary/50 aspect-square md:h-[512px] md:w-[512px]"
                /> */}
                <canvas
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    ref={canvasRef}
                    style={{
                        background: `url(${imgURL})`,
                        backgroundSize: `${width}px ${height}px`,
                        backgroundRepeat: "no-repeat",
                    }}
                    // className="border-2 border-primary shadow-md shadow-primary/50 "
                />
                {/* hash tags and recommendations */}
            </div>
            {/* <div className="w-full text-center text-primary text-md font-medium">
                <p>#tajmahal #agra #india</p>
            </div> */}
            <div className="flex justify-center items-center md:items-stretch flex-col h-full">
                <div className="flex flex-col justify-center items-start gap-4 ">
                    <button
                        className="group border-none h-auto bg-white/60
                    shadow-gray-300 text-gray-700 p-2 rounded-md text-center
                    flex flex-row justify-center items-center hover:shadow-md
                    text-xl tracking-tight font-semibold hover:scale-105
                    transition-all duration-200 cursor-pointer w-32 md:w-40 gap-2"
                        onClick={clearCanvas}
                    >
                        <p className="group-hover:rotate-6">
                            <AiOutlineClear className="font-bold h-6 w-6" />
                        </p>
                        <span>Clear</span>
                    </button>
                    <button
                        className="group border-none h-auto bg-white/60
                    shadow-gray-300 text-gray-700 p-2 rounded-md text-center
                    flex flex-row justify-center items-center hover:shadow-md
                    text-xl tracking-tight font-semibold hover:scale-105
                    transition-all duration-200 cursor-pointer w-32 md:w-40 gap-2"
                        onClick={sendImage}
                    >
                        <p className="group-hover:rotate-6">
                            <FiSend className="font-bold h-6 w-6" />
                        </p>
                        <span>Send</span>
                    </button>
                    <button
                        className="group border-none h-auto bg-white/60
                    shadow-gray-300 text-gray-700 p-2 rounded-md text-center
                    flex flex-row justify-center items-center hover:shadow-md
                    text-xl tracking-tight font-semibold hover:scale-105
                    transition-all duration-200 cursor-pointer w-32 md:w-40 gap-2"
                        onClick={() =>
                            setCurrentTool(
                                currentTool === "pen" ? "eraser" : "pen"
                            )
                        }
                    >
                        {currentTool === "pen" ? (
                            <>
                                <p className="group-hover:rotate-6">
                                    <BsFillEraserFill className="font-bold h-6 w-6" />
                                </p>
                                <span>Eraser</span>
                            </>
                        ) : (
                            <>
                                <p className="group-hover:rotate-6">
                                    <BsPencil className="font-bold h-6 w-6" />
                                </p>
                                <span>Pen</span>
                            </>
                        )}
                    </button>
                </div>
                <div className="w-full font-bold ">
                    {/* <input
                        className="w-full h-1 mb-6 bg-pine rounded-lg appearance-none cursor-pointer range-sm dark:bg-primary-700"
                        type="range"
                        min="10"
                        max="30"
                        step={5}
                        value={penSize}
                        onChange={(e) => setPenSize(parseInt(e.target.value))}
                    /> */}
                    <input
                        type="range"
                        min={10}
                        max="30"
                        value={penSize}
                        step={5}
                        className="range range-xs"
                        onChange={(e) => setPenSize(parseInt(e.target.value))}
                    />
                </div>
                {/* prompt input */}
                {/* chat */}
                <div>
                    <div className="chat chat-end">
                        <div className="chat-bubble chat-bubble-neutral-content">
                            <input
                                type="text"
                                placeholder="PROMPT HERE"
                                className="input input-bordered input-white w-full max-w-xs"
                                onChange={(e) => {
                                    setOutfitPrompt(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-start gap-4">
                    <label
                        htmlFor="prompt"
                        className="text-primary font-bold text-xl"
                    >
                        Prompt
                    </label>
                    <textarea
                        name="prompt"
                        className="w-full h-32 p-2 border-2 border-primary rounded-md shadow-md shadow-primary/50"
                        placeholder="Enter prompt here..."
                    ></textarea>
                </div>
            </div>
        </section>
    );
};

export default page;
