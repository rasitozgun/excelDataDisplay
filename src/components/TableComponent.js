import React from 'react'

export default function TableComponent({data}) {
  return (
    <div className="input-group">
    <div className="form-outline ">
      <input
        type="search"
        value={filterItem}
        onInput={handleFilter}
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
        <tr key={key} className={"text-center"}>
          {Object.keys(d).map((key) => (
            <td key={key}>{typeof d[key] === "boolean" ? (d[key] ? "✓" : "") : d[key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
  )
}
