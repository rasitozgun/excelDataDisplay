import "./App.css";
import React, { useState } from "react";
import * as XLSX from "xlsx";

function App() {
  const [items, setItem] = useState([]);
  const [searchItem, setSearchItem] = useState([]);
  const [filterItem, setFilterItem] = useState("");
  const rgx = new RegExp(/^\d....\d/gi);
  const regex = /[a-z]/g;

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { raw: true });
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      console.log(d[0]);
      setItem(d);
      setSearchItem(d);
    });
  };

  const handleFilter = (e) => {
    if (e.target.value === "") {
      setItem(searchItem);
    } else if (rgx.test(e.target.value)) {
      const filterResult = searchItem.filter((item) =>
        item.ISSN.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setItem(filterResult);
    } else if (regex.test(e.target.value)) {
      const filterResult = searchItem.filter((item) =>
        item["Başlık"].toLowerCase().includes(e.target.value.toLowerCase())
      );
      setItem(filterResult);
    }
    setFilterItem(e.target.value);
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      <br />
      <br />
      <div className="input-group">
        <div className="form-outline">
          <input
            type="search"
            value={filterItem}
            onInput={(e) => handleFilter(e)}
            className="form-control"
            placeholder="Search"
          />
        </div>
      </div>
      <br />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">SNO</th>
            <th scope="col">Başlık</th>
            <th scope="col">Kısa Başlık</th>
            <th scope="col">MEP</th>
            <th scope="col">Ödeme</th>
            <th scope="col">ISSN</th>
            <th scope="col">EISSN</th>
            <th scope="col">AHCI?</th>
            <th scope="col">SOC?</th>
            <th scope="col">SCI</th>
            <th scope="col">q1</th>
            <th scope="col">q2</th>
            <th scope="col">q3</th>
            <th scope="col">q4</th>
            <th scope="col">Yıl</th>
          </tr>
        </thead>
        <tbody>
          {items.slice(0, 30).map((d) => (
            <tr key={d.Sno}>
              <th scope="row">{d.Sno}</th>
              <td>{d["Başlık"]}</td>
              <td>{d["Kısa Başlık"]}</td>
              <td>{d.MEP}</td>
              <td>{d["Ödeme"]}</td>
              <td>{d.ISSN}</td>
              <td>{d.EISSN}</td>
              <td>{d["AHCI?"] ? "✓" : ""}</td>
              <td>{d["SOC?"] ? "✓" : ""}</td>
              <td>{d.SCI ? "✓" : ""}</td>
              <td>{d.q1 ? "✓" : ""}</td>
              <td>{d.q2 ? "✓" : ""}</td>
              <td>{d.q3 ? "✓" : ""}</td>
              <td>{d.q4 ? "✓" : ""}</td>
              <td>{d["Yıl"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
