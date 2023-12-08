import React from "react";
import { CgClose } from "react-icons/cg";

const Drawer = ({ isOpen, setIsOpen, children }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-400 opacity-50 z-40"
          onClick={() => setIsOpen(!open)}
        ></div>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white overflow-y-auto transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(!open)}>
            <CgClose size={30} />
          </button>
        </div>
        {children}
      </div>
    </>
  );
};

export default Drawer;
