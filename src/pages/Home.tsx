import React from "react";
import { useCountOrder } from "../hooks/useOrder";
import { useCountUser } from "../hooks/useUser";
import { useCountProduct } from "../hooks/useProduct";
import { useGetTransaction } from "../hooks/useWallet";
import { useGetCategoryProduct } from "../hooks/useCategory";
import CountCard from "../components/CountCard";
import { BsHandbag } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import TransactionItem from "../components/TransactionItem";
import CategoryItem from "../components/CategoryItem";

function Home() {
  const { data: countOrder } = useCountOrder();
  const { data: countUser } = useCountUser();
  const { data: countProduct } = useCountProduct();
  const { data: transactions } = useGetTransaction();
  const { data: categories } = useGetCategoryProduct();

  return (
    <div className="flex flex-col h-full w-full pt-5">
      <div className="grid grid-cols-3 gap-5">
        <CountCard item={countUser} title="ผู้ใช้" icon={<FiUser />} />
        <CountCard item={countProduct} title="สินค้า" icon={<BsHandbag />} />
        <CountCard
          item={countOrder}
          title="รายการสั่งซื้อ"
          icon={<MdOutlineShoppingCart />}
        />
      </div>
      <div className="flex flex-row pb-1 gap-3 overflow-auto">
        <div className="flex flex-col w-2/5 p-5 mt-3 bg-white rounded-md shadow-sm overflow-auto">
          <h1 className="mb-2 font-semibold text-lg">หมวดหมู่สินค้า</h1>
          {categories?.map((category) => (
            <CategoryItem key={category.categoryId} category={category} />
          ))}
        </div>
        <div className="flex flex-col w-3/5 p-5 mt-3 bg-white rounded-md shadow-sm overflow-auto">
          <h1 className="mb-2 font-semibold text-lg">รายการล่าสุด</h1>
          {transactions?.map((transaction) => (
            <TransactionItem
              key={transaction.walletTransactionId}
              transaction={transaction}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
