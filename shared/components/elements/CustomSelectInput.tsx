"use client";

import { useState, useCallback } from "react";
import CreatableSelect from "react-select/creatable";

export interface SelectOption {
  readonly label: string;
  readonly value: string;
  readonly meta?: Record<string, unknown>;
}

export interface CustomSelectInputProps {
  /** Current selected value(s). Provide array for multi, single option for single select, or null */
  value: SelectOption | SelectOption[] | null;
  /** Available options. Can be:
   * - SelectOption[] (existing shape)
   * - string[] (each string becomes { label: str, value: slug(str) })
   * - Record<string, any>[] (object arrays; extractor tries label/value keys or first primitive value)
   */
  options: SelectOption[] | string[] | Record<string, any>[];
  /** Optional custom extractor for object options; receives raw item & index and must return SelectOption */
  optionExtractor?: (item: any, index: number) => SelectOption;
  /** Fired when selection changes (already normalized) */
  onChange: (value: SelectOption | SelectOption[] | null) => void;
  /** Fired when a new option is created. Return false to cancel creation. */
  onCreateOption?: (label: string, newOption: SelectOption) => void | boolean;
  /** If true, allows multiple selection */
  isMulti?: boolean;
  /** Disable control */
  disabled?: boolean;
  /** Show loading state (external override) */
  loading?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Allow clearing selection */
  isClearable?: boolean;
  /** Transform the created option label before storing */
  createTransform?: (rawLabel: string) => string;
  /** Additional react-select props passthrough */
  // Additional props forwarded to the underlying select (loosely typed to avoid version mismatch issues)
  selectProps?: Record<string, any>;
  /** Optional extra class for outer wrapper */
  className?: string;
  /** Render full width (adds w-full) */
  fullWidth?: boolean;
  /** Override classes for internal react-select elements */
  controlClassName?: string;
  menuClassName?: string;
  optionClassName?: string;
  multiValueClassName?: string;
  dropdownIndicatorClassName?: string;
  clearIndicatorClassName?: string;
}

function normalizeValue(
  value: SelectOption | SelectOption[] | null,
  isMulti: boolean
): SelectOption[] | SelectOption | null {
  if (isMulti) {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }
  if (Array.isArray(value)) return value[0] || null;
  return value;
}

function makeOption(
  label: string,
  transform?: (raw: string) => string
): SelectOption {
  const final = transform ? transform(label) : label.trim();
  return {
    label: final,
    value: final.toLowerCase().replace(/[^a-z0-9_-]+/gi, "-"),
  };
}

