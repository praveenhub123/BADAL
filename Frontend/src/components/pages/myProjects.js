import React from 'react';
import { TableContainer, Table, TableBody, TableCell, TableHead, Chip, Paper, Button, TableRow, Card } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react';
import { projectsList } from '../../data/myProjects';
import { DashboardLayout } from '../default';
import AddProject from '../addProject';
import { SideBarNew } from "../SideBarNew";
import { useQuery } from "@apollo/client";
import { MY_PROJECTS } from "../../graphQL/query"

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

function MyProjects() {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);
  const [loadUsers, setLoadUsers] = useState(false);

  useEffect(() => {
    console.log(projectsList);
    setProjects(projectsList);
  }, [loadUsers]);

  const { data } = useQuery(MY_PROJECTS)

  useEffect(() => {
    if (data) {
      console.log("data is")
      console.log(data)
    }
  }, [data])

  return (
    //<SideBarNew>
    <Card
      raised
      sx={{
        padding: 2,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TableContainer component={Paper}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Project Name</StyledTableCell>
              <StyledTableCell align="center">
                Brief Description
              </StyledTableCell>
              <StyledTableCell align="center">
                Problem Statement
              </StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <StyledTableRow key={project.project_Id}>
                <TableCell align="center">{project.name}</TableCell>
                <TableCell align="center">{project.brief}</TableCell>
                <TableCell align="center">
                  {project.problem_statement}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={project.status}
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>

        <AddProject status="Add project" username="aloo wala" id="1234" />
      </TableContainer>
    </Card>
    //</SideBarNew>
  );
}

export default MyProjects;
