import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//import FormControl from '@mui/material/FormControl';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import InputLabel from '@mui/material/InputLabel';
//import MenuItem from '@mui/material/MenuItem';
//import Select from '@mui/material/Select';
//import Switch from '@mui/material/Switch';
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { projectsList } from "../data/projectsList";
import { v4 as uuid } from "uuid";
import { useMutation } from "@apollo/client";
import { CREATE_NGO } from "../graphQL/mutations";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { render } from "@testing-library/react";
//import Alert from "@mui/material/Alert";
// import axios from 'axios';


export default function AddNgo(props) {

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
  const userrole = sessionStorage.getItem('userRole')

  const addproject = async () => {
    console.log(name);
    await addNGO({
      variables: {
        name: name,
        phoneNumber: phone,
        address: address,
        email: email,
        company_description: description,
        urlWebsite: website,
      },
    });
  };

    
  
  const [pname, setPname] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [problemStatement, setProblemStatement] = React.useState("");

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [website, setWebsite] = React.useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDesc = (e) => {
    setDescription(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleWebsite = (e) => {
    setWebsite(e.target.value);
  };

 
    

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


  const [addNGO] = useMutation(CREATE_NGO, {
    onCompleted: (data) => {
      console.log(data);
      alert(
        `Email is ${data.createNgo.email} \n Password is ${data.createNgo.password}`
      );
      handleClose();
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const checkPassword = () => {
    const data = { pass: password, id: userId, status: status };
    console.log(data);

    // axios
    //     .post("https://api.stag-os.org/maintainers/updateStatus", data)
    //     .then((res) => {
    //         // console.log(res.data);
    //         if (res.data.status != 200) {
    //             setError(true)
    //             setErrorMsg(res.data.message)
    //             setStatus(defaultStatus)
    //         }
    //         else {
    //             setdefaultStatus(status)
    //             setError(false)
    //             setErrorMsg(res.data.message)
    //         }
    //     })
    //     .catch((err) => {
    //         // console.log(err);
    //         setError(true);
    //         setErrorMsg(err);
    //     });
    setPassword("");
    setError(false);
  };



  if(userrole === 'CORE') {
  
      return (
        <React.Fragment>
      
      <Button
            variant="contained"
            onClick={handleClickOpen}
            style={{ display: "flex" }}
          >
            {"Add NGO"}
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
            <DialogTitle>Add NGO</DialogTitle>
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
                  label="NGO Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleName}
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
                  label="Email"
                  type="text"
                  fullWidth
                  variant="standard"
                  // value={problemStatement}
                  onChange={handleEmail}
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

       else{
         return(
           <></>
         )
       }           
  }

const tags = [
  { name: "Tag 1" },
  { name: "Tag 2" },
  { name: "Tag 3" },
  { name: "Tag 4" },
];

