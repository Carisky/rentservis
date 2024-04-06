import React, { useState } from "react";
import styles from "./styles.module.css";

export default function DataTable({ columns, rows, itemsPerPage = 10 }) {
  // Function to safely access nested properties
  const getProperty = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setCurrentPage(1); // Reset current page when changing filters
  };

  const filteredRows = rows.filter(row => {
    // Check if each column has a filter value, and apply the filter
    return columns.every(column => {
      const filterValue = filters[column.key];
      if (!filterValue) return true; // If no filter value, keep the row

      const cellValue = getProperty(row, column.key);
      return String(cellValue).toLowerCase().includes(filterValue.toLowerCase());
    });
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  return (
    <div>
      <div className={styles.filters}>
        {columns.map((column, index) => (
          <input
            className={styles.filter}
            key={index}
            type="text"
            placeholder={`Filter ${column.header}`}
            value={filters[column.key] || ""}
            onChange={e => handleFilterChange(column.key, e.target.value)}
          />
        ))}
      </div>
      <div className={styles.table}>
        <div className={styles.table_header}>
          {columns.map((column, index) => (
            <div key={index} className={styles.table_header_cell}>
              {column.header}
            </div>
          ))}
        </div>
        <div className={styles.table_body}>
          {paginatedRows.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.table_row}>
              {columns.map((column, colIndex) => (
                <div key={colIndex} className={styles.table_cell}>
                  {getProperty(row, column.key)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= filteredRows.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
