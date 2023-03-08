import React from "react";
import { Transaction } from "../types/transaction";
import { MdShoppingCart } from "react-icons/md";
import { BsCurrencyBitcoin } from "react-icons/bs";
import dateFormat from "dateformat";

function TransactionItem({ transaction }: { transaction: Transaction }) {
  return (
    <div className="grid grid-cols-3 items-center p-4 my-1 bg-gray-50 rounded-md shadow-sm">
      <div className="flex gap-4 items-center">
        <div className="bg-primaryLight p-2 rounded-full shadow-xl">
          {transaction.type === "WITHDRAW" ? (
            <BsCurrencyBitcoin color="white" size={27} />
          ) : (
            <MdShoppingCart color="white" size={27} />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm">
            {transaction.type === "WITHDRAW" ? "ถอนเงิน" : "คำสั่งซื้อ"}
          </p>
          <p className="text-xs text-gray-600">
            {dateFormat(transaction.createdAt, "hh:MM")}
          </p>
        </div>
      </div>
      <p className="flex justify-center text-xs">
        {dateFormat(transaction.createdAt, "yyyy/mm/dd")}
      </p>
      <p className="flex justify-end text-sm">
        {transaction.type === "WITHDRAW" ? "- " : "+ "}
        {Intl.NumberFormat("th-TH", {
          style: "currency",
          currency: "THB",
          minimumFractionDigits: 0,
        }).format(transaction.amountMoney)}
      </p>
    </div>
  );
}

export default TransactionItem;
