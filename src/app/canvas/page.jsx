// "use client";
// import React, { useRef, useEffect, useState, useContext } from "react";
// import { AiOutlineClear, AiFillGoogleCircle } from "react-icons/ai";
// import { BsPencil, BsFillEraserFill } from "react-icons/bs";
// import { FiSend } from "react-icons/fi";
// import { TbPhotoSearch } from "react-icons/tb";
// import { toast } from "react-toastify";

// const page = () => {
//     // const context = useContext(AppContext);
//     // console.log(context);

//     const [imgURL, setImgURL] = useState(
//         typeof window !== "undefined" && localStorage?.getItem("image")
//             ? localStorage.getItem("image")
//             : ""
//     );

//     const canvasRef = useRef(null);
//     const contextRef = useRef(null);
//     const [isDrawing, setIsDrawing] = useState(false);
//     const [currentTool, setCurrentTool] = useState("pen");
//     const [outfitPrompt, setOutfitPrompt] = useState("");
//     // const imgURL =
//     // "https://cdn6.dissolve.com/p/D1028_55_728/D1028_55_728_1200.jpg"; //SENT BY BACKEND
//     const [penSize, setPenSize] = useState(9);
//     const width = 512;
//     const height = 512;
//     let userImage = "";

//     const [ngRok, setNgrok] = useState(
//         window !== "undefined" && localStorage.getItem("ngRok")
//             ? localStorage.getItem("ngRok")
//             : ""
//     ); //ngrok url

//     const [responses, setResponses] = useState([
//         // "https://dummyimage.com/512x512",
//         // "https://dummyimage.com/512x512",
//         // "https://dummyimage.com/512x512",
//         // "https://dummyimage.com/512x512",
//     ]); //array of responses from backend

//     useEffect(() => {
//         userImage = localStorage.getItem("image");
//         // if (window) {
//         //     localStorage.setItem("image", imgURL);
//         // }

//         setNgrok(
//             window && localStorage.getItem("ngRok")
//                 ? localStorage.getItem("ngRok")
//                 : ""
//         ); //ngrok url

//         if (Array.isArray(responses) && responses.length > 0) {
//             const canvas = canvasRef.current;

//             const context = canvas.getContext("2d");
//             context.scale(1, 1);
//             context.lineCap = "round";
//             context.strokeStyle = "black";
//             context.lineWidth = penSize; //WE CAN ADD A SLIDER TO CONTROL WIDTH OF BLACK LINE IF NEEDED.
//             contextRef.current = context;
//         }
//     }, [penSize, imgURL]);

//     const startDrawing = ({ nativeEvent }) => {
//         const { offsetX, offsetY } = nativeEvent;
//         contextRef.current.beginPath();
//         contextRef.current.moveTo(offsetX, offsetY);
//         setIsDrawing(true);
//     };

//     const finishDrawing = () => {
//         contextRef.current.closePath();
//         setIsDrawing(false);
//     };

//     const draw = ({ nativeEvent }) => {
//         if (!isDrawing) {
//             return;
//         }
//         const { offsetX, offsetY } = nativeEvent;
//         contextRef.current.lineTo(offsetX, offsetY);
//         contextRef.current.stroke();
//         if (currentTool === "eraser") {
//             contextRef.current.globalCompositeOperation = "destination-out";
//         } else {
//             contextRef.current.globalCompositeOperation = "source-over";
//         }
//     };

//     const clearCanvas = () => {
//         const canvas = canvasRef.current;
//         const context = canvas.getContext("2d");
//         context.clearRect(0, 0, canvas.width, canvas.height);
//     };

