import React, { useState } from "react";
import UserCard from "../components/UserCard";
import { useGetReports, useCloseReport } from "../hooks/useReport";
import { Report } from "../types/report";

function ReportProduct() {
  const { data: reports } = useGetReports();
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4  gap-4">
      {reports?.map((report) => (
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
