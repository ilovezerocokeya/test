import React from "react";
import Select from "react-select";
import { useId } from "react";

interface Option {
  value: string;
  label: string;
}

interface FormMultiSelectProps {
  label: string;
  options: Option[];
  value: Option[];
  onChange: (selectedOptions: Option[]) => void;
  className?: string;
  placeholder?: string;
}

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#3B3D3F",
    border: state.isFocused ? "1px solid #C3E88D" : "1px solid #3B3D3F",
    color: "#919191",
    padding: "2px 8px",
    borderRadius: "7px",
    boxShadow: "none",
    minHeight: "45px",
    "&:hover": {
      borderColor: "#C3E88D",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#3B3D3F",
    borderColor: "#3B3D3F",
    color: "#ffffff",
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "#19191A",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#C4C4C4",
  }),
  multiValueRemove: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? "#5E5E5E" : "#5E5E5E",
    ":hover": {
      backgroundColor: "#19191A",
      color: "#919191",
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#919191",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#ffffff",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "#ffffff",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#19191A" : "#3B3D3F",
    color: state.isFocused ? "#ffffff" : "#ffffff",
    "&:hover": {
      backgroundColor: "#28282A",
    },
  }),
  clearIndicator: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? "#919191" : "#919191",
    padding: "5px",
    cursor: "pointer",
    ":hover": {
      color: "#FF3F02",
    },
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? "#919191" : "#919191",
    padding: "0px",
    cursor: "pointer",
    ":hover": {
      color: "#5E5E5E",
    },
  }),
};

const FormMultiSelect: React.FC<FormMultiSelectProps> = ({
  label,
  options,
  value,
  onChange,
  className,
  placeholder,
}) => {
  const instanceId = useId();

  const handleChange = (selectedOptions: any) => {
    onChange(selectedOptions || []);
  };

  return (
    <div className="mb-4">
      <label className="block text-labelNormal text-sm font-bold mb-2">
        {label}
        <span className="text-red-500 ml-1">*</span>
      </label>
      <Select
        isMulti
        value={value}
        onChange={handleChange}
        options={options}
        styles={customStyles}
        className={className}
        classNamePrefix="select"
        instanceId={instanceId}
        placeholder={placeholder || "선택해주세요"}
        components={{ IndicatorSeparator: () => null }}
      />
    </div>
  );
};

export default FormMultiSelect;
