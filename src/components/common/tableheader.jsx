import React from "react";

// columns:array
//sort column: object
//onSort: function

const TableHeader = (props) => {
  const raiseSort = (path) => {
    const sortColumnN = { ...props.sortColumn };
    // console.log(sortColumnN);
    if (sortColumnN.path === path) {
      sortColumnN.order = sortColumnN.order === "asc" ? "desc" : "asc";
    } else {
      sortColumnN.path = path;
      sortColumnN.order = "asc";
    }
    props.onSort(sortColumnN);
  };

  const renderSortIcon = (column) => {
    const { sortColumn } = props; //object destructuring

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };
  return (
    <thead>
      <tr>
        {props.columns.map((column) => (
          <th
            className="clickable"
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
