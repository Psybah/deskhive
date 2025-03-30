
import React from "react";
import { Loader } from "lucide-react";

const LoadingDisplay = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="glass-card p-10 rounded-2xl shadow-2xl flex flex-col items-center justify-center space-y-4 backdrop-blur-xl bg-white/20 border border-white/30">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-deskhive-orange via-deskhive-royal to-deskhive-orange opacity-30 animate-pulse"></div>
          <Loader size={48} className="text-deskhive-navy animate-spin" />
        </div>
        <h3 className="text-xl font-medium text-deskhive-navy">Loading...</h3>
        <p className="text-deskhive-darkgray/80">Please wait while we prepare your experience</p>
      </div>
    </div>
  );
};

export default LoadingDisplay;
