import React, { useState, useEffect } from "react";
import { Box, Container, FormControl, Grid, Typography } from "@mui/material";
import Head from "next/head";
import Select from "react-select";
//import { DashboardLayout } from "../default";
//import { SideBarNew } from "../SideBarNew";
import { ProjectCard } from "../projectCard";
import Divider from "@mui/material/Divider";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TextField from "@mui/material/TextField";
import Fuse from "fuse.js";
import AddProject from "../addProject";
import { useQuery } from "@apollo/client";
import { GET_PROJECT_FOR_NGO_BY_NGO_ID, GET_NGO, GET_ALL_PROJECTS } from "../../graphQL/query"

function Products() {
  const [query, setQuery] = useState("");

  const { loading, error, data } = useQuery(GET_PROJECT_FOR_NGO_BY_NGO_ID, {
    variables: {
      ngoId: sessionStorage.getItem("ngoId"),
    },
    skip: !sessionStorage.getItem("ngoId")
  });

  const { _, err, data: projectData } = useQuery(GET_ALL_PROJECTS, {
    skip: sessionStorage.getItem("ngoId")
  });

  const [characterResults, setCharacterResults] = useState([]);
  const [Company, setCompany] = useState([])
  const [filterSelect, setFilterSelect] = useState({})
  
  const { data: ngoData } = useQuery(GET_NGO)

  useEffect(() => {
    if (ngoData) {
      var c = []
      ngoData.GetNgo.forEach((n) => {
        if (n._id === sessionStorage.getItem("ngoId")) {
          setFilterSelect({
            label: n.name,
            value: n._id
          })
        }
        c.push({
          value: n._id,
          label: n.name
        })
      })
      setCompany(c)
    }
  }, [ngoData])

  useEffect(() => {
    if (data) {
      console.log("data is");
      console.log(data);
      console.log(characterResults);

      var newData = [];
      data.GetProjectForNgoByNgoId.forEach((n) => {
        newData.push({
          id: n._id,
          name: n.name,
          address: n.address,
          problem_statement: n.description,
          created_at: n.created_at,
          deleted_at: n.deleted_at,
          tags: n.tags,
          updated_at: n.updated_at,
          noOfModules: n.noOfModules,
          progress: n.progress,
        });
      });

      setCharacterResults(newData);
    }
  }, [data]);

  useEffect(() => {
    if (projectData) {
      var newData = [];
      projectData.GetAllProjects.forEach((n) => {
        newData.push({
          id: n._id,
          name: n.name,
          address: n.address,
          problem_statement: n.description,
          created_at: n.created_at,
          deleted_at: n.deleted_at,
          tags: n.tags,
          updated_at: n.updated_at,
          noOfModules: n.noOfModules,
          progress: n.progress,
        });
      });

      setCharacterResults(newData);
    }
  }, [projectData]);

  /* const fuse1 = new Fuse(projectsList, {
    keys: ["ngo", "company", "team"],
    //threshold: 0.3,
  });

  const q = sessionStorage.getItem("entity");

  const results1 = fuse1.search(q);
  const characterResults1 = results1.map((result) => result.item); */

  const fuse = new Fuse(characterResults, {
    keys: ["name"],
    threshold: 0,
  });

  const results = fuse.search(query);
  const cResults = query
    ? results.map((result) => result.item)
    : characterResults;

  function handleOnSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);
  }

  //filter items bellow

  let [selectedOption, setselectedOption] = useState("");
  let [selectedOption2, setselectedOption2] = useState("");

  const handleChange1 = (sOption) => {
    setselectedOption(sOption);
    sessionStorage.setItem("type", sOption.value);
  };

  const handleChange2 = (sOption) => {
    setselectedOption2(sOption);
    sessionStorage.setItem("entity", sOption.value);
  };

  // will be fetched from backend [integration]
  // const Company = [
  //   { value: "All", label: "All" },
  //   { value: "COMPUTER MIND", label: "COMPUTER MIND" },
  //   { value: "EIDOS LEARNING", label: "EIDOS LEARNING" },
  //   { value: "ADARSH SIKSHA", label: "ADARSH SIKSHA" },
  //   { value: "AADESH DIGITAL", label: "AADESH DIGITAL" },
  // ];

  const MyDropdown = ({ style }) => {
    const q = sessionStorage.getItem("type");
    let q1 = "core-team";
    if (q == q1) {
      if (sessionStorage.getItem("ngoId") !== null) {
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
        <Container maxWidth={true} style={{ padding: 0, marginRight: "24px" }}>
          <Typography
            style={{ paddingTop: 20, fontSize: "24px", fontWeight: "bold" }}
          >
            <center>Projects</center>
          </Typography>
          <Divider />
          <Grid container spacing={2} justifyContent="flex-end" alignItems="flex-end">
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
                label="Search Projects"
                variant="standard"
                value={query}
                onChange={handleOnSearch}
              />
            </Box>

            {/* <div style={{ width: "200px", marginTop: 16 }}> */}
            <MyDropdown style={{ margin: "0 20px", width: "250px" }} />
            {/* </div> */}

            <AddProject />


            {/* <Grid item xs={6}></Grid> */}
            {/* <Grid
              item
              xs={1.5}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AddProject />
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ width: "200px", marginTop: 16 }}>
                {render_dropdown()}
              </div>
            </Grid>
            <Grid item xs={2.5} sx={{ display: "flex", flexDirection: "row" }}>
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
                  label="Search Projects"
                  variant="standard"
                  value={query}
                  onChange={handleOnSearch}
                />
              </Box>
            </Grid> */}
            {/* 
            <Grid 
              item
              xs={3}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ width: "200px" }}>
                <Select
                  placeholder="Select Type ..."
                  value={selectedOption}
                  onChange={handleChange1}
                  options={Type}
                ></Select>
              </div>
            </Grid> */}
          </Grid>
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {cResults.map((product) => (
                <Grid item key={product.id} lg={3} md={6} xs={12}>
                  <ProjectCard product={product} />
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

export default Products;
