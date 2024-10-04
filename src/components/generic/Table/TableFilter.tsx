import React, { useState } from "react";
import { FaFilter, FaFilterCircleXmark } from "react-icons/fa6";
import { IoMdRefresh } from "react-icons/io";
import Input from "../Input";
import {
  filterColumnProps,
  filterColumnTypes,
  optionType,
} from "../../../Model/Default";

interface TableFilterProps {
  props: filterColumnProps[];
  filterRecords: any;
  enableRefreshTable?: boolean;
}

interface IElementTypes {
  inputBox: boolean;
  dropdown: boolean;
}
const TableFilter = ({
  props,
  filterRecords,
  enableRefreshTable = false,
}: TableFilterProps) => {
  const [filterEnabled, setFilterEnabled] = useState<boolean>(false);
  const [showFilterContent, setShowFilterContent] = useState(false);
  const handleFilterStatus = (status: boolean) => {
    setFilterEnabled(status);
  };
  const [elementTypesStatus, setElementTypesStatus] = useState<IElementTypes>();

  const [showFilterPanel, setShowFilterPanel] = useState<boolean>(false);
  const [currentFilterElementType, setCurrentFilterElementType] =
    useState<string>();
  const showSearchInputElement = (name: string, type: filterColumnTypes) => {
    setCurrentFilterElementType(name);
    if (type === "inputBox") {
      setElementTypesStatus({ dropdown: false, inputBox: true });
    }
    if (type === "dropdown") {
      setElementTypesStatus({ dropdown: true, inputBox: false });
    }
  };

  const dropdownObjectAsPerRecords = () => {
    const ob: Record<string, optionType[]> = {};
    props?.map((m) => {
      if (m.type === "dropdown" && m.name && m?.payload) {
        ob[m.name] = m.payload;
      }
    });
    return ob;
  };

  const onChangeValuesOnFilter = ({ name, value }: optionType) => {
    debugger;
    filterRecords({ name, value });
  };
  return (
    <div style={{ position: "relative", display: "flex", gap: "30px" }}>
      {filterEnabled && (
        <p
          style={{ fontSize: "10px" }}
          onClick={() => {
            setShowFilterPanel(true);
            setShowFilterContent((prev) => !prev);
          }}
        >
          Filter
        </p>
      )}
      {enableRefreshTable && (
        <IoMdRefresh
          size={25}
          color={"#2C3E50"}
          onClick={() => {
            alert();
          }}
        />
      )}
      {!filterEnabled && (
        <FaFilter
          size={25}
          color={"#1A237E"}
          onClick={() => handleFilterStatus(true)}
        />
      )}
      {filterEnabled && (
        <FaFilterCircleXmark
          size={25}
          color={"#1A237E"}
          onClick={() => {
            handleFilterStatus(false);
            setShowFilterContent(false);
            setElementTypesStatus({ dropdown: false, inputBox: false });
            onChangeValuesOnFilter({ name: "", value: "" });
          }}
        />
      )}
      {showFilterContent && (
        <div
          className="filter-content"
          style={{
            width: "200px",
            position: "absolute",
            top: "100%",
            left: "0",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "10px",
            zIndex: 999,
          }}
        >
          ------------
          {showFilterPanel &&
            (props || [])?.map((elm) => (
              <div
                key={elm.name}
                onClick={() => {
                  showSearchInputElement(elm?.name, elm?.type);
                  setShowFilterPanel(false);
                }}
              >
                {elm.name}
              </div>
            ))}
          {elementTypesStatus?.inputBox && (
            <input
              onBlur={(e) => {
                e &&
                  onChangeValuesOnFilter({
                    name: e?.target.name,
                    value: e.target.value,
                  });
              }}
              name={currentFilterElementType}
              placeholder={currentFilterElementType}
            />
          )}
          {elementTypesStatus?.dropdown && (
            <select
              name={currentFilterElementType}
              onBlur={(e) => {
                e &&
                  onChangeValuesOnFilter({
                    name: e?.target.name,
                    value: e.target.value,
                  });
              }}
            >
              <option value={""}>Select</option>
              {currentFilterElementType &&
                dropdownObjectAsPerRecords()[currentFilterElementType].map(
                  (m) => <option value={m.value}>{m.name}</option>
                )}
            </select>
          )}
        </div>
      )}
    </div>
  );
};

export default TableFilter;
