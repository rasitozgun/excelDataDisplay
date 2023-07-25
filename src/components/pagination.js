import React from "react";
import ReactPaginate from "react-paginate";

export default function Pagination({ totalPosts, handlePageClick, initialPage, forcePage }) {
  return (
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
  );
}
