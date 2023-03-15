import React, { useState } from "react";
import UserCard from "../components/UserCard";
import { useGetUsers } from "../hooks/useUser";
import { UserIdentity } from "../types/userIdentity";
import { useBanUser, useUnBanUser } from "../hooks/useUser";
import { AiOutlineSearch } from "react-icons/ai";

function ManageUser() {
  const { data: users } = useGetUsers();
  const [search, setSearch] = useState("");
  function filterUser() {
    return users?.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
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
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {filterUser()?.map((user) => (
          <UserModal key={user.userId} user={user}>
            <UserCard
              picture={user.picture}
              name={user.name}
              email={user.email}
            />
          </UserModal>
        ))}
      </div>
    </div>
  );
}

function UserModal({
  user,
  children,
}: {
  user: UserIdentity;
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const { mutateAsync: banUser } = useBanUser();
  const { mutateAsync: unBanUser } = useUnBanUser();

  function openModal() {
    setShow(true);
  }

  function closeModal() {
    setShow(false);
  }

  function handelBanUser() {
    banUser({
      userId: user.userId,
    });
    closeModal();
  }

  function handelUnBanUser() {
    unBanUser({
      userId: user.userId,
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
                  <div className="flex flex-col items-center p-4">
                    <img
                      className="bg-gray-300 rounded-md w-52 h-52 object-cover"
                      alt="card"
                      src={user.picture}
                    />
                    <div className="h-4"></div>
                    <div className="flex flex-col px-6 justify-between">
                      <div className="flex flex-col gap-3 ">
                        <div className="h-4"></div>
                        <div className="flex flex-row gap-2">
                          <p className="font-semibold">ชื่อแสดง: </p>
                          <p>{user.name}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                          <p className="font-semibold">อีเมล: </p>
                          <p>{user.email}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                          <p className="font-semibold">
                            เลขบัตรประจำตัวประชาชน:
                          </p>
                          <p>{user.Identity?.idCardNumber || "-"}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                          <p className="font-semibold">ชื่อ:</p>
                          <p>{user.Identity?.firstName || "-"}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                          <p className="font-semibold">นามสกุล:</p>
                          <p>{user.Identity?.lastName || "-"}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                          <p className="font-semibold">เบอร์โทรศัพท์มือถือ:</p>
                          <p>{user.Identity?.phone || "-"}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-4 pb-2 mt-5">
                          <button
                            onClick={
                              user.isBan ? handelUnBanUser : handelBanUser
                            }
                            className={`font-semibold w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  rounded-md ${
                              user.isBan ? "bg-green-500" : "bg-red-500"
                            }`}
                          >
                            {user.isBan ? "ยกเลิกการแบน" : "แบนผู้ใช้"}
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

export default ManageUser;
