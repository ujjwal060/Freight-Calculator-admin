
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
  Box,
  CircularProgress,
  TextField,
} from "@mui/material";

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  // Search fields
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchMobile, setSearchMobile] = useState("");

  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const fetchUsers = async (page, limit, filters = {}) => {
    try {
      setLoading(true);
      const offset = page * limit;

      const payload = {
        limit,
        offset,
        sortField: "",
        sortBy: -1,
        filters: {},
      };

      if (filters.name) payload.filters.name = filters.name;
      if (filters.email) payload.filters.email = filters.email;
      if (filters.mobileNumber) payload.filters.mobileNumber = filters.mobileNumber;

      const res = await getUsers(payload);
      setUsers(res?.data || []);
      setTotalCount(res?.totalCount || 0);
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page, rowsPerPage, {
      name: searchName,
      email: searchEmail,
      mobileNumber: searchMobile,
    });
  }, [page, rowsPerPage]);

  // Live search effect with debounce
  useEffect(() => {
    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(() => {
      setPage(0); // Reset page when searching
      fetchUsers(0, rowsPerPage, {
        name: searchName,
        email: searchEmail,
        mobileNumber: searchMobile,
      });
    }, 500);

    setDebounceTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [searchName, searchEmail, searchMobile]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ padding: "20px", height: "100%" }}>
      {/* Multi-field Live Search */}
      {/* <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
        <TextField
          placeholder="Search by Name"
          size="small"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          sx={{ flex: 1 }}
        />
        <TextField
          placeholder="Search by Email"
          size="small"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          sx={{ flex: 1 }}
        />
        <TextField
          placeholder="Search by Mobile"
          size="small"
          value={searchMobile}
          onChange={(e) => setSearchMobile(e.target.value)}
          sx={{ flex: 1 }}
        />
      </Box> */}

      <Box
  sx={{
    mb: 3,
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
  }}
>
  <TextField
    placeholder="Search by Name"
    size="small"
    value={searchName}
    onChange={(e) => setSearchName(e.target.value)}
    sx={{
      flex: "1 1 250px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#ddd" },
        "&:hover fieldset": { borderColor: "var(--primary-color)" },
        "&.Mui-focused fieldset": { borderColor: "var(--primary-color)" },
      },
    }}
  />

  <TextField
    placeholder="Search by Email"
    size="small"
    value={searchEmail}
    onChange={(e) => setSearchEmail(e.target.value)}
    sx={{
      flex: "1 1 250px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#ddd" },
        "&:hover fieldset": { borderColor: "var(--primary-color)" },
        "&.Mui-focused fieldset": { borderColor: "var(--primary-color)" },
      },
    }}
  />

  <TextField
    placeholder="Search by Mobile"
    size="small"
    value={searchMobile}
    onChange={(e) => setSearchMobile(e.target.value)}
    sx={{
      flex: "1 1 250px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#ddd" },
        "&:hover fieldset": { borderColor: "var(--primary-color)" },
        "&.Mui-focused fieldset": { borderColor: "var(--primary-color)" },
      },
    }}
  />
</Box>


      <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: "12px" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress sx={{ color: "var(--primary-color)" }} />
          </Box>
        ) : (
          <TableContainer
            sx={{ maxHeight: "65vh", minHeight: "65vh", overflow: "auto", width: "100%" }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow className="table-custom" sx={{ background: "#ff6b35" }}>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Sr.</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Mobile</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ maxHeight: "inherit", overflowX: "hidden" }}>
                {users.map((user, index) => (
                  <TableRow
                    key={user._id}
                    sx={{ "&:hover": { background: "rgba(255,107,53,0.05)" } }}
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

        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 20, 50]}
          sx={{
            ".MuiTablePagination-toolbar": { backgroundColor: "var(--primary-bg)" },
            ".MuiTablePagination-selectIcon": { color: "var(--primary-color)" },
            ".MuiTablePagination-actions button": { color: "var(--primary-color)" },
          }}
        />
      </Paper>
    </Box>
  );
};

export default UserDetails;
