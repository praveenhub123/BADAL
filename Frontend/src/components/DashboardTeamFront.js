import * as React from "react";
import { Typography } from "@mui/material";
import MaterialTable from "material-table";
import tableIcons from "./MaterialTableIcons";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router";
import Link from "@mui/material/Link";

const data = [
  {
    projectID: 18856,
    projectName: "Anupam",
    internalbrk: "Click here",
    member: "add",
  },
];

const columns = [
  { title: "Project ID", field: "projectID" },
  { title: "Project Name", field: "projectName" },
  { title: "Internal Breakdown", field: "internalbrk" },
  { title: "Member", field: "member" },
];

export default function BasicTable() {
  let navigate = useNavigate();

  const tointernalbreakdown = () => {
    navigate("/intbrk");
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
          title="Dashboard Team Front"
          icons={tableIcons}
          columns={columns}
          data={data}
          style={{ width: "900px" }}
          options={{
            pageSize: 2,
            toolbar: true,
            paging: true,
          }}
          onRowClick={(event, rowData) => tointernalbreakdown()}
        />
        <Link
          href="/dashccfront"
          variant="body2"
          style={{
            textDecoration: "none",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 5, mb: 2 }}
            color="success"
            style={{
              backgroundColor: "green",
              width: "100px",
              marginTop: "5px",
              marginLeft: "500px",
            }}
          >
            next page
          </Button>
        </Link>
      </Box>
    </div>
  );
}
