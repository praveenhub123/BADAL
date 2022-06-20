import React from 'react';
import { TableContainer, Table, TableBody, TableCell, TableHead, Chip, Paper, Button, TableRow } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react';
// import axios from 'axios';
import { breakdown } from '../../data/breakdown';
import { DashboardLayout } from '../default';
// import BasicModal from './popup';
// import MaxWidthDialog from './statusDialog';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import { IconButton, Box, Typography } from '@mui/material';
import { Card } from '@mui/material';
import AddTasks from '../addTasks';
import AddTeams from '../addTeams';
import AddFeature from '../addFeature';
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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.brief}</TableCell>
        <TableCell align="center">{row.problem_statement}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {row.name} Breakdown
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Features</StyledTableCell>
                    <StyledTableCell align="center">Tasks</StyledTableCell>
                    <StyledTableCell align="center">
                      Alloted Teams
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.featuresTasksTeams.map((eachFeature) => (
                    // console.log(eachFeature.feature_name)

                    <StyledTableRow>
                      <TableCell align="center">{eachFeature.name}</TableCell>
                      <TableCell align="center">
                        <AddTasks
                          taskName={eachFeature.name + " Tasks"}
                          tasks={eachFeature.tasks}
                        />
                        {/* <Chip label={eachFeature.name + " Tasks"} color="primary" variant="outlined" /> */}
                        {/* {eachFeature.tasks.map((task) => (task.task_name + " , "))} */}
                      </TableCell>
                      <TableCell align="center">
                        <AddTeams
                          taskName={eachFeature.name + " Teams"}
                          tasks={eachFeature.tasks}
                        />
                        {/* <Chip label={eachFeature.name + " Teams"} color="success" variant="outlined" /> */}
                        {/* {eachFeature.tasks.map((task) => (task.teams.map((team) => (console.log(team))))} */}
                      </TableCell>
                      {/* <StyledTableCell>{eachFeature.customerId}</StyledTableCell> */}
                      {/* <StyledTableCell align="right">{eachFeature.amount}</StyledTableCell> */}
                      {/* <StyledTableCell align="right"> */}
                      {/* {Math.round(eachFeature.amount * row.price * 100) / 100} */}
                      {/* </StyledTableCell> */}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              <AddFeature project_Id={row.project_Id} />
              {/* <Chip label=" Add new feature" color="error" variant="outlined" style={{ display: "flex", margin: "22px" }} /> */}
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

function ProjectBreakdown() {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);
  const [loadUsers, setLoadUsers] = useState(false);

  useEffect(() => {
    console.log(breakdown);
    setProjects(breakdown);
  }, [loadUsers]);

  return (
    <SideBarNew>
      <Card
        raised
        sx={{
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
                <StyledTableCell align="center">Breakdown</StyledTableCell>
                {/* <StyledTableCell align="center">Device Name</StyledTableCell>
                            <StyledTableCell align="center">Device Code</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <Row key={project.project_Id} row={project} />
                // <StyledTableRow key={project.project_Id}>
                //     <TableCell align="center">{project.name}</TableCell>
                //     <TableCell align="center">{project.brief}</TableCell>
                //     <TableCell align="center">{project.problem_statement}</TableCell>
                //     <TableCell align="center">{project.status}</TableCell>
                //     <TableCell align="center">{project.problem_statement}</TableCell>
                // </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            onClick={() => {
              setLoadUsers(!loadUsers);
            }}
            style={{ display: "flex", margin: "auto" }}
          >
            Refresh Project List
          </Button>
        </TableContainer>
      </Card>
    </SideBarNew>
  );
}

export default ProjectBreakdown;
