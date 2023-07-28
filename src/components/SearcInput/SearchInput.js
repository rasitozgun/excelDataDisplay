import React from "react";

export default function searchInput({ ...props }) {
  return (
    <div className="form-outline mr-2">
      <input type="text" className="form-control justify-content-center" {...props} />{" "}
    </div>
  );
}
