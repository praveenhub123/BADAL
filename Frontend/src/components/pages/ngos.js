import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { ngoList } from "../../data/ngoList";
import { NgoCard } from "../ngoCard";
import { DashboardLayout } from "../default";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Fuse from "fuse.js";
import { SideBarNew } from "../SideBarNew";
import AddNgo from "../addNgo";
import { useQuery } from "@apollo/client";
import { GET_NGO } from "../../graphQL/query"


function Companies() {
  const [query, setQuery] = useState("");

  const [characterResults, setCharacterResults] = useState([])

  function handleOnSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);
  }

  const { data } = useQuery(GET_NGO)

  useEffect(() => {
    if (data) {

      var newData = []
      data.GetNgo.forEach((n) => {
        newData.push({
          id: n._id,
          name: n.name,
          phoneNumber: n.phoneNumber,
          email: n.email,
          address: n.address,
          company_description: n.company_description,
          createdAt: n.created_at,
          deletedAt: n.deleted_at,
          size: n.size,
          updatesAt: n.updated_at,
          website: n.urlWebsite,
          NumberOfOnGoingProjects: n.NumberOfOnGoingProjects,
          NumberOfcompletedProjects: n.NumberOfcompletedProjects,
        })
      })
      

      setCharacterResults(newData)
      
    }
  }, [data])

  const fuse = new Fuse(characterResults, {
    keys: ["name"],
  });
  const results = fuse.search(query);
  const cResults = query
    ? results.map((result) => result.item)
    : characterResults;

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
        {data !== null ? (
          <Container
            maxWidth={true}
            style={{ padding: 0, marginRight: "24px" }}
          >
            <Typography
              style={{ paddingTop: 20, fontSize: "24px", fontWeight: "bold" }}
            >
              <center>NGOs</center>
            </Typography>
            <Divider />
            <Grid container spacing={2} justifyContent="flex-end">
              {/* <Grid item xs={8.3}></Grid> */}

              <Grid
                item
                sx={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}
              >
                {/* <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    marginLeft: 2,
                    marginTop: 2,
                  }}
                > */}
                  <SearchOutlinedIcon
                  sx={{ color: "active", my: "3px" }}
                  />
                  <TextField
                    id="Search tile"
                    label="Search NGOs"
                    variant="standard"
                    value={query}
                    onChange={handleOnSearch}
                  sx={{ flex: 1, margin: "0 20px", width: "250px " }}
                  />
                <AddNgo />
                {/* </Box> */}
              </Grid>
              {/* <Grid
                item
                xs={1.2}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
              </Grid> */}
            </Grid>
            <Box sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                {characterResults.map((product) => (
                  <Grid item key={product.id} lg={3} md={6} xs={12}>
                    <NgoCard product={product} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        ) : null}
      </Box>
    </>
    //</NewNavbarDriver>
  );
}

export default Companies;
