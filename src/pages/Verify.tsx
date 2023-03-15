import React, { useState } from "react";
import UserCard from "../components/UserCard";
import { useGetPendingIdentity, useUpdateIdentity } from "../hooks/useIdentity";
import { Identity } from "../types/identity";

function Verify() {
  const { data: pendingIdentity } = useGetPendingIdentity();

  return (
    <div className="grid grid-cols-4 gap-4">
      {pendingIdentity?.map((identity) => (
        <VerifyModal key={identity.userId} identity={identity}>
          <UserCard
            picture={identity.cardFacePicture}
            name={identity.firstName + " " + identity.lastName}
            dateTime={identity.updatedAt}
          />
        </VerifyModal>
      ))}
    </div>
  );
}

function VerifyModal({
  identity,
  children,
}: {
  identity: Identity;
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const { mutateAsync: updateIdentity } = useUpdateIdentity();
  const [issue, setIssue] = useState<string>("");

  function openModal() {
    setShow(true);
  }

  function closeModal() {
    setShow(false);
  }

  function onApprove() {
    updateIdentity({ userId: identity.userId, status: "APPROVED" });
    closeModal();
  }

  function onReject() {
    updateIdentity({
      userId: identity.userId,
      status: "REJECTED",
      issue: issue,
    });
    closeModal();
  }
  return (
    <>
      <div onClick={openModal}>{children}</div>
      {show && (
        <div className="bg-black bg-opacity-40 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-4 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <button
                className="ml-auto mr-3 border-0 text-black float-right text-5xl leading-none font-thin  outline-none focus:outline-none"
                onClick={closeModal}
              >
                ×
              </button>
              <div className="px-2 pb-1">
                <div className="relative pb-6">
                  <div className="grid grid-cols-2 gap-3 divide-x-4 divide-gray-200">
                    <div className="flex flex-col gap-1 pl-6 pr-3">
                      <h3 className="font-semibold">รูปถ่ายบัตรประชาชน</h3>
                      <img
                        className="bg-gray-300 rounded-md h-52 object-cover"
                        alt="card"
                        src={identity.cardPicture}
                      />
                      <div className="h-4"></div>
                      <h3 className="font-semibold">
                        รูปถ่ายบัตรประชาชนคู่กับใบหน้า
                      </h3>
                      <img
                        className="bg-gray-300 rounded-md h-52 object-cover"
                        alt="card face"
                        src={identity.cardFacePicture}
                      />
                    </div>
                    <div className="flex flex-col px-6 justify-between">
                      <div className="flex flex-col gap-3 ">
                        <div className="h-4"></div>
                        <div className="flex flex-row gap-2">
                          <p className="font-semibold">
                            เลขบัตรประจำตัวประชาชน:{" "}
                          </p>
                          <p>{identity.idCardNumber}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                          <p className="font-semibold">ชื่อ: </p>
                          <p>{identity.firstName}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                          <p className="font-semibold">นามสกุล: </p>
                          <p>{identity.lastName}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                          <p className="font-semibold">เบอร์โทรศัพท์มือถือ: </p>
                          <p>{identity.phone}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                          <p className="font-semibold">ธนาคาร: </p>
                          <p>{identity.bankName}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                          <p className="font-semibold">เลขบัญชีธนาคาร: </p>
                          <p>{identity.bankAccount}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p>หมายเหตุ</p>
                        <textarea
                          value={issue}
                          onChange={(e) => setIssue(e.target.value)}
                          rows={5}
                          className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-gray-300"
                          placeholder="ระบุหมายเหตุที่นี่"
                        />
                        <div className="flex flex-row gap-4 pb-2 mt-5">
                          <button
                            onClick={onApprove}
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-md hover:bg-primaryLight focus:outline-none focus:bg-primaryLight"
                          >
                            ยืนยัน
                          </button>
                          <button
                            onClick={onReject}
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-secondary rounded-md hover:bg-secondaryLight focus:outline-none focus:bg-secondaryLight"
                          >
                            ปฏิเสธ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Verify;
