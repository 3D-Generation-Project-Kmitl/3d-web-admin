import React, { useState } from "react";

const Modal = ({
  onClose,
  children,
  body,
}: {
  onClose: () => void;
  children: React.ReactNode;
  body: React.ReactElement;
}) => {
  const [show, setShow] = useState(false);

  onClose = () => {
    setShow(false);
  };

  return (
    <>
      <div onClick={() => setShow(true)}>{children}</div>
      {show && (
        <div className="bg-black bg-opacity-40 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-4 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <button
                className="ml-auto mr-3 border-0 text-black float-right text-5xl leading-none font-thin  outline-none focus:outline-none"
                onClick={() => {
                  setShow(false);
                }}
              >
                ×
              </button>
              <div className="px-2 pb-1">{body}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
