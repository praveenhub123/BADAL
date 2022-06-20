import React from "react";
import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Paper,
  TableRow,
  Chip,
  Grid,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import { employeeList } from "../../data/employeeList";
import AddEmployee from "../addEmployee";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TextField from "@mui/material/TextField";
import Fuse from "fuse.js";

import { SideBarNew } from "../SideBarNew";

const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Employee() {
  const classes = useStyles();
  const [employees, setEmployees] = useState([]);
  const [loadUsers, setLoadUsers] = useState(false);

  const fuse = new Fuse(employeeList, {
    keys: ["company"],
    //threshold: 0,
  });

  const q = sessionStorage.getItem("entity");

  const results = fuse.search(q);
  const render_employee = results.map((result) => result.item);

  useEffect(() => {
    setEmployees(render_employee);
  }, [loadUsers]);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Typography variant="h3">Employees</Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          style={{ paddingTop: 10 }}
        >
          {q}
        </Typography>
        <Divider />
        <Grid container spacing={1}>
          <Grid item xs={11.5} sx={{ display: "flex", flexDirection: "row" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                marginLeft: 2,
                marginTop: 2,
              }}
            >
              <SearchOutlinedIcon sx={{ color: "active", mr: 1, my: 0.5 }} />
              <TextField
                id="Search tile"
                label="Search Employees"
                variant="standard"
              />
            </Box>
          </Grid>
        </Grid>
        <TableContainer component={Paper} sx={{ marginTop: 6 }}>
          <Table
            stickyHeader
            className={classes.table}
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">
                  <Chip
                    label={"Employee name"}
                    sx={{ color: "white", fontSize: 18 }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Chip label={"Team"} sx={{ color: "white", fontSize: 18 }} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Chip
                    label={"Skills"}
                    sx={{ color: "white", fontSize: 18 }}
                  />
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <StyledTableRow key={employee.project_Id}>
                  <TableCell align="center">{employee.empname}</TableCell>
                  <TableCell align="center">{employee.team}</TableCell>

                  <TableCell align="center">
                    {employee.skill.map((pr) => (
                      <Chip
                        label={pr}
                        variant="outlined"
                        size="small"
                        style={{
                          width: "min-content",
                          marginLeft: 1,
                          marginTop: 2,
                        }}
                      />
                    ))}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>

          <AddEmployee status="Add Employee" username="aloo wala" id="1234" />
        </TableContainer>
      </Box>
    </>
  );
}

export default Employee;
