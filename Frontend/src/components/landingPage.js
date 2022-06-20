import React from 'react';
import { Button, Box } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const In = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "dark" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

// #5f8ce7
function landingPage() {
  return (
    <div
      style={{
        backgroundColor: "#101219",
      }}
    >
      <Link
        href="/signup"
        variant="body2"
        style={{
          textDecoration: "none",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          fontFamily={"sans-serif"}
          paddingBottom={"20px"}
          paddingTop={"20px"}
          style={{
            color: "#ebebeb",
            display: "flex",
            marginLeft: "1119px",
            justifyContent: "right",
            alignItems: "right",
          }}
        >
          Signup <ArrowForwardIcon style={{ marginTop: "6px" }} />
        </Typography>
      </Link>
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
            paddingBottom={"20px"}
            paddingTop={"20px"}
            style={{
              color: "#5f8ce7",
            }}
          >
            <center>Badal</center>
          </Typography>
          <br />
          <FormControl
            variant="standard"
            style={{
              width: "300px",
              marginLeft: "70px",
              paddingBottom: "10px",
            }}
          >
            <InputLabel
              shrink
              htmlFor="Username"
              style={{
                color: "#6e7077",
              }}
            >
              Username
            </InputLabel>
            <In id="Username" />
          </FormControl>

          <br />
          <FormControl
            variant="standard"
            style={{
              width: "300px",
              marginLeft: "70px",
              paddingBottom: "10px",
            }}
          >
            <InputLabel
              shrink
              htmlFor="Password"
              style={{
                color: "#6e7077",
              }}
            >
              Password
            </InputLabel>
            <In id="Password" type="password" />
          </FormControl>

          <Link
            href="/basictable"
            variant="body2"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              color="primary"
              style={{
                width: "230px",
                marginLeft: "5px",
                marginRight: "10px",
              }}
            >
              Login
            </Button>
          </Link>
        </Box>
      </div>
    </div>
  );
}

export default landingPage;
