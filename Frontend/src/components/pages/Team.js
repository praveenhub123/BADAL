import React from "react";
import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { withStyles } from "@material-ui/core/styles";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Chip,
  Grid,
  Paper,
  TableRow,
  FormControl
} from "@mui/material";
import MuiTableHead from "@material-ui/core/TableHead";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import { teamList } from "../../data/teamList";
import AddEmployee from "../addEmployee";
import Select from "react-select";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddTeam from "../addTeam";
import TextField from "@mui/material/TextField";
//import { SideBarNew } from "../SideBarNew";
import Fuse from "fuse.js";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_COMPANIES,
  GET_TEAMS_FOR_COMPANY,
  GET_ALL_TEAMS,
} from "../../graphQL/query";

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

function Team() {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);
  const [loadUsers, setLoadUsers] = useState(false);

  const fuse = new Fuse(teamList, {
    keys: ["company"],
    //threshold: 0,
  });

  const { data: companiesData } = useQuery(GET_ALL_COMPANIES);

  const [compName, setCompName] = useState("");
  const [Company, setCompany] = useState([]);
  const [filterSelect, setFilterSelect] = useState({});

  //const results = fuse.search(q);
  //const render_team = results.map((result) => result.item);

  let [selectedOption, setselectedOption] = useState("");
  let [selectedOption2, setselectedOption2] = useState("");

  // useEffect(() => {
  //   console.log(render_team);
  //   setProjects(render_team);
  // }, [loadUsers, selectedOption2]);

  //filter items bellow

  const handleChange1 = (sOption) => {
    setselectedOption(sOption);
    sessionStorage.setItem("type", sOption.value);
  };

  const handleChange2 = (sOption) => {
    setselectedOption2(sOption);
    sessionStorage.setItem("entity", sOption.value);
  };

  const { loading, error, data } = useQuery(GET_TEAMS_FOR_COMPANY, {
    variables: {
      orgId: sessionStorage.getItem("companyId"),
    },
    skip: !sessionStorage.getItem("companyId"),
  });

  const {
    _,
    err,
    data: teamData,
  } = useQuery(GET_ALL_TEAMS, {
    skip: sessionStorage.getItem("companyId"),
  });

  useEffect(() => {
    if (companiesData) {
      var c = [];
      companiesData.GetCompany.forEach((n) => {
        if (n._id === sessionStorage.getItem("companyId")) {
          setFilterSelect({
            label: n.name,
            value: n._id,
          });
        }
        c.push({
          value: n._id,
          label: n.name,
        });
      });
      setCompany(c);
    }
  }, [companiesData]);

  useEffect(() => {
    if (data) {
      var newData = [];

      setCompName(data.GetTeamsForCompany[0]?.organisation?.name);
      data.GetTeamsForCompany.forEach((n) => {
        var p = [];
        var i = [];
        n.participants.forEach((x) => {
          p.push(x.name);
          i.push(x._id);
        });

        newData.push({
          teamid: n._id,
          memb: p,
          name: n.name,
          skill: n.skill,
          participantsId: i,
        });
      });

      setProjects(newData);
    }
  }, [data]);

  useEffect(() => {
    if (teamData) {
      var newData = [];
      setCompName(teamData.GetAllTeams[0]?.organisation?.name);
      teamData.GetAllTeams.forEach((n) => {
        var p = [];
        var i = [];
        n.participants.forEach((x) => {
          p.push(x.name);
          i.push(x._id);
        });

        newData.push({
          teamid: n._id,
          memb: p,
          name: n.name,
          skill: n.skill,
          participantsId: i,
        });
      });
      setProjects(newData);
    }
  }, [teamData]);

  const Type = [
    { value: "core-team", label: "core-team" },
    { value: "company", label: "company" },
  ];

  // const Company = [
  //   { value: "core-team", label: "core-team", link: "core-team" },
  //   { value: "IBM", label: "IBM", link: "company" },
  //   { value: "TCS", label: "TCS", link: "company" },
  // ];

  const filteredOptions = Company.filter(
    (o) => o.link === selectedOption.value
  );

  const MyDropdown = ({ style }) => {
    const q = sessionStorage.getItem("type");
    let q1 = "core-team";
    if (q == q1) {
      if (sessionStorage.getItem("companyId") !== null) {
        return (
          <FormControl style={style}
          >
          <Select
            placeholder="Select company ..."
            value={filterSelect}
            onChange={handleChange2}
            options={Company}
            isDisabled={true}
            ></Select>
          </FormControl>
        );
      }

      return (
        <FormControl style={style}
        >
        <Select
          placeholder="Select company ..."
          value={selectedOption2}
          onChange={handleChange2}
          options={Company}
          ></Select>
        </FormControl>
      );
    }
  };

  const TableHead = withStyles((theme) => ({
    root: {
      backgroundColor: "#c3c3c3",
    },
  }))(MuiTableHead);

  return (
    // <SideBarNew>
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
          <center>Teams</center>
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          style={{ paddingTop: 10 }}
        >
          {compName}
        </Typography>
        <Divider />
        <Grid
          container
          // spacing={0}
          // sx={{ marginRight: 0, alignItems: "right" }}
          justifyContent="flex-end"
          alignItems="flex-end"
        >

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
                label="Search Teams"
                variant="standard"
                //value={query}
                //onChange={handleOnSearch}
              />
            </Box>

          <MyDropdown style={{ margin: "0 20px", width: "250px" }} />

          <AddEmployee status="Add Employee" username="aloo wala" id="1234" style={{ marginRight: "20px" }} />

          <AddTeam
            status="Add Team"
            name={compName}
            id={sessionStorage.getItem("companyId")}
          />


        </Grid>

        {/* <Grid
            item
            xs={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ width: "200px" }}>{render_dropdown()}</div>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 5 }}>
          <Grid xs={3} />
          <Grid item xs={3}>
            <AddEmployee status="Add Employee" username="aloo wala" id="1234" />
          </Grid>
          <Grid item xs={3}>
            <AddTeam
              status="Add Team"
              name={compName}
              id={sessionStorage.getItem("companyId")}
            />
          </Grid>
        </Grid> */}
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table
            //stickyHeader
            className={classes.table}
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                {/* <StyledTableCell align="center">Team ID</StyledTableCell> */}
                <StyledTableCell align="center">Team Name</StyledTableCell>
                <StyledTableCell align="center">Participants</StyledTableCell>
                {/* <StyledTableCell align="center">Description</StyledTableCell> */}
                {/* <StyledTableCell align="center">Latest Project</StyledTableCell> */}
                <StyledTableCell align="center">Skills</StyledTableCell>
                {/* <StyledTableCell align="center">Tags</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {projects?.map((project) => (
                <StyledTableRow key={project.teamid}>
                  {/* <TableCell align="center">{project.teamid}</TableCell> */}
                  <TableCell align="center">{project.name}</TableCell>
                  <TableCell align="center">
                    {/* hello */}
                    {project.memb?.map((pr) => (
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
                  {/* <TableCell align="center">{project.description}</TableCell> */}
                  {/* <TableCell align="center">{project.moduleID}</TableCell> */}
                  <TableCell align="center">
                    {/* hello */}
                    {project?.skill?.map((pr) => (
                      <Chip
                        label={pr.skill}
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
                  {/* <TableCell align="center">
                    {project.tags.map((pr) => (
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
                  </TableCell> */}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
    // </SideBarNew>
  );
}

export default Team;
