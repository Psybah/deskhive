
import React from "react";

interface LogoFullProps {
  className?: string;
}

const LogoFull: React.FC<LogoFullProps> = ({ className = "" }) => {
  const baseClassName = "font-bold text-2xl";
  const combinedClassName = `${baseClassName} ${className}`;

  return (
    <div className={`flex items-center ${combinedClassName}`}>
      <span className="text-deskhive-navy">Desk</span>
      <span className="text-deskhive-orange">Hive</span>
    </div>
  );
};

export default LogoFull;
