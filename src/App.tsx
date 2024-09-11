import axios from "axios";
import { useState } from "react";
import { saveAs } from "file-saver";
// import { ImDownload3 } from "react-icons/im";

function App() {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [generatedImageBlob, setGeneratedImageBlob] = useState<Blob>();

  const getBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const generateImage = async () => {
    try {
      if (prompt) {
        const response = await axios.get(
          `https://image.pollinations.ai/prompt/${prompt}`,
          {
            responseType: "blob",
          }
        );
        setGeneratedImageBlob(response.data);
        const base64 = await getBase64(response.data);
        setGeneratedImage(base64 as string);
        setPrompt("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = async () => {
    saveAs(generatedImageBlob as Blob, "generated-image.jpeg");
  };

  return (
    <>
      <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center">
        <div className="relative overflow-hidden w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-24">
          <div className="text-center w-full">
            <h1 className="text-4xl sm:text-6xl font-bold text-neutral-200">
              Enter prompt to generate an Image
            </h1>
            <div className="w-full py-8 flex gap-5">
              <input
                type="text"
                className="w-full p-2 border-2 border-blue rounded-md h-14"
                placeholder="Enter prompt and see magic happen"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button
                className="text-white bg-blue-500 p-4 border rounded-md"
                onClick={generateImage}
              >
                Generate
              </button>
            </div>
            {generatedImage && (
              <>
                <div className="w-full max-w-md mx-auto h-full border rounded-lg">
                  <img
                    src={generatedImage}
                    alt="Generated"
                    className="border rounded-lg"
                  />
                </div>
                <button
                  className="text-white bg-blue-500 p-4 border rounded-md my-5"
                  onClick={handleDownload}
                >
                  Download
                  {/* <ImDownload3 /> */}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
