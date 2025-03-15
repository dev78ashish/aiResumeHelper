import React, { useEffect, useState } from "react";
import { XCircle, CheckCircle, AlertCircle, Info, X } from "lucide-react";

const Alert = ({ message, type, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);

      // Add delay for exit animation before actual close
      const exitTimer = setTimeout(() => {
        onClose();
      }, 500);

      return () => clearTimeout(exitTimer);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getAlertStyles = () => {
    switch (type) {
      case "success":
        return "from-green-500 to-green-600 text-white";
      case "error":
        return "from-red-500 to-red-600 text-white";
      case "warning":
        return "from-yellow-500 to-yellow-600 text-black";
      case "info":
        return "from-blue-500 to-blue-400 text-white";
      default:
        return "from-gray-600 to-gray-700 text-white";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-white" />;
      case "error":
        return <XCircle className="h-5 w-5 text-white" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-black" />;
      case "info":
        return <Info className="h-5 w-5 text-white" />;
      default:
        return <Info className="h-5 w-5 text-white" />;
    }
  };

  const getShadowStyle = () => {
    switch (type) {
      case "success":
        return "shadow-green-500/30";
      case "error":
        return "shadow-red-500/30";
      case "warning":
        return "shadow-yellow-500/30";
      case "info":
        return "shadow-blue-500/30";
      default:
        return "shadow-gray-500/30";
    }
  };

  return (
    <div
      className={`
        fixed top-5 right-5 p-3 rounded-lg 
        bg-gradient-to-r ${getAlertStyles()} 
        flex items-center space-x-3 
        ${isExiting ? 'animate-slideOut opacity-0' : 'animate-slideIn opacity-100'}
        transition-all duration-500 ease-in-out z-50
        shadow-lg ${getShadowStyle()}
        border border-white/10 z-100
      `}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-white rounded-full blur-sm opacity-20"></div>
        <div className="relative z-10">
          {getIcon()}
        </div>
      </div>
      <span className="font-medium text-sm">{message}</span>
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(onClose, 500);
        }}
        className="ml-auto text-white/80 hover:text-white transition p-1"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Alert;