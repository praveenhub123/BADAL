import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
// import { companiesList } from "../../data/companiesList";
import { CustomCard } from "../customCard";
import { DashboardLayout } from "../default";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Fuse from "fuse.js";
import { SideBarNew } from "../SideBarNew";
import AddCompany from "../addCompany";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_COMPANY } from "../../graphQL/query"

function Companies() {
  const [query, setQuery] = useState("");
  const [companiesList, setCompaniesList] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);

  const { loading, error, data } = useQuery(GET_COMPANY)

  useEffect(() => {
    if (data) {
      console.log(data.GetCompany)
      setCompaniesList(data.GetCompany)
      console.log(companiesList);
    }
  }, [data])

  const fuse = new Fuse(allCompanies, {
    keys: ["title"],
  });

  const results = fuse.search(query);
  const characterResults = query
    ? results.map((result) => result.item)
    : allCompanies;

  function handleOnSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);
  }

  return (
    //<NewNavbarDriver>
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
            <center>Companies & Colleges</center>
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
                  label="Search Companies"
                  variant="standard"
                  value={query}
                  onChange={handleOnSearch}
                />
              </Box>
            <AddCompany style={{ marginLeft: "20px" }} />
          </Grid>
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {companiesList.map((product) => (
                <Grid item key={product._id} lg={3} md={6} xs={12}>
                  <CustomCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
    // </SideBarNew>
  );
}

export default Companies;
