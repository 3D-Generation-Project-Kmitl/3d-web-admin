import React, { useState } from "react";
import UserCard from "../components/UserCard";
import { useGetReports, useCloseReport } from "../hooks/useReport";
import { Report } from "../types/report";
import { AiOutlineSearch } from "react-icons/ai";
function ReportProduct() {
  const { data: reports } = useGetReports();
  const [search, setSearch] = useState("");

  function filterReport() {
    return reports?.filter(
      (report) =>
        report.detail.toLowerCase().includes(search.toLowerCase()) ||
        report.User.name.toLowerCase().includes(search.toLowerCase()) ||
        report.Product.name.toLowerCase().includes(search.toLowerCase())
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
        {filterReport()?.map((report) => (
          <ReportProductModal
            key={report.userId + report.productId}
            report={report}
          >
            <UserCard
              picture={report.User.picture}
              name={report.User.name}
              description={report.detail.slice(0, 25) + "..."}
              dateTime={report.updatedAt}
            />
          </ReportProductModal>
        ))}
      </div>
    </div>
  );
}

function ReportProductModal({
  report,
  children,
}: {
  report: Report;
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const { mutateAsync: closeReport } = useCloseReport();

  function openModal() {
    setShow(true);
  }

  function closeModal() {
    setShow(false);
  }

  async function handleCloseReport() {
    await closeReport({
      userId: report.userId,
      productId: report.productId,
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
                    <img
                      className="h-48 w-48 object-cover rounded-md"
                      src={report.Product.Model.picture}
                      alt="product"
                    />
                    <div className="h-1"></div>
                    <div className="flex flex-row gap-2">
                      <p className="font-semibold">ชื่อสินค้า: </p>
                      <p>{report.Product.name}</p>
                    </div>
                    <div className="flex flex-row gap-2">
                      <p className="font-semibold">ผู้รายงาน:</p>
                      <p>{report.User.name}</p>
                    </div>
                    <div className="h-3"></div>
                    <p className="font-semibold">รายละเอียดการรายงาน</p>
                    <p>{report.detail}</p>
                    <div className="h-2"></div>
                    <div className="flex flex-row gap-4 pb-2 mt-5 w-full">
                      <button
                        onClick={handleCloseReport}
                        className="font-semibold w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-md hover:bg-primaryLight focus:outline-none focus:bg-primaryLight"
                      >
                        เสร็จสิ้น
                      </button>
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

export default ReportProduct;
