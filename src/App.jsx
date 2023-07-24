import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import f from "./data/data.json";
import ReactPaginate from "react-paginate";

function App() {
  const [items, setItems] = useState(f.data);
  const [titles, setTitles] = useState([]);
  const [filterItem, setFilterItem] = useState("");
  const [currentPosts, setCurrentPosts] = useState([]);
  const [currentItemPage, setCurrentItemPage] = useState(1);
  const postItemPerPage = 30;

  const fileInputRef = useRef(null);

  const handleFileChange = () => {
    const file = fileInputRef.current?.files[0];
    if (file) {
      readExcel(file);
      setCurrentItemPage(1);
    }
  };

  const lastPostIndex = currentItemPage * postItemPerPage;
  const firstPostIndex = lastPostIndex - postItemPerPage;

  useEffect(() => {
    setCurrentPosts(items.slice(firstPostIndex, lastPostIndex));
  }, [currentItemPage, filterItem, firstPostIndex, items, lastPostIndex]);

  useEffect(() => {
    if (Array.isArray(items) && items.length > 0) {
      setTitles(Object.keys(items[0]));
    }
  }, [items, titles]);

  function readExcel(file) {
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
      setItems(d);
    });
  }

  const totalPosts = Math.ceil(items.length / postItemPerPage);

  const handleFilter = (e) => {
    setFilterItem(e.target.value);
  };

  const handlePageClick = (data) => {
    setCurrentItemPage(data.selected + 1);
  };
  function filterItems(items, filterItem, firstPostIndex, lastPostIndex) {
    return items
      .filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(filterItem.toLowerCase())
        )
      )
      .slice(firstPostIndex, lastPostIndex);
  }

  useEffect(() => {
    setCurrentPosts(filterItems(items, filterItem, firstPostIndex, lastPostIndex));
    setCurrentItemPage(1); // Reset the current page to the first page after filtering
  }, [filterItem, items, firstPostIndex, lastPostIndex]);

  const TableRow = React.memo(({ item }) => (
    <tr className={"text-center"}>
      {Object.keys(item).map((key) => (
        <td key={key}>{typeof item[key] === "boolean" ? (item[key] ? "✓" : "") : item[key]}</td>
      ))}
    </tr>
  ));

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
          setCurrentItemPage(1);
        }}
      />
      <br />
      <br />
      <div className="input-group">
        <div className="form-outline ">
          <input
            type="search"
            value={filterItem}
            ref={fileInputRef}
            onChange={(e) => handleFileChange(e)}
            onInput={(e) => handleFilter(e)}
            className={"form-control justify-content-center"}
            placeholder="Search"
          />
        </div>
      </div>
      <br />
      <table className="table table-hover table-striped table-sm table-responsive-sm table-bordered">
        <thead>
          <tr className={"text-center"}>
            {titles?.map((title) => (
              <th scope="col" key={title}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((d, key) => (
            <TableRow key={key} item={d} />
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={totalPosts}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
        activeLinkClassName={"page-link"}
      />
    </div>
  );
}

export default App;
