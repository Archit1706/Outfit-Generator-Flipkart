// this api endpoint is hit by a canvas element in the frontend which sends a base64 encoded image
// this endpoint will further hit a backend that resizes the image and return a url for the resized image and later this url will be used to display the image in the frontend on a differnt page
export async function POST(req: Request, res: Response) {
    await fetch("https://backend-api.com/resize-image", {
        method: "POST",
        body: req.body,
    })
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("url", data.url);
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    return new Response(JSON.stringify({ message: "success" }));
}
