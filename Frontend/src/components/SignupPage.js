import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Card, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { alpha, styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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

function SignupPage() {
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#101219",
        color: "#ebebeb",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{ minWidth: 450 }}
        style={{
          marginTop: "auto",
          marginBottom: "auto",
        }}
      >
        <Grid>
          <Typography
            component="h5"
            variant="h5"
            fontFamily={"Segoe UI"}
            style={{
              width: "600px",
              marginLeft: "90px",
              color: "#5f8ce7",
            }}
          >
            <center>Enter your details :</center>
          </Typography>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={6}
            md={6}
            style={{
              marginLeft: "10px",
              color: "#6e7077",
            }}
          >
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
                htmlFor="name"
                style={{
                  color: "#6e7077",
                }}
              >
                Name
              </InputLabel>
              <In id="name" />
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
                htmlFor="address"
                style={{
                  color: "#6e7077",
                }}
              >
                Address
              </InputLabel>
              <In id="address" />
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
                htmlFor="pincode"
                style={{
                  color: "#6e7077",
                }}
              >
                Pincode
              </InputLabel>
              <In id="pincode" />
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
                htmlFor="contactno"
                style={{
                  color: "#6e7077",
                }}
              >
                Contact Number
              </InputLabel>
              <In id="contactno" />
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
                htmlFor="size"
                style={{
                  color: "#6e7077",
                }}
              >
                Size
              </InputLabel>
              <In id="size" />
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
                htmlFor="companydesc"
                style={{
                  color: "#6e7077",
                }}
              >
                Company Desc.
              </InputLabel>
              <In id="companydesc" />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={5}
            md={5}
            style={{
              marginLeft: "10px",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
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
                htmlFor="orgid"
                style={{
                  color: "#6e7077",
                }}
              >
                OrgID
              </InputLabel>
              <In id="orgid" />
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
                htmlFor="Username"
                style={{
                  color: "#6e7077",
                }}
              >
                Create Username
              </InputLabel>
              <In id="username" />
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
                htmlFor="password1"
                style={{
                  color: "#6e7077",
                }}
              >
                Create Password
              </InputLabel>
              <In id="password1" />
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
                htmlFor="password2"
                style={{
                  color: "#6e7077",
                }}
              >
                Confirm Password
              </InputLabel>
              <In id="password2" />
            </FormControl>
          </Grid>
        </Grid>
        <Grid xs={12} md={12}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            color="success"
            style={{
              width: "200px",
              marginLeft: "280px",
              marginRight: "50px",
            }}
          >
            SignUp
          </Button>
        </Grid>
        <Grid
          item
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link href="/" variant="body2">
            {"Already have an account? Log In"}
          </Link>
        </Grid>
      </Box>
    </div>
  );
}
export default SignupPage;
