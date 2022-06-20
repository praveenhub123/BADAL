import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
/* import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch"; */
import { TextField, Typography } from "@mui/material";
//import Alert from "@mui/material/Alert";
// import axios from 'axios';

import Chip from "@mui/material/Chip";

//icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import PublicIcon from "@mui/icons-material/Public";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import WorkIcon from "@mui/icons-material/Work";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function CompanyDetails(props) {
  const company = props.company;
  const username = "Add New Team"; //add from props
  const userId = props.id;
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [status, setStatus] = React.useState(props.status);
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("Enter Password");
  const [defaultStatus, setdefaultStatus] = React.useState(props.status);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusChange = (event) => {
    setStatus(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  const handlePasswordInput = (event) => {
    if (event.keyCode == 13) {
      checkPassword();
    } else {
      setPassword(event.target.value);
    }
  };

  const checkPassword = () => {
    setPassword("");
    setError(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="text"
        onClick={handleClickOpen}
        style={{ display: "flex", margin: "5px" }}
      >
        {/* <a
        onClick={handleClickOpen}
        style={{ display: "flex", fontSize: "12px", color: "#3337f5", cursor: "pointer" }}
      > */}
        Read More
        {/* </a> */}
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        style={{ cursor: "pointer" }}
      >
        <Typography
          display="flex"
          color="#808080"
          sx={{
            justifyContent: "Right",
            marginTop: 2,
            marginRight: 2,
            alignContent: "Right",
          }}
        >
          <IconButton>
            <CloseIcon fontSize="large" onClick={handleClose} />
          </IconButton>
        </Typography>
        <DialogTitle
          display="flex"
          sx={{
            justifyContent: "center",
            alignContent: "Center",
            paddingBottom: "0px",
          }}
        >
          {company.name}
        </DialogTitle>
        <Typography
          display="flex"
          sx={{
            justifyContent: "center",
            alignContent: "Center",
            //paddingTop: "20px",
            paddingBottom: "10px",
          }}
        >
          {/* {company.tags.map((pr) => (
            <Chip
              label={pr}
              variant="outlined"
              size="small"
              style={{
                width: "min-content",
                marginLeft: 1,
                marginTop: 2,
              }}
            />
          ))} */}
        </Typography>
        <DialogContent dividers>
          <Box
            noValidate
            // component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "Center",
              m: "auto",
              width: "auto",
            }}
          >
            <Grid container paddingBottom="25px" paddingTop="15px">
              <Grid item xs={4}>
                <ul>
                  <li>
                    <Typography
                      display="flex"
                      sx={{
                        justifyContent: "center",
                        alignContent: "Center",
                      }}
                    >
                      <WorkIcon sx={{ paddingRight: "2px" }} />
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      display="flex"
                      sx={{
                        justifyContent: "center",
                        alignContent: "Center",
                      }}
                    >
                      {company.email}
                    </Typography>
                  </li>
                </ul>
              </Grid>
              <Grid item xs={4}>
                <ul>
                  <li>
                    <Typography
                      display="flex"
                      sx={{
                        justifyContent: "center",
                        alignContent: "Center",
                      }}
                    >
                      <LocationOnIcon />
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      display="flex"
                      sx={{
                        justifyContent: "center",
                        alignContent: "Center",
                      }}
                    >
                      {company.address}
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      display="flex"
                      sx={{
                        justifyContent: "center",
                        alignContent: "Center",
                      }}
                    >
                      {company.pincode}
                    </Typography>
                  </li>
                </ul>
              </Grid>

              <Grid item xs={4}>
                <ul>
                  <li>
                    <Typography
                      display="flex"
                      sx={{
                        justifyContent: "center",
                        alignContent: "Center",
                      }}
                    >
                      <CallIcon sx={{ paddingRight: "2px" }} />
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      display="flex"
                      sx={{
                        justifyContent: "center",
                        alignContent: "Center",
                      }}
                    >
                      {company.phoneNumber}
                    </Typography>
                  </li>
                </ul>
              </Grid>
            </Grid>

            <Typography
              display="flex"
              sx={{
                justifyContent: "center",
                alignContent: "Center",
                paddingTop: "0px",
              }}
            >
              <LibraryBooksIcon sx={{ paddingRight: "2px" }} />
            </Typography>
            <Typography
              display="flex"
              sx={{
                justifyContent: "center",
                alignContent: "Center",
              }}
            >
              {company.company_description}
            </Typography>

            <ul>
              <li>
                <Typography
                  display="flex"
                  sx={{
                    justifyContent: "center",
                    alignContent: "Center",
                    paddingTop: "16px",
                  }}
                >
                  {company.size}
                </Typography>
              </li>
              <li>
                <Typography
                  display="flex"
                  sx={{
                    justifyContent: "center",
                    alignContent: "Center",
                  }}
                >
                  Company Size
                </Typography>
              </li>
            </ul>
            <Grid continer>
              <Grid
                item
                xs={12}
                display="flex"
                sx={{
                  justifyContent: "center",
                  alignContent: "Center",
                  paddingTop: "8px",
                }}
              >
                <Button
                  variant="outlined"
                  display="flex"
                  sx={{
                    justifyContent: "center",
                    alignContent: "Center",
                    width: "100px",
                  }}
                  onClick={() => window.open(company.urlWebsite)}
                >
                  Website
                </Button>
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleClose}>Done</Button>
            </DialogActions>
          </Box>
        </DialogContent>
        {/* <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions> */}
      </Dialog>
    </React.Fragment>
  );
}
