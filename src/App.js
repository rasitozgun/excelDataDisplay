import "./App.css";
import React, { useState, useEffect } from "react";
import f from "./data/data.json";
import TableRow from "./components/TableRow/TableRow";
import SearchInput from "./components/SearchInput/SearchInput";
import { readExcel } from "./utils/functions";
import DragAndDropFileInput from "./components/FileInput/FileInput";
import Pagination from "./components/Pagination/Pagination";
import ExportAsCsv from "./components/ExportAsCsv/ExportAsCsv";
import ExportNumber from "./components/ExportNumber/ExportNumber";

function App() {
  const [items, setItems] = useState(f.data);
  const [titles, setTitles] = useState([]);
  const [filterItem, setFilterItem] = useState("");
  const [filteredItems, setFilteredItems] = useState([]); // items after filter
  const [currentPosts, setCurrentPosts] = useState([]);
  const [currentItemPage, setCurrentItemPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postItemPerPage = 13;

  const lastPostIndex = currentItemPage * postItemPerPage;
  const firstPostIndex = lastPostIndex - postItemPerPage;

  useEffect(() => {
    setCurrentPosts(filteredItems.slice(firstPostIndex, lastPostIndex));
  }, [currentItemPage, firstPostIndex, filteredItems, lastPostIndex]);

  useEffect(() => {
    if (Array.isArray(items) && items.length > 0) {
      setTitles(Object.keys(items[0]).sort());
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

      <div className="input-group p-2">
        <SearchInput onChange={(e) => handleFilter(e)} value={filterItem} placeholder="Search" />
        <ExportNumber max={items.length} />
        <ExportAsCsv  data={items} />
      </div>
      <br />
      <div className="table-wrapper">
        <table className="table table-hover table-striped table-sm table-responsive-sm table-bordered">
          <thead >
            <tr className="text-center">
              {titles?.map((title) => (
                <th scope="col" key={title}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((d,  key) => (
              <TableRow key={key} item={d} />
            ))}
          </tbody>
        </table>
      </div>
          <Pagination
            forcePage={currentItemPage - 1}
            totalPosts={totalPosts}
            handlePageClick={handlePageClick}
          />
    </div>
  );
}

export default App;
