import React, { useEffect, useState } from "react";

const Loading = () => {
  const [waves, setWaves] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setWaves((prevWaves) => {
        const newWave = {
          id: Date.now(),
          opacity: 0.8,
        };
        return [...prevWaves, newWave];
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (waves.length > 0) {
      const timeoutId = setTimeout(() => {
        setWaves((prevWaves) => prevWaves.slice(1));
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [waves]);

  return (
    <div className="w-screen flex justify-center items-center h-screen bg-gray-800 overflow-hidden">
      <div className="relative w-72 h-72 flex justify-center items-center">
        {waves.map((wave) => (
          <div
            key={wave.id}
            className=" bg-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-blue-500 rounded-full animate-wave"
            style={{
              animation: "wave 3s linear forwards",
            }}
          ></div>
        ))}
        <div
          className="z-10 w-16"
          style={{
            animation: "pulse-image 2s linear forwards infinite",
          }}
        >
          <img className="rounded-full" src="/logo.webp" alt="Logo" />
        </div>
      </div>
    </div>
  );
};

const keyframes = `
  @keyframes wave {
    0% {
      width: 0;
      height: 0;
      opacity: 0.8;
    }
    100% {
      width: 22rem;
      height: 22rem;
      opacity: 0;
    }
  }

  @keyframes pulse-image {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const App = () => (
  <>
    <style>{keyframes}</style>
    <Loading />
  </>
);

export default App;
