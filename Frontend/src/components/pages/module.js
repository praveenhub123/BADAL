import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Chip, Card } from "@mui/material";
//import { DashboardLayout } from "../default";
import { ModuleCard } from "../moduleCard";
// import { moduleList } from "../../data/moduleList";
import Divider from "@mui/material/Divider";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TextField from "@mui/material/TextField";
import Fuse from "fuse.js";
import { useParams, useLocation } from "react-router-dom";
import AddModule from "../addModule";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MODULE_FOR_PROJECT_BY_ID } from "../../graphQL/query";
import { UPDATE_MODULE_STATUS } from "../../graphQL/mutations";
import GitHubIcon from "@mui/icons-material/GitHub";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

//import { SideBarNew } from "../SideBarNew";

const tags = ["tag1", "tag2"];

function Module(props) {
  const location = useLocation();
  const [query, setQuery] = useState("");

  const stringToDate = (s) => {
    if (s) {
      const t = s.split(" ");
      return `${t[1]} ${t[2]} ${t[3]}`;
    } else {
      return "";
    }
  };

  /* 
  let [selectedOption, setselectedOption] = useState("");

  const handleChange = (sOption) => {
    setselectedOption(sOption);
    sessionStorage.setItem("company", sOption.value);
  };

  const Com = [
    { value: "core-team", label: "core-team" },
    {
      value: "Data Visualisation For whatsapp data",
      label: "Data Visualisation For whatsapp data",
    },
    {
      value: "Dashboard for Food Distribution Process",
      label: "Dashboard for Food Distribution Process",
    },
    {
      value: "Tool for Fund management from donors",
      label: "Tool for Fund management from donors",
    },
  ]; */

  /* const fuse2 = new Fuse(comapny_name, {
    keys: ["id"],
    threshold: 0,
  });

  const results2 = fuse2.search(id);
  const Cname = results2.map((result) => result.item);
 */

  const [moduleList, setModuleList] = useState([]);

  const { data } = useQuery(GET_MODULE_FOR_PROJECT_BY_ID, {
    variables: {
      projectId: sessionStorage.getItem("projectId"),
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data.GetModuleForProjectById);
      setModuleList(data.GetModuleForProjectById);
      console.log(moduleList);
      // var newData = []
      // data.GetModuleForProjectById.forEach((n) => {
      //   newData.push({
      //     id: n._id,
      //     module_Id: n._id,
      //     project_Id: n.projectId,
      //     description: n.description,
      //     created_at: n.created_at,
      //     deleted_at: n.deleted_at,
      //     updated_at: n.updated_at,
      //     assigned_to: n.assigned_to
      //   })
      // })
    }
  }, [data]);

  function handleOnSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);
  }

  const fuse = new Fuse(moduleList, {
    keys: ["name"],
    threshold: 0,
  });

  //let { id } = useParams();

  const results = fuse.search(query);
  const cResults = query ? results.map((result) => result.item) : moduleList;

  const MyAddModule = (props) => {
    const q = sessionStorage.getItem("type");
    let q1 = "core-team";
    if (q == q1) {
      return <AddModule style={{ ...props.style }} name={location.state.name} />;
    }
  };

  const [status, setStatus] = React.useState("");


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
          <center>Project Details Page</center>
        </Typography>
        <Divider sx={{ marginBottom: "20px" }} />

        {/* Detail card */}
        <Card sx={{ width: "100%", backgroundColor: "#f7f9fe" }}>
          <Grid
            container
            sx={{ padding: "10px" }}
            justifyContent="space-between"
          >
            <Typography variant="h4">{location.state.name}</Typography>
            <FormControl sx={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Status
              </InputLabel>
              <Select
                id="select-autowidth"
                value={status}
                // onChange={handleChange}
                label="Status"
              >
                <MenuItem value={10}>Ongoing</MenuItem>
                <MenuItem value={21}>Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Typography
            variant="h6"
            color="text.secondary"
            style={{ paddingLeft: 10, marginBottom: 20 }}
          >
            {location.state.desc}
          </Typography>
          <Grid container>
            <Grid container sx={{ marginBottom: 3, flexDirection: "column" }}>
              <Grid item xs={2}>
                <ul>
                  <li>
                    <Typography
                      display="flex"
                      color="text.secondary"
                      sx={{
                        // justifyContent: "center",
                        // alignContent: "Center",
                        paddingLeft: "10px",
                        paddingTop: "16px",
                        fontSize: "14px",
                      }}
                    >
                      {/* {"Created : " + stringToDate(location.state.created_at)} */}
                      {"Created : " + "27th April 2022"}
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
                        paddingLeft: "10px",
                        // justifyContent: "center",
                        // alignContent: "Center",
                        paddingTop: "16px",
                        fontSize: "14px",
                      }}
                    >
                      {/* {"Updated : " + stringToDate(location.state.updated_at)} */}
                      {"Updated : " + "27th April 2022"}
                    </Typography>
                  </li>
                </ul>
              </Grid>

              <Grid item xs={2}>
                <ul>
                  <li>
                    <Typography
                      display="flex"
                      sx={{
                        paddingLeft: "10px",
                        // justifyContent: "center",
                        // alignContent: "Center",
                        paddingTop: "16px",
                      }}
                    >
                      <GitHubIcon
                        fontSize="large"
                        sx={{ marginLeft: 1, marginTop: 2 }}
                      />
                    </Typography>
                  </li>
                </ul>
              </Grid>
            </Grid>

            {/*
            <Grid
              item
              xs={3}
              display="flex"
              sx={{
                justifyContent: "center",
                alignContent: "Center",
              }}
            >
              <ul>
                <li>
                  <GitHubIcon
                    fontSize="large"
                    sx={{ marginLeft: 1, marginTop: 2 }}
                  />
                </li>
              </ul>
            </Grid> */}
            {/* <Grid item xs={3}>
              <ul>
                <li>
                  <Typography
                    display="flex"
                    sx={{
                      justifyContent: "center",
                      alignContent: "Center",
                      paddingTop: "16px",
                    }}
                  >
                    Tags
                  </Typography>
                </li>
                <li>
                  <Typography
                    display="flex"
                    sx={{
                      justifyContent: "center",
                      alignContent: "Center",
                      //paddingTop: "20px",
                      paddingBottom: "10px",
                    }}
                  >
                    {tags.map((pr) => (
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
                  </Typography>
                </li>
              </ul>
            </Grid> */}
          </Grid>
        </Card>

        <Typography variant="h5" style={{ paddingTop: 20 }}>
          <center>Modules</center>
        </Typography>
        <Divider />
        <Grid container justifyContent="flex-end" alignItems="flex-end">
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
              label="Search Modules"
              variant="standard"
              value={query}
              onChange={handleOnSearch}
            />
          </Box>
          <MyAddModule style={{ marginLeft: "20px" }} />

          {/* <Grid
            item
            xs={2.5}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              marginTop: 3,
            }}
          >
            <div style={{ width: "200px" }}>
              <Select
                placeholder="Select company ..."
                value={selectedOption}
                onChange={handleChange}
                options={Com}
              ></Select>
            </div>
          </Grid> */}
        </Grid>
        <Container maxHeight={true} maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {cResults.map((product) => (
                <Grid item key={product.id} lg={3} md={6} xs={12}>
                  <ModuleCard product={product} />
                </Grid>
              ))}
              <Box width="100%" />
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
    //</SideBarNew>
  );
}

export default Module;
