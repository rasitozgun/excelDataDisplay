import React, { useState } from "react";
import ReactPaginate from "react-paginate";

export default function PaginationWithSelect({ totalPosts, handlePageClick, initialPage, forcePage }) {
  const [selectedPage, setSelectedPage] = useState(initialPage);

  const handleSelectChange = (event) => {
    const selectedValue = parseInt(event.target.value);
    setSelectedPage(selectedValue);
    handlePageClick({ selected: selectedValue - 1 });
  };

  return (
    <div className="container d-flex mt-2 justify-content-center">
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        initialPage={initialPage}
        forcePage={forcePage}
        breakLabel={"..."}
        pageCount={totalPosts}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        selectedPageRel={0}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
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
      <select className="form-select w-25 h-25 ml-2" value={selectedPage} onChange={handleSelectChange}>
        {Array.from({ length: totalPosts }, (_, index) => index + 1).map((page) => (
          <option  key={page} value={page}>
            {page}
          </option>
        ))}
      </select>
    </div>
  );
}