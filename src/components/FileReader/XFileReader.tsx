import React, { useState } from "react";
import { Input } from "../generic";
// import { Input } from "../components/generic";
import readXlsxFile from "read-excel-file";

interface IXFileReaderProps {
  contentCallback: (data: any) => void;
}

type DataEntry = string[];
type DataArray = DataEntry[];

export type IXFileSupport = "EXCEL";
const XFileReader = ({ contentCallback }: IXFileReaderProps) => {
  const parseJSON = (rows: DataArray) => {
    if (rows.length) {
      const keys = rows[0];
      return rows?.map((d) => {
        const obj: any = {};
        keys.forEach((key: string, i: number) => {
          obj[key] = d[i] || "";
        });
        return obj;
      });
    }
    return;
  };

  const readFileContent = async (e: any) => {
    const selectedFile = (e?.target && e?.target?.files[0]) || null;
    if (selectedFile) {
      try {
        const rows = await readXlsxFile(selectedFile);

        const validateData = rows.map((m) => m?.map((d) => `${d}` || ""));
        console.log(validateData);
        const parsedData = parseJSON(validateData);
        parsedData?.shift();
        contentCallback(parsedData);
      } catch (error) {
        console.error("Error reading Excel file:", error);
      }
    }
  };
  return (
    <div className="xfile-container">
      <Input type="file" onchangeHandler={readFileContent} value={""} />
    </div>
  );
};

export default XFileReader;
