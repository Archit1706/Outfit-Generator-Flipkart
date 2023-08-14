"use client";
import React, { useRef, useEffect, useState, useContext } from "react";
import Webcam from "react-webcam";
import { SketchPicker } from "react-color";
import { AppContext } from "../../context/AppContext";
import { AiOutlineClear } from "react-icons/ai";
import { BsPencil, BsFillEraserFill } from "react-icons/bs";
import { FiSend } from "react-icons/fi";

function DrawingCanvas() {
    const { image, setImage } = useContext(AppContext);
    const [imgURL, setImgURL] = useState(image); //image is the file uploaded by user
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const webcamRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentTool, setCurrentTool] = useState("pen");
    const [penSize, setPenSize] = useState(5);
    const [penColor, setPenColor] = useState("#000000"); // Default color is black

    const width = 512;
    const height = 512;

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");
        context.scale(1, 1);
        context.lineCap = "round";
        context.strokeStyle = penColor;
        context.lineWidth = penSize;
        contextRef.current = context;
    }, [penColor, penSize]);

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
            console.log(dataURL); //send dataURL + imgURL + prompt to backend for next image
            //await axios.post('https://del.sidd065.repl.co/', { mask: dataUrl, image:imgURL, prompt:'xyz'});
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeColor = (color) => {
        setPenColor(color.hex);
    };

    return (
        <div>
            <div className="bg-gradient-to-r from-primary-500 via-mango-300 to-orange-500 p-8 text-white text-center">
                {/* File Upload */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        // Handle file upload logic
                        console.log(e.target.files[0]);
                        setImgURL(URL.createObjectURL(e.target.files[0]));
                        setImage(e.target.files[0]);
                    }}
                />
            </div>
            {/* Canvas */}
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}
                style={{
                    background: `url(${
                        webcamRef.current?.getScreenshot() || ""
                    })`,
                    backgroundSize: `${width}px ${height}px`,
                    backgroundRepeat: "no-repeat",
                }}
            />
            {/* Pen Size Slider */}
            <input
                type="range"
                min="1"
                max="20"
                step={5}
                value={penSize}
                onChange={(e) => setPenSize(parseInt(e.target.value))}
            />

            <button
                className="bg-pine text-cherry font-bold shadow-lg shadow-pine/50 text-xl p-2 cursor-pointer hover:text-cherry/90 hover:scale-95 transition-all duration-200 rounded-md min-w-sm "
                onClick={clearCanvas}
            >
                Clear
            </button>
            <button
                className="bg-pine text-cherry font-bold shadow-lg shadow-pine/50 text-xl p-2 cursor-pointer hover:text-cherry/90 hover:scale-95 transition-all duration-200 rounded-md min-w-sm "
                onClick={sendImage}
            >
                Send
            </button>
            <button
                className="bg-pine text-cherry font-bold shadow-lg shadow-pine/50 text-xl p-2 cursor-pointer hover:text-cherry/90 hover:scale-95 transition-all duration-200 rounded-md min-w-sm "
                onClick={() =>
                    setCurrentTool(currentTool === "pen" ? "eraser" : "pen")
                }
            >
                {currentTool === "pen" ? "Switch to Eraser" : "Switch to Pen"}
            </button>
        </div>
    );
}

export default DrawingCanvas;
