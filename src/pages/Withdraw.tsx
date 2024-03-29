import React, { useState } from "react";
import UserCard from "../components/UserCard";
import {
  useGetWithdrawTransaction,
  useAcceptWithdrawTransaction,
  useRejectWithdrawTransaction,
} from "../hooks/useWallet";
import { WithdrawTransaction } from "../types/withdrawTransaction";
import { AiOutlineSearch } from "react-icons/ai";
import ConfirmModal from "../components/ConfirmModal";

function Withdraw() {
  const { data: transactions } = useGetWithdrawTransaction();
  const [search, setSearch] = useState("");

  function filterTransaction() {
    return transactions?.filter((transaction) =>
      transaction.User.Identity.firstName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  return (
    <div className="relative">
      <div className="fixed w-full bg-gray-100 pt-3 pb-2">
        <div className="flex items-center w-80 h-9">
          <AiOutlineSearch className="ml-3 w-5 h-5 absolute" color="gray" />
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="ค้นหา"
            type="text"
            className="pl-10 h-full w-full bg-gray-300 border rounded-2xl focus:border-gray-200 focus:ring-gray-100 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
      </div>
      <div className="h-14"></div>
      <div className="grid grid-cols-2 xl:grid-cols-4  gap-4">
        {filterTransaction()?.map((transaction) => (
          <WithdrawModal
            key={transaction.walletTransactionId}
            transaction={transaction}
          >
            <UserCard
              picture={transaction.User.picture}
              name={
                transaction.User.Identity.firstName +
                " " +
                transaction.User.Identity.lastName
              }
              amountMoney={transaction.amountMoney}
              dateTime={transaction.updatedAt}
            />
          </WithdrawModal>
        ))}
      </div>
    </div>
  );
}

function WithdrawModal({
  transaction,
  children,
}: {
  transaction: WithdrawTransaction;
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const [evidence, setEvidence] = useState<File | null>(null);
  const { mutateAsync: acceptWithdrawTransaction } =
    useAcceptWithdrawTransaction();
  const { mutateAsync: rejectWithdrawTransaction } =
    useRejectWithdrawTransaction();

  function openModal() {
    setShow(true);
  }

  function closeModal() {
    setShow(false);
    setEvidence(null);
  }

  async function handelAccept() {
    if (evidence === null) {
      alert("กรุณาอัพโหลดหลักฐานการโอนเงิน");
      return;
    }
    await acceptWithdrawTransaction({
      walletTransactionId: transaction.walletTransactionId,
      evidence,
    });
    closeModal();
  }

  async function handelReject() {
    await rejectWithdrawTransaction({
      walletTransactionId: transaction.walletTransactionId,
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
                  <div className="flex flex-col gap-3 px-6">
                    <div className="flex flex-row gap-2">
                      <p className="font-semibold">ชื่อ - นามสกุล: </p>
                      <p>
                        {transaction.User.Identity.firstName +
                          " " +
                          transaction.User.Identity.lastName}
                      </p>
                    </div>

                    <div className="flex flex-row gap-2">
                      <p className="font-semibold">ธนาคาร:</p>
                      <p>{transaction.User.Identity.bankName}</p>
                    </div>
                    <div className="flex flex-row gap-2">
                      <p className="font-semibold">เลขบัญชี:</p>
                      <p>{transaction.User.Identity.bankAccount}</p>
                    </div>
                    <div className="flex flex-row gap-2">
                      <p className="font-semibold">จำนวนเงิน:</p>
                      <p>
                        {Intl.NumberFormat("th-TH", {
                          style: "currency",
                          currency: "THB",
                          minimumFractionDigits: 0,
                        }).format(transaction.amountMoney)}
                      </p>
                    </div>
                    <div className="h-2"></div>
                    <p className="font-semibold">หลักฐานการโอนเงิน</p>
                    {evidence && (
                      <img
                        className="h-48 object-cover rounded-md"
                        src={URL.createObjectURL(evidence)}
                        alt="evidence"
                      />
                    )}
                    <input
                      type="file"
                      className="text-xs"
                      accept="image/*"
                      onChange={(e) => setEvidence(e.target.files?.[0] ?? null)}
                    />
                    <div className="h-2"></div>
                    <div className="flex flex-row gap-4 pb-2 mt-5 w-full">
                      <ConfirmModal
                        title="ยืนยันการโอนเงินหรือไม่"
                        onConfirm={handelAccept}
                      >
                        <button className="font-semibold w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-md hover:bg-primaryLight focus:outline-none focus:bg-primaryLight">
                          โอนแล้ว
                        </button>
                      </ConfirmModal>
                      <ConfirmModal
                        title="ปฏิเสธการถอนเงินหรือไม่"
                        onConfirm={handelReject}
                      >
                        <button className="font-semibold w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-secondary rounded-md hover:bg-secondaryLight focus:outline-none focus:bg-secondaryLight">
                          ปฏิเสธ
                        </button>
                      </ConfirmModal>
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

export default Withdraw;