//     const sendImage = async () => {
//         const canvas = canvasRef.current;
//         const dataURL = canvas.toDataURL();
//         if (outfitPrompt === "") {
//             toast.error("Please enter a prompt");
//             return;
//         }
//         try {
//             console.table([dataURL, imgURL, outfitPrompt]);
//             // console.log(dataURL);
//             //send dataURL + imgURL + prompt to backend for next image
//             //await axios.post('https://del.sidd065.repl.co/', { mask: dataUrl, image:imgURL, prompt: outfitPrompt});
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const googleSearch = () => {
//         //send outfitPrompt to google search
//         if (outfitPrompt === "") {
//             toast.error("Please enter a prompt");
//             return;
//         }
//         try {
//             console.log(outfitPrompt);
//             //send outfitPrompt to google search
//             //await axios.post('https://del.sidd065.repl.co/', { prompt: outfitPrompt});
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const selectImage = (e) => {
//         e.preventDefault();
//         console.log(e.target.src);
//         localStorage.setItem("image", e.target.src);
//         setResponses([]);
//         window.location.reload();
//     };

//     return (
//         <section className="flex justify-center items-center min-h-screen h-auto md:items-start flex-col md:flex-row p-4 gap-4">
//             {/* canvas with bg-image as the user image */}
//             <div className="w-[90vw] md:w-1/2 text-center">
//                 <h3 className="text-md font-medium text-gray-400">
//                     Draw on the canvas as per your preference
//                 </h3>

//                 {Array.isArray(responses) && responses.length > 0 ? (
//                     <div className="w-full rounded-xl bg-white/60 hover:bg-white/70 shadow-gray-300 shadow-lg p-4 text-gray-200 text-center">
//                         <div className="grid grid-cols-2 gap-4">
//                             {responses.map((response, index) => (
//                                 <div
//                                     key={index}
//                                     className="aspect-square bg-white/60 hover:bg-white/70 rounded-xl shadow-gray-300 shadow-lg"
//                                 >
//                                     <img
//                                         src={response}
//                                         alt="response"
//                                         className="object-cover rounded-xl"
//                                         onClick={selectImage}
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="flex justify-center items-center flex-col gap-4 aspect-square w-full rounded-xl bg-white/60 hover:bg-white/70 shadow-gray-300 shadow-lg p-4 text-gray-200">
//                         <canvas
//                             onMouseDown={startDrawing}
//                             onMouseUp={finishDrawing}
//                             onMouseMove={draw}
//                             ref={canvasRef}
//                             style={{
//                                 background:
//                                     `url(${imgURL})` || `url(${userImage})`,
//                                 backgroundSize: `${width}px ${height}px`,
//                                 backgroundRepeat: "no-repeat",
//                             }}
//                             width={width}
//                             height={height}
//                             // className="border-2 border-primary shadow-md shadow-primary/50 aspect-square md:h-[512px] md:w-[512px]"
//                         />
//                     </div>
//                 )}
//             </div>
//             {/* </div> */}
//             {/* hashtags */}
//             {/* <div className="w-full text-center text-primary text-md font-medium">
//                 <p>#tajmahal #agra #india</p>
//             </div> */}

//             {/* everything on the right */}
//             <div className="flex justify-center flex-col items-center md:w-1/2 w-full gap-4">
//                 {/* top right div with tools and search button */}
//                 <div className="w-full flex justify-center items-center flex-col md:flex-row gap-4 md:gap-0">
//                     {/* tools */}
//                     <div className="flex justify-center items-center flex-col md:w-1/2 gap-4">
//                         {/* clear */}
//                         <button
//                             className="group border-none h-auto bg-white/60 hover:bg-white/70
//                     shadow-gray-300 text-gray-700 p-2 rounded-md text-center
//                     flex flex-row justify-center items-center hover:shadow-md
//                     text-xl tracking-tight font-semibold hover:scale-105
//                     transition-all duration-200 cursor-pointer w-36 gap-2 tooltip tooltip-left"
//                             onClick={clearCanvas}
//                             data-tip={"Clear Canvas"}
//                         >
//                             <p className="group-hover:rotate-6">
//                                 <AiOutlineClear className="font-bold h-6 w-6" />
//                             </p>
//                             <span>Clear</span>
//                         </button>

//                         {/* pen / eraser */}
//                         <button
//                             className="group border-none h-auto bg-white/60 hover:bg-white/70
//                     shadow-gray-300 text-gray-700 p-2 rounded-md text-center
//                     flex flex-row justify-center items-center hover:shadow-md
//                     text-xl tracking-tight font-semibold hover:scale-105
//                     transition-all duration-200 cursor-pointer w-36 gap-2 tooltip tooltip-left"
//                             data-tip={
//                                 currentTool === "pen"
//                                     ? "Select Eraser"
//                                     : "Select Pen"
//                             }
//                             onClick={() =>
//                                 setCurrentTool(
//                                     currentTool === "pen" ? "eraser" : "pen"
//                                 )
//                             }
//                         >
//                             {currentTool === "pen" ? (
//                                 <>
//                                     <p className="group-hover:rotate-6">
//                                         <BsFillEraserFill className="font-bold h-6 w-6" />
//                                     </p>
//                                     <span>Eraser</span>
//                                 </>
//                             ) : (
//                                 <>
//                                     <p className="group-hover:rotate-6">
//                                         <BsPencil className="font-bold h-6 w-6" />
//                                     </p>
//                                     <span>Pen</span>
//                                 </>
//                             )}
//                         </button>

//                         {/* send */}
//                         <button
//                             className="group border-none h-auto bg-white/60 hover:bg-white/70
//                     shadow-gray-300 text-gray-700 p-2 rounded-md text-center
//                     flex flex-row justify-center items-center hover:shadow-md
//                     text-xl tracking-tight font-semibold hover:scale-105
//                     transition-all duration-200 cursor-pointer w-36 gap-2 tooltip tooltip-left"
//                             onClick={sendImage}
//                             data-tip={"Generate Outfits"}
//                         >
//                             <p className="group-hover:rotate-6">
//                                 <FiSend className="font-bold h-6 w-6" />
//                             </p>
//                             <span>Send</span>
//                         </button>
//                     </div>

//                     {/* google search and pen resizer */}
//                     <div className="w-full md:w-1/2 flex justify-center items-center flex-col gap-4 md:gap-8">
//                         {/* google */}
//                         <div className="w-full flex justify-center">
//                             <button
//                                 className="group border-none h-auto bg-white/60 hover:bg-white/70
//                     shadow-gray-300 text-gray-700 p-2 rounded-md text-center
//                     flex flex-row justify-center items-center hover:shadow-md
//                     text-xl tracking-tight font-semibold hover:scale-105
//                     transition-all duration-200 cursor-pointer w-36 gap-2 tooltip tooltip-left"
//                                 onClick={googleSearch}
//                                 data-tip={"Search on Google"}
//                             >
//                                 <p className="group-hover:rotate-6">
//                                     <AiFillGoogleCircle className="font-bold h-6 w-6" />
//                                 </p>
//                                 <span>Search</span>
//                             </button>
//                         </div>

//                         {/* slider */}
//                         <div
//                             className="w-full tooltip tooltip-top"
//                             data-tip={"Pen Size - " + penSize}
//                         >
//                             <input
//                                 type="range"
//                                 min={9}
//                                 max={30}
//                                 value={penSize}
//                                 step={3}
//                                 className="range range-xs w-11/12 bg-transparent/20"
//                                 // give style color and background color
//                                 style={{
//                                     color: "#000000",
//                                 }}
//                                 onChange={(e) =>
//                                     setPenSize(parseInt(e.target.value))
//                                 }
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* chat/api response */}
//                 {Array.isArray(responses) && responses.length > 0 && (
//                     <div className="w-full rounded-xl bg-white/60 hover:bg-white/70 shadow-gray-300 shadow-lg p-4 text-gray-200 relative min-w-80 max-w-3xl">
//                         {}
//                     </div>
//                 )}

//                 {/* prompt / search bar */}
//                 <div className="w-full rounded-xl bg-white/60 hover:bg-white/70 shadow-gray-300 shadow-lg p-4 text-gray-200 relative min-w-80 max-w-3xl">
//                     <div className="relative">
//                         <input
//                             type="text"
//                             id="password"
//                             className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
//                             placeholder="Prompt here..."
//                             onChange={(e) => {
//                                 setOutfitPrompt(e.target.value);
//                             }}
//                         />
//                         <button className="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-200 transition-colors">
//                             <TbPhotoSearch className="w-full h-full" />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default page;

"use client";
import React, { useRef, useEffect, useState, useContext } from "react";
import { AiOutlineClear, AiFillGoogleCircle } from "react-icons/ai";
import { BsPencil, BsFillEraserFill } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { TbPhotoSearch } from "react-icons/tb";
import { toast } from "react-toastify";

const page = () => {
    // const context = useContext(AppContext);
    // console.log(context);

    const [imgURL, setImgURL] = useState(
        typeof window !== "undefined" && localStorage?.getItem("image")
            ? localStorage.getItem("image")
            : ""
    );
    const [ngrok, setNgrok] = useState("");
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentTool, setCurrentTool] = useState("pen");
    const [outfitPrompt, setOutfitPrompt] = useState("");
    // const imgURL =
    //     "https://cdn6.dissolve.com/p/D1028_55_728/D1028_55_728_1200.jpg"; //SENT BY BACKEND
    const [penSize, setPenSize] = useState(15);
    const width = 512;
    const height = 512;
    let userImage = "";

    const [previousResponses, setPreviousResponses] = useState([]); //array of responses from backend
    const [responses, setResponses] = useState([
        // "https://dummyimage.com/512x512",
        // "https://dummyimage.com/512x512",
        // "https://dummyimage.com/512x512",
        // "https://dummyimage.com/512x512",
    ]); //array of responses from backend
    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            const context = canvas.getContext("2d");
            context.scale(1, 1);
            context.lineCap = "round";
            context.strokeStyle = "black";
            context.lineWidth = penSize; //WE CAN ADD A SLIDER TO CONTROL WIDTH OF BLACK LINE IF NEEDED.
            contextRef.current = context;
        }
    }, [penSize]);

    useEffect(() => {
        fetch("https://server.sidd065.repl.co/backend")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setNgrok(data.url);
                // localStorage.setItem("ngrok", data.url);
                return;
            })
            .catch((err) => {
                console.log(err);
            });
    });

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
        if (outfitPrompt === "") {
            toast.error("Please enter a prompt");
            return;
        }
        if (dataURL === blank) {
            toast.error("LLM");
        } else {
            try {
                console.table([dataURL, imgURL, outfitPrompt]);

                fetch(`${ngrok}/api/sdapi/img2img`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        mask: dataURL,
                        image: imgURL,
                        prompt: outfitPrompt,
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        setResponses(data.response);
                        return data;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                // console.log(dataURL);
                //send dataURL + imgURL + prompt to backend for next image
                //await axios.post('https://del.sidd065.repl.co/', { mask: dataUrl, image:imgURL, prompt: outfitPrompt});
            } catch (error) {
                console.error(error);
            }
        }
    };

    const googleSearch = () => {
        //send outfitPrompt to google search

        try {
            fetch(`${ngrok}/api/sdapi/upscale`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image: imgURL,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.response[0]);
                    if (window !== "undefined") {
                        window.open(
                            "https://lens.google.com/uploadbyurl?url=" +
                                data.response[0],
                            "_blank"
                        );
                    }
                });

            console.log(outfitPrompt);
            //send outfitPrompt to google search
            //await axios.post('https://del.sidd065.repl.co/', { prompt: outfitPrompt});
        } catch (error) {
            console.error(error);
        }
    };

    const selectImage = (e) => {
        e.preventDefault();
        console.log(e.target.src);
        localStorage.setItem("image", e.target.src);
        setImgURL(e.target.src);
        setPreviousResponses(responses);
        setResponses([]);
        // window.location.reload();
    };

    return (
        <section className="flex justify-center items-center min-h-screen h-auto md:items-start flex-col md:flex-row p-4 gap-4">
            {/* canvas with bg-image as the user image */}
            <div className="w-[90vw] md:w-1/2 text-center">
                <h3 className="text-md font-medium text-gray-400">
                    Draw on the canvas as per your preference
                </h3>

                {Array.isArray(responses) && responses.length > 0 ? (
                    <div className="w-full rounded-xl bg-white/60 hover:bg-white/70 shadow-gray-300 shadow-lg p-4 text-gray-200 text-center">
                        <div className="grid grid-cols-2 gap-4">
                            {responses.map((response, index) => (
                                <div
                                    key={index}
                                    className="aspect-square bg-white/60 hover:bg-white/70 rounded-xl shadow-gray-300 shadow-lg"
                                >
                                    <img
                                        src={response}
                                        alt="response"
                                        className="object-cover rounded-xl"
                                        onClick={selectImage}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center flex-col gap-4 aspect-square w-full rounded-xl bg-white/60 hover:bg-white/70 shadow-gray-300 shadow-lg p-4 text-gray-200">
                        <canvas
                            onMouseDown={startDrawing}
                            onMouseUp={finishDrawing}
                            onMouseMove={draw}
                            width={width}
                            height={height}
                            ref={canvasRef}
                            style={{
                                //width: `${width}px`,
                                //height: `${height}px`,
                                background:
                                    `url(${imgURL})` || `url(${userImage})`,
                                backgroundSize: `${width}px ${height}px`,
                                backgroundRepeat: "no-repeat",
                            }}
                            // className="border-2 border-primary shadow-md shadow-primary/50 aspect-square md:h-[512px] md:w-[512px]"
                        />
                    </div>
                )}
            </div>
            {/* </div> */}
            {/* hashtags */}
            {/* <div className="w-full text-center text-primary text-md font-medium">
                <p>#tajmahal #agra #india</p>
            </div> */}

            {/* everything on the right */}
            <div className="flex justify-center flex-col items-center md:w-1/2 w-full gap-4">
                {/* top right div with tools and search button */}
                <div className="w-full flex justify-center items-center flex-col md:flex-row gap-4 md:gap-0">
                    {/* tools */}
                    <div className="flex justify-center items-center flex-col md:w-1/2 gap-4">
                        {/* clear */}
                        <button
                            className="group border-none h-auto bg-white/60 hover:bg-white/70
                    shadow-gray-300 text-gray-700 p-2 rounded-md text-center
                    flex flex-row justify-center items-center hover:shadow-md
                    text-xl tracking-tight font-semibold hover:scale-105
                    transition-all duration-200 cursor-pointer w-36 gap-2 tooltip tooltip-left"
                            onClick={clearCanvas}
                            data-tip={"Clear Canvas"}
                        >
                            <p className="group-hover:rotate-6">
                                <AiOutlineClear className="font-bold h-6 w-6" />
                            </p>
                            <span>Clear</span>
                        </button>

                        {/* pen / eraser */}
                        <button
                            className="group border-none h-auto bg-white/60 hover:bg-white/70
                    shadow-gray-300 text-gray-700 p-2 rounded-md text-center
                    flex flex-row justify-center items-center hover:shadow-md
                    text-xl tracking-tight font-semibold hover:scale-105
                    transition-all duration-200 cursor-pointer w-36 gap-2 tooltip tooltip-left"
                            data-tip={
                                currentTool === "pen"
                                    ? "Select Eraser"
                                    : "Select Pen"
                            }
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

                        {/* send */}
                        <button
                            className="group border-none h-auto bg-white/60 hover:bg-white/70
                    shadow-gray-300 text-gray-700 p-2 rounded-md text-center
                    flex flex-row justify-center items-center hover:shadow-md
                    text-xl tracking-tight font-semibold hover:scale-105
                    transition-all duration-200 cursor-pointer w-36 gap-2 tooltip tooltip-left"
                            onClick={sendImage}
                            data-tip={"Generate Outfits"}
                        >
                            <p className="group-hover:rotate-6">
                                <FiSend className="font-bold h-6 w-6" />
                            </p>
                            <span>Send</span>
                        </button>
                    </div>

                    {/* google search and pen resizer */}
                    <div className="w-full md:w-1/2 flex justify-center items-center flex-col gap-4 md:gap-8">
                        {/* google */}
                        <div className="w-full flex justify-center">
                            <button
                                className="group border-none h-auto bg-white/60 hover:bg-white/70
                    shadow-gray-300 text-gray-700 p-2 rounded-md text-center
                    flex flex-row justify-center items-center hover:shadow-md
                    text-xl tracking-tight font-semibold hover:scale-105
                    transition-all duration-200 cursor-pointer w-36 gap-2 tooltip tooltip-left"
                                onClick={googleSearch}
                                data-tip={"Search on Google"}
                            >
                                <p className="group-hover:rotate-6">
                                    <AiFillGoogleCircle className="font-bold h-6 w-6" />
                                </p>
                                <span>Search</span>
                            </button>
                        </div>

                        {/* slider */}
                        <div
                            className="w-full tooltip tooltip-top"
                            data-tip={"Pen Size - " + penSize}
                        >
                            <input
                                type="range"
                                min={15}
                                max={40}
                                value={penSize}
                                step={5}
                                className="range range-xs w-11/12 bg-transparent/20"
                                // give style color and background color
                                style={{
                                    color: "#000000",
                                }}
                                onChange={(e) =>
                                    setPenSize(parseInt(e.target.value))
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* chat/api response */}
                {Array.isArray(responses) && responses.length > 0 && (
                    <div className="w-full rounded-xl bg-white/60 hover:bg-white/70 shadow-gray-300 shadow-lg p-4 text-gray-200 relative min-w-80 max-w-3xl">
                        {}
                    </div>
                )}

                {/* prompt / search bar */}
                <div className="w-full rounded-xl bg-white/60 hover:bg-white/70 shadow-gray-300 shadow-lg p-4 text-gray-200 relative min-w-80 max-w-3xl">
                    <div className="relative">
                        <input
                            type="text"
                            id="password"
                            className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="Prompt here..."
                            onChange={(e) => {
                                setOutfitPrompt(e.target.value);
                            }}
                        />
                        <button className="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-200 transition-colors">
                            <TbPhotoSearch className="w-full h-full" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default page;

const blank =
    "data:image/png;base64,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MACCpYtMgAABAgQMAD9AgAABAgSCAgZAsHSRCRAgQICAAeAHCBAgQIBAUMAACJYuMgECBAgQMAD8AAECBAgQCAoYAMHSRSZAgAABAgaAHyBAgAABAkEBAyBYusgECBAgQMAA8AMECBAgQCAoYAAESxeZAAECBAgYAH6AAAECBAgEBQyAYOkiEyBAgAABA8APECBAgACBoIABECxdZAIECBAgYAD4AQIECBAgEBQwAIKli0yAAAECBAwAP0CAAAECBIICBkCwdJEJECBAgIAB4AcIECBAgEBQwAAIli4yAQIECBAwAPwAAQIECBAIChgAwdJFJkCAAAECBoAfIECAAAECQQEDIFi6yAQIECBAwADwAwQIECBAIChgAARLF5kAAQIECBgAfoAAAQIECAQFDIBg6SITIECAAAEDwA8QIECAAIGggAEQLF1kAgQIECBgAPgBAgQIECAQFDAAgqWLTIAAAQIEDAA/QIAAAQIEggIGQLB0kQkQIECAgAHgBwgQIECAQFDAAAiWLjIBAgQIEDAA/AABAgQIEAgKGADB0kUmQIAAAQIGgB8gQIAAAQJBAQMgWLrIBAgQIEDAAPADBAgQIEAgKGAABEsXmQABAgQIGAB+gAABAgQIBAUMgGDpIhMgQIAAAQPADxAgQIAAgaCAARAsXWQCBAgQIGAA+AECBAgQIBAUMACCpYtMgAABAgQMAD9AgAABAgSCAgZAsHSRCRAgQICAAeAHCBAgQIBAUMAACJYuMgECBAgQMAD8AAECBAgQCAoYAMHSRSZAgAABAgaAHyBAgAABAkEBAyBYusgECBAgQMAA8AMECBAgQCAoYAAESxeZAAECBAgYAH6AAAECBAgEBQyAYOkiEyBAgAABA8APECBAgACBoIABECxdZAIECBAgYAD4AQIECBAgEBQwAIKli0yAAAECBAwAP0CAAAECBIICBkCwdJEJECBAgIAB4AcIECBAgEBQwAAIli4yAQIECBAwAPwAAQIECBAIChgAwdJFJkCAAAECBoAfIECAAAECQQEDIFi6yAQIECBAwADwAwQIECBAIChgAARLF5kAAQIECBgAfoAAAQIECAQFDIBg6SITIECAAAEDwA8QIECAAIGggAEQLF1kAgQIECBgAPgBAgQIECAQFDAAgqWLTIAAAQIEDAA/QIAAAQIEggIGQLB0kQkQIECAgAHgBwgQIECAQFDAAAiWLjIBAgQIEDAA/AABAgQIEAgKGADB0kUmQIAAAQIGgB8gQIAAAQJBAQMgWLrIBAgQIEDAAPADBAgQIEAgKGAABEsXmQABAgQIGAB+gAABAgQIBAUMgGDpIhMgQIAAAQPADxAgQIAAgaCAARAsXWQCBAgQIGAA+AECBAgQIBAUMACCpYtMgAABAgQMAD9AgAABAgSCAgZAsHSRCRAgQICAAeAHCBAgQIBAUMAACJYuMgECBAgQMAD8AAECBAgQCAoYAMHSRSZAgAABAgaAHyBAgAABAkEBAyBYusgECBAgQMAA8AMECBAgQCAoYAAESxeZAAECBAgYAH6AAAECBAgEBQyAYOkiEyBAgAABA8APECBAgACBoIABECxdZAIECBAgYAD4AQIECBAgEBQwAIKli0yAAAECBAwAP0CAAAECBIICBkCwdJEJECBAgIAB4AcIECBAgEBQwAAIli4yAQIECBAwAPwAAQIECBAIChgAwdJFJkCAAAECBoAfIECAAAECQQEDIFi6yAQIECBAwADwAwQIECBAIChgAARLF5kAAQIECBgAfoAAAQIECAQFDIBg6SITIECAAAEDwA8QIECAAIGggAEQLF1kAgQIECBgAPgBAgQIECAQFDAAgqWLTIAAAQIEDAA/QIAAAQIEggIGQLB0kQkQIECAgAHgBwgQIECAQFDAAAiWLjIBAgQIEDAA/AABAgQIEAgKGADB0kUmQIAAAQIGgB8gQIAAAQJBAQMgWLrIBAgQIEDAAPADBAgQIEAgKGAABEsXmQABAgQIGAB+gAABAgQIBAUMgGDpIhMgQIAAAQPADxAgQIAAgaCAARAsXWQCBAgQIGAA+AECBAgQIBAUMACCpYtMgAABAgQMAD9AgAABAgSCAgZAsHSRCRAgQICAAeAHCBAgQIBAUMAACJYuMgECBAgQMAD8AAECBAgQCAoYAMHSRSZAgAABAgaAHyBAgAABAkEBAyBYusgECBAgQMAA8AMECBAgQCAoYAAESxeZAAECBAgYAH6AAAECBAgEBQyAYOkiEyBAgAABA8APECBAgACBoIABECxdZAIECBAgYAD4AQIECBAgEBQwAIKli0yAAAECBAwAP0CAAAECBIICBkCwdJEJECBAgIAB4AcIECBAgEBQwAAIli4yAQIECBAwAPwAAQIECBAIChgAwdJFJkCAAAECBoAfIECAAAECQQEDIFi6yAQIECBAwADwAwQIECBAIChgAARLF5kAAQIECBgAfoAAAQIECAQFDIBg6SITIECAAAEDwA8QIECAAIGggAEQLF1kAgQIECBgAPgBAgQIECAQFDAAgqWLTIAAAQIEDAA/QIAAAQIEggIGQLB0kQkQIECAgAHgBwgQIECAQFDAAAiWLjIBAgQIEDAA/AABAgQIEAgKGADB0kUmQIAAAQIGgB8gQIAAAQJBAQMgWLrIBAgQIEDAAPADBAgQIEAgKGAABEsXmQABAgQIGAB+gAABAgQIBAUMgGDpIhMgQIAAAQPADxAgQIAAgaCAARAsXWQCBAgQIGAA+AECBAgQIBAUMACCpYtMgAABAgQMAD9AgAABAgSCAgZAsHSRCRAgQICAAeAHCBAgQIBAUMAACJYuMgECBAgQMAD8AAECBAgQCAoYAMHSRSZAgAABAgaAHyBAgAABAkEBAyBYusgECBAgQMAA8AMECBAgQCAoYAAESxeZAAECBAgYAH6AAAECBAgEBQyAYOkiEyBAgAABA8APECBAgACBoIABECxdZAIECBAgYAD4AQIECBAgEBQwAIKli0yAAAECBAwAP0CAAAECBIICBkCwdJEJECBAgIAB4AcIECBAgEBQwAAIli4yAQIECBAwAPwAAQIECBAIChgAwdJFJkCAAAECBoAfIECAAAECQQEDIFi6yAQIECBAwADwAwQIECBAIChgAARLF5kAAQIECBgAfoAAAQIECAQFDIBg6SITIECAAAEDwA8QIECAAIGggAEQLF1kAgQIECBgAPgBAgQIECAQFDAAgqWLTIAAAQIEDAA/QIAAAQIEggIGQLB0kQkQIECAgAHgBwgQIECAQFDAAAiWLjIBAgQIEDAA/AABAgQIEAgKGADB0kUmQIAAAQIGgB8gQIAAAQJBAQMgWLrIBAgQIEDAAPADBAgQIEAgKGAABEsXmQABAgQIGAB+gAABAgQIBAUMgGDpIhMgQIAAAQPADxAgQIAAgaCAARAsXWQCBAgQIGAA+AECBAgQIBAUMACCpYtMgAABAgQMAD9AgAABAgSCAgZAsHSRCRAgQICAAeAHCBAgQIBAUMAACJYuMgECBAgQMAD8AAECBAgQCAoYAMHSRSZAgAABAgaAHyBAgAABAkEBAyBYusgECBAgQMAA8AMECBAgQCAoYAAESxeZAAECBAgYAH6AAAECBAgEBQyAYOkiEyBAgAABA8APECBAgACBoIABECxdZAIECBAgYAD4AQIECBAgEBQwAIKli0yAAAECBAwAP0CAAAECBIICBkCwdJEJECBAgIAB4AcIECBAgEBQwAAIli4yAQIECBAwAPwAAQIECBAIChgAwdJFJkCAAAECBoAfIECAAAECQQEDIFi6yAQIECBAwADwAwQIECBAIChgAARLF5kAAQIECBgAfoAAAQIECAQFDIBg6SITIECAAIEH9IYCAbVe32sAAAAASUVORK5CYII=";
