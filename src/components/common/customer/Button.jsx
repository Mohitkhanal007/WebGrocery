import React from "react";

const base =
  "inline-block px-6 py-2 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400";

const variants = {
  primary:
    "bg-purple-700 text-white hover:bg-purple-800 active:bg-purple-900",
  secondary:
    "bg-white text-purple-700 border border-purple-700 hover:bg-purple-50 active:bg-purple-100",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
  success:
    "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => (
  <button className={`${base} ${variants[variant] || ""} ${className}`} {...props}>
    {children}
  </button>
);

export default Button; 