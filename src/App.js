import "./App.css";
import React, { useState, useEffect } from "react";
import f from "./data/data.json";
import TableRow from "./components/tableRow";
import SearchInput from "./components/searchInput";
import { readExcel } from "./utils/functions";
import DragAndDropFileInput from "./components/fileInput";
import Pagination from "./components/pagination";
import ExportAsCsv from "./components/exportAsCsv";

function App() {
  const [items, setItems] = useState(f.data);
  const [titles, setTitles] = useState([]);
  const [filterItem, setFilterItem] = useState("");
  const [filteredItems, setFilteredItems] = useState([]); // items after filter
  const [currentPosts, setCurrentPosts] = useState([]);
  const [currentItemPage, setCurrentItemPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [csvData, setCsvData] = useState([]);
  const postItemPerPage = 30;

  const lastPostIndex = currentItemPage * postItemPerPage;
  const firstPostIndex = lastPostIndex - postItemPerPage;

  useEffect(() => {
    setCurrentPosts(filteredItems.slice(firstPostIndex, lastPostIndex));
  }, [currentItemPage, firstPostIndex, filteredItems, lastPostIndex]);

  useEffect(() => {
    if (Array.isArray(items) && items.length > 0) {
      setTitles(Object.keys(items[0]));
    }
    setFilteredItems(items);
    setTotalPosts(Math.ceil(items.length / postItemPerPage));
  }, [items]);

  function filterItems(items, filterItem) {
    return items.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(filterItem.toLowerCase())
      )
    );
  }
  const handleFilter = (e) => {
    const filterValue = e.target.value;
    setFilterItem(filterValue);
    if (filterItem === "") {
      setFilteredItems(items);
      setTotalPosts(Math.ceil(items.length / postItemPerPage));
      setCurrentItemPage(1);
      return;
    }
    const filteredItems = filterItems(items, filterValue);
    setFilteredItems(filteredItems);
    setTotalPosts(Math.ceil(filteredItems.length / postItemPerPage));
    setCurrentItemPage(1);
  };

  const handlePageClick = (data) => {
    setCurrentItemPage(data.selected + 1);
    setCurrentPosts(filteredItems.slice(firstPostIndex, lastPostIndex));
  };

  const handleExportCsv = () => {
    setCsvData(items);
  };

  return (
    <div>
      <DragAndDropFileInput
        handleChange={(file) => {
          readExcel(file)
            .then((data) => {
              setItems(data);
            })
            .catch((err) => {
              console.log(err);
            });
          setCurrentItemPage(1);
        }}
        types={["xlsx"]}
      />

      <br />
      <div className="input-group p-2">
        <SearchInput onChange={(e) => handleFilter(e)} value={filterItem} placeholder="Search" />
        <ExportAsCsv onClick={handleExportCsv} data={csvData} />
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
      <Pagination
        forcePage={currentItemPage - 1}
        totalPosts={totalPosts}
        handlePageClick={handlePageClick}
      />
    </div>
  );
}

export default App;
