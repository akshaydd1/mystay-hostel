import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import ModalPanel from "./ModalPanel";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

interface FilterPopupProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  list?: typeof defaultCategories;
  inputType?: "checkbox" | "radio";
  activeCheckedValues: string;
  handleValueChange: (value: string) => void;
  handleReset?: () => void;
  handleApply: (value: string) => void;
}

const defaultCategories = [
  {
    label: "Holding Period",
    options: [
      { label: "Up to 1 Month", value: "upto_1_month" },
      { label: "Up to 6 Months", value: "upto_6_months" },
    ],
  },
  {
    label: "Buy/Sell",
    options: [
      { label: "Buy", value: "buy" },
      { label: "Sell", value: "sell" },
    ],
  },
  {
    label: "M.Cap",
    options: [
      { label: "Large Cap", value: "large_cap" },
      { label: "Mid Cap", value: "mid_cap" },
      { label: "Small Cap", value: "small_cap" },
    ],
  },
  {
    label: "Upside %",
    options: [
      { label: "0–10%", value: "0_10" },
      { label: "10–25%", value: "10_25" },
      { label: "25–50%", value: "25_50" },
      { label: "50%+", value: "50_plus" },
    ],
  },
  {
    label: "Stock Price",
    options: [
      { label: "<₹100", value: "lt_100" },
      { label: "₹100–₹500", value: "100_500" },
      { label: "₹500–₹1000", value: "500_1000" },
      { label: "₹1000–₹5000", value: "1000_5000" },
      { label: "₹5000+", value: "5000_plus" },
    ],
  },
  {
    label: "NSE/BSE Indices",
    options: [
      { label: "NSE", value: "all_nse_indices" },
      { label: "BSE", value: "all_bse_indices" },
    ],
  },
];

const FilterPopup = ({
  open,
  setOpen,
  list,
  inputType = "checkbox",
  activeCheckedValues,
  handleValueChange,
  handleReset,
  handleApply,
}: FilterPopupProps) => {
  const categories = list && list.length > 0 ? list : defaultCategories;
  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.label ?? ""
  );
  const [checkedValues, setCheckedValues] = useState<string>(
    activeCheckedValues ?? ""
  );

  const onInternalValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (inputType === "radio") {
      // For radio, only one value should be stored
      setCheckedValues(value);
      handleValueChange(value);
    } else {
      // For checkbox, toggle the value within a comma-separated string store
      const parts = checkedValues
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p.length > 0);
      const set = new Set(parts);
      if (isChecked) {
        set.add(value);
      } else {
        set.delete(value);
      }
      const next = Array.from(set).join(",");
      setCheckedValues(next);
      handleValueChange(next);
    }
  };

  const onReset = () => {
    setCheckedValues("");
    handleValueChange && handleValueChange("");
    handleReset && handleReset();
  };

  const onApply = () => {
    // Pass the current selection string to parent
    handleApply && handleApply(checkedValues);
  };
  return (
    <ModalPanel
      isOpen={open}
      setIsOpen={setOpen}
      containerClassName="w-full max-w-sm rounded-md overflow-hidden"
    >
      <div className="w-full h-full m-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-mo-blue-light border-b border-mo-gray-border">
          <div className="flex items-center gap-2">
            <HiAdjustmentsHorizontal size={24} className="text-mo-text-dark" />
            <h2 className="text-base font-semibold text-mo-text-black">
              Filter
            </h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1 hover:bg-mo-bg-neutral rounded-md transition-colors duration-(--dur-mofsl-fast)"
            aria-label="Close filter"
          >
            <IoClose size={20} className="text-mo-text-dark" />
          </button>
        </div>

        {/* Content */}
        <div className="flex min-h-full max-h-full">
          {/* Left Sidebar - Filter Categories */}
          <div
            className="w-2/5 bg-mo-bg-soft border-r border-mo-gray-border overflow-y-auto scrollbar-hide"
            role="listbox"
          >
            {categories.map((category) => {
              return (
                <button
                  key={category.label}
                  aria-selected={category.label === activeCategory}
                  onClick={() => setActiveCategory(category.label)}
                  className={`w-full text-left px-3 py-4 text-xs transition-colors duration-(--dur-mofsl-fast) border-b border-mo-gray-light focus:outline-none focus:ring-0 cursor-pointer hover:border-t-mo-primary hover:border-b-mo-primary ${
                    category.label === activeCategory
                      ? "bg-mo-bg-neutral text-mo-text-black font-semibold border-t-mo-primary border-b-mo-primary"
                      : "text-mo-text-muted hover:bg-mo-bg-neutral hover:text-mo-black"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
          <div className="w-3/5 bg-mo-white overflow-y-auto px-4 space-y-2 py-2 scrollbar-hide">
            {categories
              .find((category) => category.label === activeCategory)
              ?.options.map((option) => {
                return (
                  <label
                    key={option.value}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <span className="text-sm text-mo-text-dark group-hover:text-mo-text-black">
                      {option.label}
                    </span>
                    <input
                      type={inputType}
                      value={option.value}
                      checked={checkedValues.includes(option.value)}
                      onChange={onInternalValueChange}
                      name={option.label}
                      className={`w-4 h-4 border-2 border-mo-gray-border rounded text-mo-primary focus:ring-0 cursor-pointer ${
                        inputType === "radio" ? "rounded-full" : "rounded"
                      }`}
                      aria-label={`Filter by ${option.label}`}
                    />
                  </label>
                );
              })}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex space-x-3 px-4 py-3 bg-mo-white border-t border-mo-gray-border">
        <button
          onClick={onReset}
          className="w-1/2 py-2.5 text-sm font-medium cursor-pointer text-mo-primary bg-mo-white border-2 border-mo-primary rounded-lg hover:bg-mo-bg-soft focus:outline-none focus:ring-0 transition-colors duration-(--dur-mofsl-fast)"
        >
          Reset
        </button>
        <button
          onClick={onApply}
          className="w-1/2 py-2.5 text-sm font-medium cursor-pointer text-mo-primary-text bg-mo-primary rounded-lg hover:bg-mo-blue-secondary focus:outline-none focus:ring-0 transition-colors duration-(--dur-mofsl-fast)"
        >
          Apply
        </button>
      </div>
    </ModalPanel>
  );
};

export default FilterPopup;
