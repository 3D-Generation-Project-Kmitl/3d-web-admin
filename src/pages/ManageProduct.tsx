import React, { useState } from "react";
import UserCard from "../components/UserCard";
import { useGetProducts, useUpdateStatusProduct } from "../hooks/useProduct";
import { Product } from "../types/product";
import { AiOutlineSearch } from "react-icons/ai";

function ManageProduct() {
  const { data: products } = useGetProducts();
  const [search, setSearch] = useState("");

  function filterProduct() {
    return products?.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
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
        {filterProduct()?.map((product) => (
          <ManageProductModal key={product.productId} product={product}>
            <UserCard
              picture={product.Model.picture}
              name={product.name}
              description={product.User.name}
            />
          </ManageProductModal>
        ))}
      </div>
    </div>
  );
}

function ManageProductModal({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const { mutateAsync: updateStatus } = useUpdateStatusProduct();

  function openModal() {
    setShow(true);
  }

  function closeModal() {
    setShow(false);
  }

  async function handleUpdateStatus(status: string) {
    await updateStatus({
      productId: product.productId,
      status: status,
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
                      src={product.Model.picture}
                      alt="product"
                    />
                    <div className="h-1"></div>
                    <div className="flex flex-row gap-2">
                      <p className="font-semibold">ชื่อสินค้า: </p>
                      <p>{product.name}</p>
                    </div>
                    <div className="flex flex-row gap-2">
                      <p className="font-semibold">ผู้ขาย:</p>
                      <p>{product.User.name}</p>
                    </div>
                    <div className="flex flex-row gap-2">
                      <p className="font-semibold">ขายเมื่อ:</p>
                      <p>
                        {new Date(product.createdAt).toLocaleDateString(
                          "th-TH",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div className="h-1"></div>
                    <div className="flex flex-row gap-4 pb-2 mt-5 w-full">
                      <button
                        onClick={
                          product.status === "VIOLATION"
                            ? () => handleUpdateStatus("AVAILABLE")
                            : () => handleUpdateStatus("VIOLATION")
                        }
                        className={`font-semibold w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  rounded-md ${
                          product.status === "VIOLATION"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {product.status === "VIOLATION"
                          ? "ยกเลิกการระงับการขาย"
                          : "ระงับการขาย"}
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

export default ManageProduct;