const CustomSelectInput = ({
  value,
  options,
  optionExtractor,
  onChange,
  onCreateOption,
  isMulti = false,
  disabled = false,
  loading: loadingProp = false,
  placeholder = "Select...",
  isClearable = true,
  createTransform,
  selectProps = {},
  className = "",
  fullWidth = true,
  controlClassName,
  menuClassName,
  optionClassName,
  multiValueClassName,
  dropdownIndicatorClassName,
  clearIndicatorClassName,
}: CustomSelectInputProps) => {
  const [creating, setCreating] = useState(false);

  const internalValue = normalizeValue(value, isMulti);

  // Normalize incoming options (support string[] and object[])
  const normalizedOptions: SelectOption[] = (() => {
    if (!options) return [];
    // If already SelectOption[] (duck typing: has label & value on first item)
    if (
      Array.isArray(options) &&
      options.length > 0 &&
      "label" in (options as any)[0] &&
      "value" in (options as any)[0]
    ) {
      return options as SelectOption[];
    }
    // String[] -> map directly
    if (Array.isArray(options) && typeof options[0] === "string") {
      return (options as string[]).map((s) =>
        makeOption(String(s), createTransform)
      );
    }
    // Object[] -> use extractor or heuristic
    if (Array.isArray(options) && typeof options[0] === "object") {
      return (options as Record<string, any>[]).map((obj, idx) => {
        if (optionExtractor) return optionExtractor(obj, idx);
        const labelCandidate =
          obj.label ??
          obj.name ??
          obj.title ??
          obj.stateName ??
          obj.cityName ??
          obj.StateName ??
          obj.CityName;
        const valueCandidate = obj.value ?? obj.id ?? labelCandidate;
        const label = String(labelCandidate ?? valueCandidate ?? `item-${idx}`);
        return {
          label,
          value: String(valueCandidate ? valueCandidate : label)
            .toLowerCase()
            .replace(/[^a-z0-9_-]+/gi, "-"),
          meta: obj,
        } as SelectOption;
      });
    }
    return [];
  })();

  const handleChange = useCallback(
    (newValue: any) => {
      if (isMulti) {
        onChange((newValue as SelectOption[]) || []);
      } else {
        onChange((newValue as SelectOption) || null);
      }
    },
    [isMulti, onChange]
  );

  const handleCreate = useCallback(
    (inputLabel: string) => {
      const newOption = makeOption(inputLabel, createTransform);
      const allow = onCreateOption
        ? onCreateOption(inputLabel, newOption)
        : true;
      if (allow === false) return;
      setCreating(true);
      // Simulate async creation – replace with real API if needed
      setTimeout(() => {
        setCreating(false);
        if (isMulti) {
          const current = Array.isArray(internalValue) ? internalValue : [];
          onChange([...current, newOption]);
        } else {
          onChange(newOption);
        }
      }, 300);
    },
    [onCreateOption, createTransform, isMulti, internalValue, onChange]
  );

  // Lightweight classnames helper (avoid external dependency)
  const cx = (...parts: (string | false | null | undefined)[]) =>
    parts.filter(Boolean).join(" ");

  return (
    <div className={cx(fullWidth && "w-full", className)}>
      <CreatableSelect
        isClearable={isClearable}
        isDisabled={disabled || creating || loadingProp}
        isLoading={creating || loadingProp}
        onChange={handleChange as any}
        onCreateOption={handleCreate}
        options={normalizedOptions as any}
        value={internalValue as any}
        isMulti={isMulti}
        placeholder={placeholder}
        classNamePrefix="cs"
        className="cs-root"
        /** Tailwind-driven styling using classNames API (react-select v5+) */
        classNames={{
          control: (state) =>
            cx(
              "min-h-[38px] max-h-[4rem] flex rounded-md border px-0 gap-2 bg-white text-sm shadow-sm transition-colors",
              "border-gray-300 hover:border-gray-400",
              state.isFocused && "border-mo-primary ring-0 outline-none",
              disabled && "bg-gray-100 cursor-not-allowed opacity-60",
              controlClassName
            ),
          valueContainer: () => "py-1 gap-1",
          singleValue: () => "text-gray-700 text-sm",
          placeholder: () => "text-gray-400 text-sm",
          input: () => "text-gray-800 text-sm",
          indicatorsContainer: () => "gap-1",
          clearIndicator: () =>
            cx(
              "text-gray-500 hover:text-red-600 cursor-pointer transition-colors",
              clearIndicatorClassName
            ),
          dropdownIndicator: () =>
            cx(
              "text-gray-500 hover:text-gray-700 transition-transform",
              dropdownIndicatorClassName
            ),
          menu: () =>
            cx(
              "mt-2 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-50",
              menuClassName
            ),
          menuList: () => "py-1 text-xs",
          option: (state) =>
            cx(
              "px-3 py-2 text-sm cursor-pointer select-none",
              state.isSelected
                ? "bg-blue-600 text-white"
                : state.isFocused
                ? "bg-blue-50 text-gray-800"
                : "text-gray-700",
              "active:bg-blue-100",
              optionClassName
            ),
          multiValue: () =>
            cx(
              "flex items-center bg-blue-100 rounded px-2 py-0.5 text-blue-700 text-xs",
              multiValueClassName
            ),
          multiValueLabel: () => "truncate",
          multiValueRemove: () =>
            "ml-1 text-blue-600 hover:text-blue-800 cursor-pointer",
          noOptionsMessage: () => "text-xs text-gray-500 p-2",
        }}
        styles={{
          // minimal style bridging to ensure tailwind sizing for multi
          multiValue: (base) => ({ ...base, maxWidth: "12rem" }),
        }}
        {...selectProps}
      />
    </div>
  );
};

export default CustomSelectInput;
