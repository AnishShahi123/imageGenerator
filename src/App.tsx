import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

const FINAL_AI_PROMPT =
  "You will be provided a prompt to generate an image. The prompt is : {prompt}. Your tasks are: -Generate and image based on the prompt. -Do not generate multiple images. -Do not return anything other than the prompted image.";

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-exp-0801	",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "image/png",
};

function App() {
  const [prompt, setPrompt] = useState("");
  // const [imageUrl, setImageUrl] = useState("");

  const generateImage = async () => {
    try {
      const FINAL_PROMPT = FINAL_AI_PROMPT.replace("{prompt}", prompt);
      const response = await model.generateContent(
        FINAL_PROMPT,
        generationConfig
      );
      // setImageUrl(imageObjectURL);
      console.log("Response", response);
    } catch (e) {
      console.error(e);
    }
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
            {/* {imageUrl && (
              <div className="w-full py-8">
                <img src={imageUrl} alt="Generated" className="w-full" />
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
