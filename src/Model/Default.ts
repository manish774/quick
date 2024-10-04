export type ThemeMode = "dark" | "light";
export type size = "large" | "medium" | "small";
export type theme = "primary" | "warning" | "success" | "danger";
export interface tableConfig {
  selectAll?: boolean;
  checkbox?: boolean;
  paginationRequired?: boolean;
  mode?: ThemeMode;
  title: string | JSX.Element;
  columns: ColumnProps[];
  showHeaderCount?: boolean;
  minHeight?: string;
  rowHighLight?: { columnName: string; value: string; bgColor: string };
  filterProps?: tableFilterProps;
}

export interface HoverActionProp {
  name: string;
  onclick: (item: any) => any;
}
export interface ColumnProps {
  render?: (item: any) => JSX.Element | string;
  name: string;
  id: string;
  searchable?: boolean;
  sortable?: boolean;
  hoverAction?: HoverActionProp[];
  hideAble?: boolean;
  hideOnstart?: boolean;
  highLight?: { bgColor?: string; color?: string };
}

export interface TableProps {
  records: any[];
  pageSize: number;
  config: tableConfig;
}
export type optionType = { name: string; value: string };
export type filterColumnTypes = "dropdown" | "inputBox" | "radio";
export type filterColumnProps = {
  name: string;
  type: filterColumnTypes;
  payload?: optionType[];
};
export interface tableFilterProps {
  enable?: boolean;
  columnsToFilter?: filterColumnProps[];
}
