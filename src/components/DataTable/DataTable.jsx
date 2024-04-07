import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
export default function DataTable({
  columns,
  rows,
  itemsPerPage = 10,
  onDelete,
  onPut,
  showActions,
  showDeleteButton,
  showChangeButton,
}) {
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

  const [inputStates, setInputStates] = useState([]);

  useEffect(() => {
    setInputStates(
      rows.map((row) =>
        columns.reduce((acc, column) => {
          if (column.key !== "id") {
            acc[column.key] = getProperty(row, column.key);
          }
          return acc;
        }, {})
      )
    );
  }, [rows, columns]);

  const handleInputChange = (rowIndex, columnKey, value) => {
    setInputStates((prevState) => {
      const newState = [...prevState];
      newState[rowIndex][columnKey] = value;
      return newState;
    });
  };

  const filteredRows = rows.filter((row) => {
    // Check if each column has a filter value, and apply the filter
    return columns.every((column) => {
      const filterValue = filters[column.key];
      if (!filterValue) return true; // If no filter value, keep the row

      const cellValue = getProperty(row, column.key);
      return String(cellValue)
        .toLowerCase()
        .includes(filterValue.toLowerCase());
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
            onChange={(e) => handleFilterChange(column.key, e.target.value)}
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
          {showActions && (
            <div className={styles.table_header_cell}>Actions</div>
          )}
        </div>
        <div className={styles.table_body}>
          {paginatedRows.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.table_row}>
              {columns.map((column, colIndex) => (
                <div key={colIndex} className={styles.table_cell}>
                  {column.key !== "id" ? (
                    <input
                      type="text"
                      value={inputStates[rowIndex]?.[column.key] || ""}
                      onChange={(e) =>
                        handleInputChange(rowIndex, column.key, e.target.value)
                      }
                    />
                  ) : (
                    getProperty(row, column.key)
                  )}
                </div>
              ))}

              {showActions && (
                <div className={styles.table_cell}>
                  {showDeleteButton && (
                    <DeleteForeverIcon
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() => onDelete(row.id)}
                    />
                  )}
                  {showChangeButton && (
                    <BookmarkAddedIcon
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() => onPut(row.id, inputStates[rowIndex])}
                    />
                  )}
                </div>
              )}
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
