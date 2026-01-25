'use client';

import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { TbArrowsSort } from 'react-icons/tb';
import { SortOption, SortContext, getSortOptionsByContext } from './sort.config';

interface SortPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  onApply?: (selectedSort: string) => void;
  onReset?: () => void;
  defaultSort?: string;
  context?: SortContext; // determines which sort options to show
  options?: SortOption[]; // external override (e.g., API)
  animate?: boolean; // enable slide-down animation
}

export default function SortPanel({
  isOpen = true,
  onClose,
  onApply,
  onReset,
  defaultSort = 'latest',
  context = 'default',
  options,
  animate = true,
}: SortPanelProps) {
  const computedOptions = options || getSortOptionsByContext(context);
  const effectiveDefault = computedOptions.find(o => o.value === defaultSort)?.value || computedOptions[0]?.value || '';
  const [selectedSort, setSelectedSort] = useState<string>(effectiveDefault);

  // Update selectedSort if options change and current value no longer exists
  useEffect(() => {
    if (!computedOptions.some(o => o.value === selectedSort)) {
      setSelectedSort(computedOptions[0]?.value || '');
    }
  }, [computedOptions, selectedSort]);

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
  };

  const handleReset = () => {
    setSelectedSort(defaultSort);
    onReset?.();
  };

  const handleApply = () => {
    onApply?.(selectedSort);
  };

  if (!isOpen || computedOptions.length === 0) return null; // hide if no sorts for context (e.g., reports)

  return (
  <div className={`w-full bg-mo-white rounded-lg overflow-hidden flex flex-col ${animate ? 'panel-enter' : ''}`}>      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-mo-blue-light border-b border-mo-gray-border">
        <div className="flex items-center gap-2 max-h-[72px]">
          <TbArrowsSort size={24} className="text-mo-text-dark" />
          <h2 className="text-base font-semibold text-mo-text-black">Sort</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-mo-bg-neutral rounded-md transition-colors duration-(--dur-mofsl-fast)"
          aria-label="Close sort"
        >
          <IoClose size={20} className="text-mo-text-dark" />
        </button>
      </div>

      {/* Sort Options Body */}
      <div className="flex flex-1 min-h-[200px] max-h-[200px]">
        <div className="flex-1 bg-mo-white overflow-y-auto p-4 space-y-2 scrollbar-hide" role="radiogroup" aria-label="Sort options">
          {computedOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center justify-between cursor-pointer group py-3 px-2 hover:bg-mo-bg-soft rounded-md transition-colors duration-(--dur-mofsl-fast)"
            >
              <span className="text-sm text-mo-text-dark group-hover:text-mo-text-black">
                {option.label}
              </span>
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={selectedSort === option.value}
                onChange={() => handleSortChange(option.value)}
                className="w-5 h-5 border-2 border-mo-gray-border text-mo-primary focus:ring-2 focus:ring-mo-primary focus:ring-offset-0 cursor-pointer rounded-full"
                aria-label={`Sort by ${option.label}`}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex gap-3 px-4 py-3 bg-mo-white border-t border-mo-gray-border">
        <button
          onClick={handleReset}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-mo-primary bg-mo-white border-2 border-mo-primary rounded-lg hover:bg-mo-bg-soft focus:outline-none focus:ring-2 focus:ring-mo-primary focus:ring-offset-2 transition-colors duration-(--dur-mofsl-fast)"
        >
          Reset
        </button>
        <button
          onClick={handleApply}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-mo-primary-text bg-mo-primary rounded-lg hover:bg-mo-blue-secondary focus:outline-none focus:ring-2 focus:ring-mo-primary focus:ring-offset-2 transition-colors duration-(--dur-mofsl-fast)"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
