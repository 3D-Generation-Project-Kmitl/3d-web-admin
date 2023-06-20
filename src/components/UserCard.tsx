import React from "react";
import dateFormat from "dateformat";

function UserCard({
  picture,
  name,
  email,
  description,
  amountMoney,
  dateTime,
}: {
  picture: string;
  name: string;
  email?: string;
  description?: string;
  amountMoney?: number;
  dateTime?: Date;
}) {
  return (
    <div className="flex flex-row items-center cursor-pointer w-full gap-4 p-3 bg-white rounded-md shadow-sm">
      <img
        alt="profile"
        className="rounded-md w-16 h-16 object-cover"
        src={picture}
      />
      <div className="flex flex-col gap-2">
        <h3>{name}</h3>
        {description && <p className="text-xs text-gray-600">{description}</p>}
        {amountMoney && (
          <p className="text-xs font-semibold text-black">
            {Intl.NumberFormat("th-TH", {
              style: "currency",
              currency: "THB",
              minimumFractionDigits: 0,
            }).format(amountMoney)}
          </p>
        )}
        {dateTime && (
          <p className="text-xs text-gray-600">
            {dateFormat(dateTime, "yyyy/mm/dd") +
              " " +
              dateFormat(dateTime, "HH:MM")}
          </p>
        )}
        {email && <p className="text-xs text-gray-600">{email}</p>}
      </div>
    </div>
  );
}

export default UserCard;
