import React from "react";
import dateFormat from "dateformat";

function UserCard({
  picture,
  name,
  dateTime,
}: {
  picture: string;
  name: string;
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
        <p className="text-xs text-gray-600">
          {dateTime &&
            dateFormat(dateTime, "yyyy/mm/dd") +
              " " +
              dateFormat(dateTime, "HH:MM")}
        </p>
      </div>
    </div>
  );
}

export default UserCard;
