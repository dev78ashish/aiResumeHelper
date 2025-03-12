import React, { useEffect } from "react";

const Alert = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Hide alert after 3 seconds
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getAlertStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-black";
      case "info":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className={`fixed z-100 top-5 right-5 p-4 rounded-lg shadow-lg ${getAlertStyles()} transition-transform transform animate-slideIn`}>
      <span>{message}</span>
    </div>
  );
};

export default Alert;
