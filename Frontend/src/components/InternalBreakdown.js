import * as React from "react";
import { Typography } from "@mui/material";
import MaterialTable from "material-table";
import tableIcons from "./MaterialTableIcons";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router";

export default function BasicTable() {
  let navigate = useNavigate();

  const redirect = () => {
    navigate("/dashteamfront");
  };

  const { useState } = React;

  const [data, setData] = useState([
    {
      brifdesc: "A brif description.A brif description.A brif description.",
      epics: "EPICS1",
      userstories: "UserStory1",
      task: "",
      action: "",
    },
  ]);

  const [columns, setColumns] = useState([
    { title: "Brif Description", field: "brifdesc", editable: "never" },
    { title: "EPICS", field: "epics" },
    { title: "User Stories", field: "userstories" },
    { title: "Task & WN", field: "task" },
    { title: "Action", field: "action" },
  ]);

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
          title="Internal Breakdown"
          icons={tableIcons}
          columns={columns}
          data={data}
          style={{ width: "900px" }}
          options={{
            pageSize: 2,
            toolbar: true,
            paging: true,
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData([...data, newData]);

                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);

                  resolve();
                }, 1000);
              }),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
          color="primary"
          onClick={(event) => {
            redirect();
          }}
          style={{
            backgroundColor: "#1565c0",
            borderRadius: "3px",
            marginTop: "6px",
            width: "80px",
            marginLeft: "800px",
            marginRight: "10px",
          }}
        >
          Back
        </Button>
      </Box>
    </div>
  );
}
