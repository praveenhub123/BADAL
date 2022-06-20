import * as React from "react";
import { Typography, Button, Box } from "@mui/material";
import MaterialTable from "material-table";
import tableIcons from "./MaterialTableIcons";
import { useNavigate } from "react-router";

const data = [
  {
    brifdesc:
      "A brif description.A brif description.A brif description.A brif description.A brif description.",
    status: "Completed!",
    progress: "100%",
  },
];

const columns = [
  { title: "Brif Description", field: "brifdesc" },
  { title: "Status", field: "status" },
  { title: "Progress", field: "progress" },
];

export default function ProjectDetail() {
  let navigate = useNavigate();

  const redirect = () => {
    navigate("/basictable");
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
          title="Anupam"
          icons={tableIcons}
          columns={columns}
          data={data}
          style={{ width: "900px" }}
          options={{
            pageSize: 2,
            pageSizeOptions: [],
            toolbar: true,
            paging: true,
          }}
        />
        <br />
        <Typography
          component="body2"
          variant="body2"
          fontFamily={"sans-serif"}
          paddingBottom={"10px"}
          style={{
            color: "white",
          }}
        >
          <center>
            Download final project:{" "}
            <Button
              type="button"
              variant="secondary"
              sx={{ mt: 2, mb: 2 }}
              color="secondary"
              size="sm"
              style={{
                backgroundColor: "#5e5d5d",
                borderRadius: "10px",
                width: "100px",
                marginLeft: "5px",
                marginRight: "10px",
              }}
            >
              Download
            </Button>
          </center>
        </Typography>
        <br />
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
