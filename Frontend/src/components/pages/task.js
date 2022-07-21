import React from "react";
import { Box, Typography, Grid, Chip, Card } from "@mui/material";
import Head from "next/head";
//import { DashboardLayout } from "../default";
import Divider from "@mui/material/Divider";
import { withStyles } from "@material-ui/core/styles";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Paper,
  TableRow,
} from "@mui/material";
import MuiTableHead from "@material-ui/core/TableHead";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import { taskList } from "../../data/taskList";
import AddTask from "../addTask";
//import { SideBarNew } from "../SideBarNew";
import { useParams, useLocation } from "react-router-dom";
import Fuse from "fuse.js";
import { useQuery } from "@apollo/client";
import {
  GET_TASK_FOR_MODULE_BY_ID,
  GET_TEAM_DETAILS,
} from "../../graphQL/query";
import { useMutation } from "@apollo/client";
import {
  UPDATE_STATUS_OF_TASK,
  ASSIGN_TASK_TO_USER,
  UPDATE_MODULE_STATUS,
} from "../../graphQL/mutations";
import LinkIcon from "@mui/icons-material/Link";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";


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

function Task(props) {
  const allStatus = ["Ongoing", "Completed"];
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const userrole = sessionStorage.getItem('userRole');
  const [teamMembers, setTeamMembers] = useState([]);
  const [loadUsers, setLoadUsers] = useState(false);

  const location = useLocation();

  const { data } = useQuery(GET_TASK_FOR_MODULE_BY_ID, {
    variables: {
      moduleId: sessionStorage.getItem("moduleId"),
    },
  });

  const { error, data: teamMembersData } = useQuery(GET_TEAM_DETAILS, {
    variables: {
      teamId: location.state.assigned_to?._id,
    },
  });

  useEffect(() => {
    if (error) {
      alert("No team has been assigned this module yet");
    }

    if (teamMembersData) {
      setTeamMembers(teamMembersData.GetTeamDetail?.participants);
    }
  }, [teamMembersData, error]);

  useEffect(() => {
    sessionStorage.setItem("moduleId", location.state.id);
    if (data) {
      setTaskList(data.GetTaskForModuleById);
    }
  }, [loadUsers, data]);

  const stringToDate = (s) => {
    if (s) {
      const t = s.split(" ");
      return `${t[1]} ${t[2]} ${t[3]}`;
    } else {
      return "";
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [updateModuleStatus] = useMutation(UPDATE_MODULE_STATUS, {
    onCompleted: (data) => {
      alert(`Module status updated to ${data.UpdateModuleStatus.status}`)
    },
    onError: (err) => {
      alert(err.message)
    }
  })

  const [updateStatus] = useMutation(UPDATE_STATUS_OF_TASK, {
    onCompleted: (resp) => {
      alert(
        `Task status has been updated to ${resp.UpdateStatusOfTask.status.toLowerCase()}`
      );
      handleClose();
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const [assignToUser] = useMutation(ASSIGN_TASK_TO_USER, {
    
    onCompleted: (resp) => {
      alert(
        `Task has been assigned to ${resp.AssignTaskToUser.assigned_to.name}`
      );
      handleClose();
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const handleModuleStatus = (event, prod) => {
    console.log(event.target)
    console.log(prod)
    updateModuleStatus({
      variables: {
        moduleId: location.state.id,
        status: prod.props.children.toUpperCase(),
      }
    })
  }

  const handleStatusChange = async (event, prod) => {
    setStatus(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );

    await updateStatus({
      variables: {
        TaskId: prod._id,
        status: event.target.value,
      },
    });

    window.location.reload(false);
  };

  const handleAssignedToChange = async (event, prod) => {
      await assignToUser({
      variables: {
        taskId: prod._id,
        UserId: event.target.value,
      },
    });

    window.location.reload(false);
  };

  const TableHead = withStyles((theme) => ({
    root: {
      backgroundColor: "#c3c3c3",
    },
  }))(MuiTableHead);

  const [sta, setSta] = React.useState("");

  const handleChange = (event) => {
    setSta(event.target.value);
  };

  return (
    //<SideBarNew>
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Typography
          style={{ paddingTop: 20, fontSize: "24px", fontWeight: "bold" }}
        >
          <center>Module Details Page</center>
        </Typography>
        <Divider sx={{ marginBottom: "20px" }} />

        <Card sx={{ width: "100%", backgroundColor: "#f7f9fe" }}>
          <Grid container>
            <Grid item xs={10.5}>
              <Typography
                style={{ padding: 20, fontSize: "22px", fontWeight: "500" }}
              >
                {location.state.name}
              </Typography>
            </Grid>
            <Grid item xs={1.5}>
              <FormControl sx={{ m: 1, minWidth: 130 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Status
                </InputLabel>
                <Select
                  id="select-autowidth"
                  value={sta}
                  onChange={handleModuleStatus}
                  autoWidth
                  label="Status"
                >
                  <MenuItem value={10}>Ongoing</MenuItem>
                  <MenuItem value={21}>Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Typography
            variant="h6"
            color="text.secondary"
            style={{ paddingLeft: 20, marginBottom: 20 }}
          >
            {location.state.desc}
          </Typography>
          <Grid container sx={{ marginBottom: 3, flexDirection: "column" }}>
            <Grid item xs={2}>
              <ul>
                <li>
                  <Typography
                    display="flex"
                    color="text.secondary"
                    sx={{
                      justifyContent: "center",
                      alignContent: "Center",
                      paddingTop: "16px",
                      fontSize: "14px",
                    }}
                  >
                    {"Created : " + stringToDate(location.state.created_at)}
                  </Typography>
                </li>
              </ul>
            </Grid>

            <Grid item xs={2}>
              <ul>
                <li>
                  <Typography
                    display="flex"
                    color="text.secondary"
                    sx={{
                      justifyContent: "center",
                      alignContent: "Center",
                      paddingTop: "16px",
                      fontSize: "14px",
                    }}
                  >
                    {"Updated : " + stringToDate(location.state.updated_at)}
                  </Typography>
                </li>
              </ul>
            </Grid>
          </Grid>
          <Divider />
          <Grid container sx={{ marginBottom: 3 }}>
            <Grid item xs={3}>
              <ul>
                <li>
                  <Typography
                    display="flex"
                    sx={{
                      justifyContent: "center",
                      alignContent: "Center",
                      paddingTop: "16px",
                      fontSize: "14px",
                    }}
                  >
                    Requirements
                  </Typography>
                </li>
                <li>
                  <Typography
                    display="flex"
                    sx={{
                      justifyContent: "center",
                      alignContent: "Center",
                      paddingTop: "16px",
                      fontSize: "14px",
                    }}
                  >
                    <LinkIcon />
                  </Typography>
                </li>
              </ul>
            </Grid>
            <Grid item xs={3}>
              <ul>
                <li>
                  <Typography
                    display="flex"
                    sx={{
                      justifyContent: "center",
                      alignContent: "Center",
                      paddingTop: "16px",
                      fontSize: "14px",
                    }}
                  >
                    UI-Screen
                  </Typography>
                </li>
                <li>
                  <Typography
                    display="flex"
                    sx={{
                      justifyContent: "center",
                      alignContent: "Center",
                      paddingTop: "16px",
                      fontSize: "14px",
                    }}
                  >
                    <LinkIcon />
                  </Typography>
                </li>
              </ul>
            </Grid>
            <Grid item xs={3}>
              <ul>
                <li>
                  <Typography
                    display="flex"
                    sx={{
                      justifyContent: "center",
                      alignContent: "Center",
                      paddingTop: "16px",
                      fontSize: "14px",
                    }}
                  >
                    API-Build
                  </Typography>
                </li>
                <li>
                  <Typography
                    display="flex"
                    sx={{
                      justifyContent: "center",
                      alignContent: "Center",
                      paddingTop: "16px",
                      fontSize: "14px",
                    }}
                  >
                    <LinkIcon />
                  </Typography>
                </li>
              </ul>
            </Grid>
            <Grid item xs={3}>
              <ul>
                <li>
                  <Typography
                    display="flex"
                    sx={{
                      justifyContent: "center",
                      alignContent: "Center",
                      paddingTop: "16px",
                      fontSize: "14px",
                    }}
                  >
                    DB-Build
                  </Typography>
                </li>
                <li>
                  <Typography
                    display="flex"
                    sx={{
                      justifyContent: "center",
                      alignContent: "Center",
                      paddingTop: "16px",
                      fontSize: "14px",
                    }}
                  >
                    <LinkIcon />
                  </Typography>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Card>

        <Typography variant="h5" style={{ paddingTop: 20 }}>
          <center>Tasks</center>
        </Typography>
        <Grid container sx={{ marginBottom: 3 }}>
          <Grid item xs={10.2}></Grid>
          <Grid item xs={1.8}>
            <AddTask status="Add Task" align="right" />
          </Grid>
        </Grid>

        <Divider sx={{ marginBottom: "20px" }} />
        <TableContainer component={Paper}>
          <Table
            stickyHeader
            className={classes.table}
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Task Name</StyledTableCell>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">Assigned To</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskList.map((project) => (
                <StyledTableRow key={project._id}>
                  <TableCell align="left">{project.name}</TableCell>
                  <TableCell align="left">{project.description}</TableCell>
                  {/* <TableCell align="center">{project.status}</TableCell> */}
                  <TableCell align="right">
                    <FormControl sx={{ minWidth: 130 }}>
                      <InputLabel htmlFor="status">Status</InputLabel>
                      <Select
                        value={project.status.toUpperCase()}
                        onChange={(e) => handleStatusChange(e, project)}
                        label="maxWidth"
                        inputProps={{
                          name: "max-width",
                          id: "max-width",
                        }}
                      >
                        {allStatus.map((status) => (
                          <MenuItem value={status.toUpperCase()}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="right">
                    <FormControl sx={{  minWidth: 120,minHeight:20 }}>
                      <InputLabel htmlFor="assigned">Assigned To</InputLabel>
                      <Select
                        value={project.assigned_to?._id}
                        onChange={(e) => handleAssignedToChange(e, project)}
                        label="maxWidth"
                        inputProps={{
                          name: "max-width",
                          id: "max-width",
                        }}
                      >
                        {teamMembers?.map((m) => (
                          <MenuItem key={m._id} value={m._id}>
                            {m.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
    //</SideBarNew>
  );
}

export default Task;
