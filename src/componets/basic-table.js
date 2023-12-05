import React, { useState } from "react";
import {
  createTable,
  useTableInstance,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import STUDENTS from "../students.json";

const table = createTable();
const defaultData = [...STUDENTS];
const defaultColumns = [
  table.createDataColumn("firstName", {
    id: "First Name",
  }),
  table.createDataColumn("middleName", {
    id: "Middle Name",
  }),
  table.createDataColumn("lastName", {
    id: "Last Name",
  }),
  table.createDataColumn("age", {
    id: "Age",
  }),
  table.createDataColumn((row) => row.phone[1], {
    id: "Phone Number 1",
  }),
  table.createDataColumn((row) => row.phone[2], {
    id: "Phone Number 2",
  }),
  table.createDataColumn("email", {
    id: "E-mail Address",
  }),
  table.createDataColumn((row) => row.address.street, {
    id: "Street",
  }),
  table.createDataColumn((row) => row.address.city, {
    id: "City",
  }),
  table.createDataColumn((row) => row.address.state, {
    id: "Address",
  }),
  table.createDataColumn((row) => row.address.pincode, {
    id: "Pin Code",
  }),
  table.createDataColumn("date_of_birth", {
    id: "Date of Birth",
    cell: (props) => new Date(props.getValue()).toDateString(),
  }),
  table.createDataColumn("date_of_admission", {
    id: "Date of Admission",
    cell: (props) => new Date(props.getValue()).toDateString(),
  }),
];
const BasicTable = () => {
  const [data] = useState([...defaultData]);
  const [columns] = useState([...defaultColumns]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const instance = useTableInstance(table, {
    data,
    columns,
    state: {
      pagination: pagination,
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="table-container">
        <table border={1}>
          <thead style={{ position: "relation", zIndex: 100 }}>
            {instance.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={
                      ["First Name"].includes(header.id)
                        ? {
                            left: header.getStart("left"),
                            position: "sticky",
                            top: 0,
                            background: "red",
                          }
                        : {}
                    }
                  >
                    {header.isPlaceholder ? null : header.renderHeader()}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {instance.getRowModel().rows.map((row, rIdx) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, cIdx) => (
                  <td
                    key={cell.id}
                    style={
                      cIdx === 0
                        ? {
                            left: 0,
                            position: "sticky",
                            top: 0,
                            zIndex: 0,
                            background: rIdx % 2 === 0 ? "black" : "#111",
                          }
                        : {}
                    }
                  >
                    {cell.renderCell()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          onClick={() => instance.setPageIndex(0)}
          disabled={!instance.getCanPreviousPage()}
        >
          &lt;&lt;
        </button>
        <button
          onClick={instance.previousPage}
          disabled={!instance.getCanPreviousPage()}
        >
          &lt;
        </button>
        <button
          onClick={instance.nextPage}
          disabled={!instance.getCanNextPage()}
        >
          &gt;
        </button>

        <button
          onClick={() => instance.setPageIndex(instance.getPageCount() - 1)}
          disabled={!instance.getCanNextPage()}
        >
          &gt;&gt;
        </button>
        <span>
          page {instance.getState().pagination.pageIndex + 1} of{" "}
          {instance.getPageCount()}
          {"| "}
        </span>
        <span>
          go to page{" "}
          <input
            type="number"
            defaultValue={instance.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              instance.setPageIndex(page);
            }}
          />
          {" | "}
        </span>
        <span>
          <select
            value={instance.getState().pagination.pageSize}
            onChange={(e) => instance.setPageSize(Number(e.target.value))}
          >
            {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                show {pageSize}
              </option>
            ))}
          </select>
        </span>
      </div>
    </div>
  );
};

export default BasicTable;
