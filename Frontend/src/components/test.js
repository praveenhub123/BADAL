import React, { useState } from "react";
import Select from "react-select";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function refreshPage() {
  window.location.reload(false);
}

export default function BoxSx() {
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

  const Type = [
    { value: "core-team", label: "core-team" },
    { value: "ngo", label: "ngo" },
    { value: "company", label: "company" },
    { value: "team", label: "team" },
  ];

  const Company = [
    { value: "COMPUTER MIND", label: "COMPUTER MIND", link: "ngo" },
    { value: "EIDOS LEARNING", label: "EIDOS LEARNING", link: "ngo" },
    { value: "IBM", label: "IBM", link: "company" },
    { value: "TCS", label: "TCS", link: "company" },
    { value: "Accenture", label: "Accenture", link: "company" },
    { value: "core-team", label: "core-team", link: "core-team" },
    { value: "Samurais", label: "Samurais", link: "team" },
    { value: "Renegades", label: "Renegades", link: "team" },
  ];

  const filteredOptions = Company.filter(
    (o) => o.link === selectedOption.value
  );
  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card variant="elevation" sx={{ bgcolor: "#cfe8fc", height: "400px" }}>
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            alignItems="center"
            justifyContent="center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h3" gutterBottom component="div">
              User
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            alignItems="center"
            justifyContent="center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" gutterBottom component="div">
              Select Type :
            </Typography>
            <div style={{ width: "300px" }}>
              <Select
                value={selectedOption}
                onChange={handleChange1}
                options={Type}
              ></Select>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            alignItems="center"
            justifyContent="center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" gutterBottom component="div">
              Select company :
            </Typography>
            <div style={{ width: "300px" }}>
              <Select
                value={selectedOption2}
                onChange={handleChange2}
                options={filteredOptions}
              ></Select>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            alignItems="center"
            justifyContent="center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>
              Local storage type item: {sessionStorage.getItem("type")}
              <br />
              Local storage entity item: {sessionStorage.getItem("entity")}
            </p>
          </Grid>
          <Grid
            item
            xs={12}
            justifyContent="center"
            alignItems="center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="contained" onClick={refreshPage}>
              Reload
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
