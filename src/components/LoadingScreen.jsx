import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loading.json'; // download a Lottie JSON animation

const LoadingScreen = ({ loading }) => {
  const [show, setShow] = useState(loading);

  useEffect(() => {
    setShow(loading);
  }, [loading]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex flex-col items-center justify-center z-50">
      <Lottie animationData={loadingAnimation} loop={true} className="w-32 h-32" />
      <p className="mt-4 text-gray-700 text-lg">Loading...</p>
    </div>
  );
};

export default LoadingScreen;