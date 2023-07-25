import React from "react";

export default function TableRow({ item }) {
  return (
    <tr className={"text-center"}>
      {Object.keys(item).map((key) => (
        <td key={key}>{typeof item[key] === "boolean" ? (item[key] ? "✓" : "") : item[key]}</td>
      ))}
    </tr>
  );
}
