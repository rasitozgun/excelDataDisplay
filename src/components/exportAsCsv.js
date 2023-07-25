import React from "react";
import { CSVLink } from "react-csv";

export default function ExportAsCsv({ data }) {
  return (
    <div className="form-outline pl-3  mx-3 btn btn-dark">
      <CSVLink data={data} className="text-decoration-none text-white " filename={"untitled.csv"}>
        Export to CSV
      </CSVLink>
    </div>
  );
}
