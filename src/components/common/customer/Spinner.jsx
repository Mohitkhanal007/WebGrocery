import React from "react";

const Spinner = ({ size = 40, className = "" }) => (
  <div className={`flex items-center justify-center ${className}`} role="status" aria-label="Loading">
    <svg
      className="animate-spin"
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="#a259d9"
        strokeWidth="5"
        strokeDasharray="31.4 31.4"
        strokeLinecap="round"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);

export default Spinner; 