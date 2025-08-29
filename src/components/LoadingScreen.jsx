import React, { useState, useEffect } from 'react';
const LoadingScreen = ({ loading }) => {
  const [show, setShow] = useState(loading);

  useEffect(() => {
    setShow(loading);
  }, [loading]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-700 text-lg">Loading...</p>
    </div>
  );
};

export default LoadingScreen;