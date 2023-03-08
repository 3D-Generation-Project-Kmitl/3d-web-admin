import React from "react";
import { Count } from "../types/count";

function CountCard({
  item,
  title,
  icon,
}: {
  item: Count | undefined;
  title: string;
  icon: JSX.Element;
}) {
  return (
    <div className="flex flex-col p-5 bg-white rounded-md shadow-sm">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">{item?.count}</h1>
          <p className="text-gray-500 text-sm">{"จำนวน" + title + "ทั้งหมด"}</p>
        </div>
        <div className="flex items-center p-4 rounded-md bg-primaryLight bg-opacity-50">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default CountCard;
