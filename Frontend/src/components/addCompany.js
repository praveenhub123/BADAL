import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { projectsList } from "../data/projectsList";
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { useMutation } from "@apollo/client";
import { CREATE_ORGANISATION } from "../graphQL/mutations";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function AddCompany(props) {
  const userId = props.id;
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [status, setStatus] = React.useState(props.status);
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("Enter Password");
  const [defaultStatus, setdefaultStatus] = React.useState(props.status);
  const [item, setItem] = React.useState(projectsList);


  const addproject = async () => {

    await addCompany({
      variables: {
        name: name,
        phoneNumber: phone,
        address: address,
        email: email,
        company_description: description,
        urlWebsite: website,
      },
    })

  };

  //delete unused vars abv

  const [pname, setPname] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [problemStatement, setProblemStatement] = React.useState("");

  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [website, setWebsite] = React.useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleName = (e) => {
    setName(e.target.value)
    console.log(name)
  }

  const handleDesc = (e) => {
    setDescription(e.target.value)
  }
  const handleAddress = (e) => {
    setAddress(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  
  const handlePhone = (e) => {
    setPhone(e.target.value)
  }

  const handleWebsite = (e) => {
    setWebsite(e.target.value)
  }

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

  const [addCompany] = useMutation(CREATE_ORGANISATION, {
    onCompleted: (data) => {
      alert(`Email is ${data.createOrganisation.email} \n Password is ${data.createOrganisation.password}`)
      handleClose()
    },
    onError: (err) => {
      alert(err.message)
    }
  })

  const checkPassword = () => {
    // const data = { pass: password, id: userId, status: status };
    // console.log(data);
    // setPassword("");
    // setError(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={{ display: "flex", ...props.style }}
      >
        {"Add New"}
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
        <DialogTitle>Add Company / College</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Current Status : {defaultStatus} */}
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "400px",
            }}
          >
            <TextField
              autoFocus
              margin="dense"
              id="Pname"
              label="Company Name"
              type="text"
              fullWidth
              variant="standard"
              // value={pname}
              onChange={handleName}
              // onKeyDown={handlePasswordInput}
            />
            <TextField
              autoFocus
              margin="dense"
              id="Pname"
              label="Email"
              type="text"
              fullWidth
              variant="standard"
              // value={pname}
              onChange={handleEmail}
              // onKeyDown={handlePasswordInput}
            />
            <TextField
              // autoFocus
              multiline
              margin="dense"
              id="password"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              // value={desc}
              onChange={handleDesc}
              // onKeyDown={handlePasswordInput}
            />
            <TextField
              // autoFocus
              multiline
              margin="dense"
              id="password"
              label="Address"
              type="text"
              fullWidth
              variant="standard"
              // value={problemStatement}
              onChange={handleAddress}
              // onKeyDown={handlePasswordInput}
            />
            <TextField
              // autoFocus
              multiline
              margin="dense"
              id="password"
              label="Phone Number"
              type="text"
              fullWidth
              variant="standard"
              // value={problemStatement}
              onChange={handlePhone}
              // onKeyDown={handlePasswordInput}
            />
            <TextField
              // autoFocus
              multiline
              margin="dense"
              id="password"
              label="Website"
              type="url"
              fullWidth
              variant="standard"
              // value={problemStatement}
              onChange={handleWebsite}
              // onKeyDown={handlePasswordInput}
            />
            {/* {error ? (
                            <Alert severity="error">{errorMsg}</Alert>
                        ) : (
                            <Alert severity="success">{errorMsg}</Alert>
                        )} */}
            <DialogActions>
              <Button onClick={addproject}>Add</Button>
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

const tags = [
  { name: "Tag 1" },
  { name: "Tag 2" },
  { name: "Tag 3" },
  { name: "Tag 4" },
];