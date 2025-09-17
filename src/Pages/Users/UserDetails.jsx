



import React, { useEffect, useState } from "react";

import { getUsers } from "../../api/users";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const fetchUsers = async (page, limit) => {
    try {
      setLoading(true);
      const offset = page * limit;

      const payload = {
        limit: limit,
        offset: offset,
        sortField: "",
        sortBy: -1,
      };

      const res = await getUsers(payload);
      setUsers(res.data || []);
      setTotalCount(res.totalCount || 0);
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ padding: "20px", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "var(--primary-color)" }}>
        User Details
      </Typography>

      <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: "12px" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress sx={{ color: "var(--primary-color)" }} />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "var(--primary-color)" }}>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Sr.</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Mobile</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow
                    key={user._id}
                    sx={{
                      "&:hover": { background: "rgba(255,107,53,0.05)" },
                    }}
                  >
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.mobileNumber}</TableCell>
                  </TableRow>
                ))}
                {users.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No Users Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Pagination */}
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
          sx={{
            ".MuiTablePagination-toolbar": {
              backgroundColor: "var(--primary-bg)",
            },
            ".MuiTablePagination-selectIcon": {
              color: "var(--primary-color)",
            },
            ".MuiTablePagination-actions button": {
              color: "var(--primary-color)",
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default UserDetails;

