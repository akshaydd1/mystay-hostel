"use client";
import SummaryCard from "./components/SummaryCard";
import RentCollectionTable from "./components/RentCollectionTable";
import { HiOutlineCurrencyDollar, HiOutlineCheckCircle, HiOutlineExclamationCircle } from "react-icons/hi";

const RentCollectionMain = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rent Collection</h1>
          <p className="text-gray-500 text-sm mt-1">Monitor payments, track balances, and manage student dues for the 2024 Fall Term.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 font-medium text-sm shadow-sm hover:bg-gray-50">
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm shadow-sm hover:bg-blue-700">
            + Add Record
          </button>
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <SummaryCard
          title="Total Expected"
          value="$45,000.00"
          subtext={"+12% vs last month"}
          icon={<HiOutlineCurrencyDollar className="text-blue-500" />}
        />
        <SummaryCard
          title="Total Collected"
          value="$38,250.00"
          subtext={" "}
          icon={<HiOutlineCheckCircle className="text-green-500" />}
          valueColor="#16A34A"
        />
        <SummaryCard
          title="Outstanding Balance"
          value="$6,750.00"
          subtext={"15% Remaining"}
          icon={<HiOutlineExclamationCircle className="text-orange-400" />}
          valueColor="#EA580C"
          subtextColor="#EA580C"
        />
      </div>
      {/* Table Section */}
      <div className="mt-8">
        <RentCollectionTable />
      </div>
    </div>
  );
};

export default RentCollectionMain;
