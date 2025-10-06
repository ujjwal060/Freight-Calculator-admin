import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  CircularProgress,
  TableSortLabel,
} from "@mui/material";

const CommonTable = ({
  columns,
  data,
  loading,
  totalCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  orderBy,
  order,
  onSort,
  stickyHeader = true,
  maxHeight = "65vh",
  minHeight = "65vh"
}) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: "12px" }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress sx={{ color: "var(--primary-color)" }} />
        </Box>
      ) : (
        <TableContainer 
          sx={{ 
            maxHeight: maxHeight, 
            minHeight: minHeight, 
            overflow: "auto", 
            width: "100%" 
          }}
        >
          <Table stickyHeader={stickyHeader} aria-label="sticky table">
            <TableHead>
              <TableRow className="table-custom" sx={{ background: "#ff6b35" }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    sx={{ 
                      color: "#fff", 
                      fontWeight: "bold",
                      minWidth: column.minWidth,
                      width: column.width,
                      backgroundColor: "#ff6b35",
                      position: "sticky",
                      top: 0,
                      zIndex: 1
                    }}
                  >
                    {column.sortable ? (
                      <TableSortLabel
                        active={orderBy === column.field}
                        direction={orderBy === column.field ? order : 'asc'}
                        onClick={() => onSort(column.field)}
                        sx={{
                          color: "#fff",
                          "& .MuiTableSortLabel-icon": { 
                            color: "#fff !important" 
                          }
                        }}
                      >
                        {column.headerName}
                      </TableSortLabel>
                    ) : (
                      column.headerName
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={{ maxHeight: "inherit", overflowX: "hidden" }}>
              {data.map((row, index) => (
                <TableRow
                  key={row.id || row._id || index}
                  sx={{ 
                    "&:hover": { background: "rgba(255,107,53,0.05)" },
                    "&:last-child td, &:last-child th": { border: 0 }
                  }}
                >
                  {columns.map((column) => (
                    <TableCell 
                      key={column.field}
                      sx={{ 
                        py: 1.5,
                        borderBottom: "1px solid rgba(224, 224, 224, 1)"
                      }}
                    >
                      {column.renderCell ? column.renderCell(row, index) : row[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {data.length === 0 && !loading && (
                <TableRow>
                  <TableCell 
                    colSpan={columns.length} 
                    align="center"
                    sx={{ py: 4, color: "gray" }}
                  >
                    No Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[10, 20, 50]}
        sx={{
          ".MuiTablePagination-toolbar": { 
            backgroundColor: "#f5f5f5",
            minHeight: "52px"
          },
          ".MuiTablePagination-selectLabel": {
            marginBottom: 0
          },
          ".MuiTablePagination-displayedRows": {
            marginBottom: 0
          },
          ".MuiTablePagination-selectIcon": { color: "#ff6b35" },
          ".MuiTablePagination-actions button": { color: "#ff6b35" },
        }}
      />
    </Paper>
  );
};

export default CommonTable;