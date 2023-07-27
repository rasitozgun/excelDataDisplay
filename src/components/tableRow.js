import React from "react";

export default function TableRow({ item }) {
  // Anahtarları sırala
  const sortedKeys = Object.keys(item).sort();


  return (
    <tr className={"text-center"}>
      {sortedKeys.map((value, key) => (
        <td key={key}>
          {item[value] && typeof item[value] === "boolean" ? (item[value] ? "✓" : "") : item[value]}
        </td>
      ))}
    </tr>
  );
}