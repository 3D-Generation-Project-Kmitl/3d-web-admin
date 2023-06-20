import React, { useState } from "react";

const ConfirmModal = ({
  children,
  title,
  content = "",
  onConfirm,
}: {
  children: React.ReactNode;
  title: String;
  content?: String;
  onConfirm: () => void;
}) => {
  const [show, setShow] = useState(false);

  function handleConfirm() {
    setShow(false);
    onConfirm();
  }

  return (
    <div className="w-full">
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
              <div className="px-8 pb-4 pt-1">
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold">{title}</h2>
                  <p className="text-sm">{content}</p>
                  <div className="h-2"></div>
                  <div className="flex flex-row gap-4 pb-2 mt-5 w-full">
                    <button
                      onClick={handleConfirm}
                      className="font-semibold w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-md hover:bg-primaryLight focus:outline-none focus:bg-primaryLight"
                    >
                      ยืนยัน
                    </button>
                    <button
                      onClick={() => setShow(false)}
                      className="font-semibold w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-secondary rounded-md hover:bg-secondaryLight focus:outline-none focus:bg-secondaryLight"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmModal;
