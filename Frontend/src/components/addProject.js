import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//import FormControl from '@mui/material/FormControl';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import InputLabel from '@mui/material/InputLabel';
//import MenuItem from '@mui/material/MenuItem';
//import Select from '@mui/material/Select';
//import Switch from '@mui/material/Switch';
import { TextField } from '@mui/material';
import Autocomplete from "@mui/material/Autocomplete";
import { projectsList } from "../data/projectsList";
import { v4 as uuid } from "uuid";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT } from "../graphQL/mutations"
//import Alert from "@mui/material/Alert";
// import axios from 'axios';

export default function AddProject(props) {
  const Name = props.name;
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const userrole = sessionStorage.getItem('userRole')

  const addproject = async () => {

    await addProject({
      variables: {
        name: name,
        problem_statement: statement,
        description: description,
        tags: [],
        ngoId: sessionStorage.getItem("ngoId")
      },
    })

  };

  const [name, setName] = React.useState("")
  const [statement, setStatement] = React.useState("")
  const [description, setDescription] = React.useState("")

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleStatement = (e) => {
    setStatement(e.target.value)
  }
  const handleDescription = (e) => {
    setDescription(e.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [addProject] = useMutation(CREATE_PROJECT, {
    onCompleted: () => {
      handleClose()
    },
    onError: (err) => {
      alert(err.message)
    }
  })

  if(userrole==='CORE') {
  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={{ display: "flex" }}
      >
        {"Add Project"}
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{Name}</DialogTitle>
        <DialogContent>
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
            {/* <FormControl sx={{ mt: 2, minWidth: 120 }}>
                            <InputLabel htmlFor="status">Status</InputLabel>
                            <Select
                                autoFocus
                                value={status}
                                onChange={handleStatusChange}
                                label="maxWidth"
                                inputProps={{
                                    name: 'max-width',
                                    id: 'max-width',
                                }}
                            >
                                <MenuItem value="Applied">Applied</MenuItem>
                                <MenuItem value="Reviewing">Reviewing</MenuItem>
                                <MenuItem value="Accepted">Accepted</MenuItem>
                                <MenuItem value="Rejected">Rejected</MenuItem>
                            </Select>
                        </FormControl> */}
            <TextField
              autoFocus
              margin="dense"
              id="Pname"
              label="Project Title"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleName}
            />
            <TextField
              multiline
              margin="dense"
              id="password"
              label="Problem Statement"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleStatement}
            />
            <TextField
              multiline
              margin="dense"
              id="password"
              label="Brief Description"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleDescription}
            />
            {/* <TextField
              multiline
              margin="dense"
              id="password"
              label="Repo-Link"
              type="link"
              fullWidth
              variant="standard"
              //onChange={handleDescription}
            /> */}
            {/* <Autocomplete
              multiple
              id="tags-standard"
              options={tags}
              onChange={handleTags}
              getOptionLabel={(option) => option.name}
              //defaultValue={[top100Films[13]]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Select Tags"
                  placeholder="Favorites"
                />
              )}
              
            /> */}
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