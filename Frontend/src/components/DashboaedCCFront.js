import * as React from "react";
import { Typography } from "@mui/material";
import MaterialTable from "material-table";
import tableIcons from "./MaterialTableIcons";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";

const data = [
  {
    projectID: 18856,
    projectName: "Anupam",
  },
];

const columns = [
  { title: "Project ID", field: "projectID" },
  { title: "Project Name", field: "projectName" },
];

export default function BasicTable() {
  let navigate = useNavigate();

  const totask = () => {
    navigate("/task");
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#101219",
        color: "#ebebeb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{ minWidth: 350 }}
        style={{
          marginTop: "100px",
          marginBottom: "auto",
          alignContent: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          fontFamily={"sans-serif"}
          paddingBottom={"10px"}
          style={{
            color: "#5f8ce7",
          }}
        >
          <center>Badal</center>
        </Typography>
        <br />
        <MaterialTable
          title="Dashboard Collage & Company Front"
          icons={tableIcons}
          columns={columns}
          data={data}
          style={{ width: "900px" }}
          options={{
            pageSize: 2,
            toolbar: true,
            paging: true,
          }}
          onRowClick={(event, rowData) => totask()}
        />
      </Box>
    </div>
  );
}
