import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_MODULE_TO_PROJECT_BY_ID } from "../graphQL/mutations"
import { GET_SKILLS } from "../graphQL/query"
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
//import Alert from "@mui/material/Alert";
// import axios from 'axios';

export default function AddModule(props) {
  const username = "Org Name"; //add from props
  const userId = props.id;
  const Name = props.name;
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [status, setStatus] = React.useState(props.status);
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("Enter Password");
  const [defaultStatus, setdefaultStatus] = React.useState(props.status);

  //delete unused vars abv

  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [sub, setSub] = React.useState("")
  const [problemStatement, setProblemStatement] = React.useState("");

  const { data } = useQuery(GET_SKILLS)
  var [tagOptions, setTagOptions] = React.useState([])
  var [Tags, setTags] = React.useState([])

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

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleDesc = (e) => {
    setDescription(e.target.value)
  }

  const handleSub = (e) => {
    setSub(e.target.value)
  }

  React.useEffect(() => {
    if (data) {
      var names = []
      data.GetSkills.forEach((x) => {
        names.push({
          name: x.skill,
          id: x._id
        })
      })
      setTagOptions(names)
    }
  }, [data])

  const [addModule] = useMutation(ADD_MODULE_TO_PROJECT_BY_ID, {
    onCompleted: () => {
      handleClose()
    },
    onError: (err) => {
      alert(err.message)
    }
  })

  const handleTags = (v) => {
    var s = []
    v.forEach((x) => {
      s.push(x.id)
    })
    setTags(s);
  }

  // const reqInput = document.getElementById('req');
  // reqInput.onchange = () => {
  //   const selectedFile = reqInput.files[0];
  //   console.log(selectedFile);
  // }

  function getBase64(file) {
    if (!file) {
      return null
    }

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
  

  const checkPassword = () => {

    addModule({
      variables: {
        name: name,
        projectId: sessionStorage.getItem("projectId"),
        description: description,
        skills: Tags,
        repo: sub,
        requirements: getBase64(document.getElementById('req')?.files[0]),
        ui_screen: getBase64(document.getElementById('ui')?.files[0]),
        api_build: getBase64(document.getElementById('api')?.files[0]),
        db_tables: getBase64(document.getElementById('db')?.files[0]),
      },
    })
   
    setPassword("");
    setError(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={{ display: "flex", ...props.style }}
      >
        {"Add Module"}
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{Name}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Current Status : {defaultStatus}
          </DialogContentText> */}
          <Box
            noValidate
            component="form"
            textAlign="center"
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
              label="Module Title"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleName}
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
              onChange={handleDesc}
            />
            <Autocomplete
              multiple
              id="tags-standard"
              options={tagOptions}
              onChange={(_, v) => handleTags(v)}
              getOptionLabel={(option) => option.name}
              //defaultValue={[top100Films[13]]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Select Skills"
                  placeholder="Favorites"
                />
              )}
            />
            <TextField
              autoFocus
              margin="dense"
              id="Pname"
              label="Sub Directory Link"
              type="link"
              fullWidth
              variant="standard"
              onChange={handleSub}
            />
            <Button
              variant="outlined"
              style={{
                marginTop: 8,
                maxHeight: 28,
                borderRadius: 10,
              }}
              component="label"
            >
              <AddIcon /> Requirements
              <input type="file" id="req" hidden />
            </Button>
            <Button
              variant="outlined"
              style={{
                marginTop: 8,
                maxHeight: 28,
                borderRadius: 10,
              }}
              component="label"
            >
              <AddIcon /> UI Screens
              <input type="file" id="ui" hidden />
            </Button>
            <Button
              variant="outlined"
              style={{
                marginTop: 8,
                maxHeight: 28,
                borderRadius: 10,
              }}
              component="label"
            >
              <AddIcon /> API Build
              <input type="file" id="api" hidden />
            </Button>
            <Button
              variant="outlined"
              style={{
                marginTop: 8,
                maxHeight: 28,
                borderRadius: 10,
              }}
              component="label"
            >
              {" "}
              <AddIcon /> DB Build
              <input type="file" id="db" hidden />
            </Button>
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
                                <MenuItem value="">Applied</MenuItem>
                                <MenuItem value="Reviewing">Reviewing</MenuItem>
                                <MenuItem value="Accepted">Accepted</MenuItem>
                                <MenuItem value="Rejected">Rejected</MenuItem>
                            </Select>
                        </FormControl> */}
            <DialogActions>
              <Button onClick={checkPassword}>Done</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

// const tags = [
//   { name: "Tag 1" },
//   { name: "Tag 2" },
//   { name: "Tag 3" },
//   { name: "Tag 4" },
// ];
