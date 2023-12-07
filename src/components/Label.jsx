import React from "react";

const Label = ({ children }) => {
  return <label htmlFor={children} className="text-[14px] font-semibold">{children}</label>;
};

export default Label;
