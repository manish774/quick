import React, { useState } from "react";
import TableFilter from "./TableFilter";
import { optionType, tableFilterProps } from "../../../Model/Default";
// import Toggle from "../../Toggle/Toggle";

interface TableHeaderProps {
  title?: string | JSX.Element;
  searchInTable?: (e: any) => any;
  searchText?: string;
  changeTheme?: (e: any) => any;
  clearInput?: (e: any) => any;
  mode?: string;
  tableFilter?: tableFilterProps;
  filterRecords?: ({ name, value }: optionType) => void;
}
const TableHeader = ({
  searchInTable,
  title,
  clearInput,
  searchText,
  mode,
  changeTheme,
  tableFilter = { enable: false, columnsToFilter: [] },
  filterRecords,
}: TableHeaderProps) => {
  const { enable, columnsToFilter } = tableFilter;

  return (
    <div className="footer-container">
      <div className="table-title">{title}</div>

      <div className="table-controls">
        {enable && columnsToFilter?.length && (
          <TableFilter props={columnsToFilter} filterRecords={filterRecords} />
        )}
        <div className="table-search">
          <div className="input-container" style={{ textAlign: "right" }}>
            <input
              className="search"
              onChange={searchInTable}
              placeholder="search..."
              value={searchText}
            />
            <button
              className={`clear-button ${!searchText && "display-none"}`}
              onClick={clearInput}
            >
              &times;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
