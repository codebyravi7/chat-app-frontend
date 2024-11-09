import { useRef, useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";
import axios from "axios";
const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const [image, setImage] = useState(null);
  // const [imageUrl, setImageUrl] = useState(null);
  let imageUrl = "";
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !image) return;
    if (!image) {
      await sendMessage(message, false);
      setMessage("");
    } else {
      await handleImageUpload();
      await sendMessage(imageUrl, true);
      setImage(null);
      imageUrl = "";
      setMessage("");
    }
  };
  const [mic, setMic] = useState(false);
  const handleMic = (e) => {
    setMic(true);
    e.preventDefault();
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = async (event) => {
      const voiceCommand = event.results[0][0].transcript;
      setMessage(voiceCommand);
      recognition.stop();
      setMic(false);
      return;
    };
    recognition.onerror = (event) => {
      console.error("Error occurred in recognition:", event.error);
    };
    recognition.start();
  };
  const fileInputRef = useRef(null);

  const handleImage = () => {
    // Trigger a click on the hidden file input when the icon is clicked
    fileInputRef.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    //preview of image selected
    setMessage(file.name);
  };
  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "my_preset"); // Use the preset you created
    formData.append("cloud_name", `${import.meta.env.VITE_CLOUD_NAME}`); // Replace with your Cloudinary cloud name
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        formData
      );
      const data = response.data;
      imageUrl = data.secure_url;
      return;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative ">
        <textarea
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white resize-none h-auto"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <>
              {mic ? (
                <i class="fa-solid fa-microphone-slash mr-3"></i>
              ) : (
                <i
                  onClick={handleMic}
                  className="fa-solid fa-microphone-lines mr-3"
                ></i>
              )}

              <i className="fa-solid fa-image mr-3" onClick={handleImage}></i>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
              <i className="fa-solid fa-paper-plane"></i>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;

// STARTER CODE SNIPPET
// import { BsSend } from "react-icons/bs";

// const MessageInput = () => {
// 	return (
// 		<form className='px-4 my-3'>
// 			<div className='w-full'>
// 				<input
// 					type='text'
// 					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
// 					placeholder='Send a message'
// 				/>
// 				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
// 					<BsSend />
// 				</button>
// 			</div>
// 		</form>
// 	);
// };
// export default MessageInput;
