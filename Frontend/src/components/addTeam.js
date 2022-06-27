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
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TEAM } from "../graphQL/mutations"
import { GET_EMPLOYEES_FOR_COMPANY, GET_SKILLS } from "../graphQL/query"
/* import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch"; */
import { TextField } from "@mui/material";
import { render } from "@testing-library/react";
//import Alert from "@mui/material/Alert";
// import axios from 'axios';

export default function AddTeam(props) {
  const username = "Add New Team"; //add from props
  const userId = props.id;
  const name = props.name;
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [status, setStatus] = React.useState(props.status);
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("Enter Password");
  const [defaultStatus, setdefaultStatus] = React.useState(props.status);
  const [employees, setEmployees] = React.useState([])
  const userrole = sessionStorage.getItem('userRole')
  const [teamName, setTeamName] = React.useState("");
  const [participantsO, setParticipantsO] = React.useState([]);
  const [participants, setParticipants] = React.useState([]);
  const [skills, setSkills] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const tagRef = React.useRef();
  var [tagOptions, setTagOptions] = React.useState([])

  const handleName = (e) => {
    setTeamName(e.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusChange = (event) => {
    setStatus(
      event.target.value
    );
  };

  const handleParticipantsChange = (event, value) => {
    var s = []
    value.forEach((x) => {
      s.push(x.id)
    })
    setParticipants(s);
  };

  const handleSkillsChange = (event, value) => {
    var s = []
    value.forEach((x) => {
      s.push(x.id)
    })
    setSkills(s);
  };

  const handleTagsChange = (event) => {
    setTags(
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

  const [addTeam] = useMutation(CREATE_TEAM, {
    onCompleted: () => {
      handleClose()
    },
    onError: (err) => {
      alert(err.message)
    }
  })

  const { loading, _, data: employeeData } = useQuery(GET_EMPLOYEES_FOR_COMPANY, {
    variables: {
      orgId: sessionStorage.getItem("companyId")  ,
    },
    skip: !sessionStorage.getItem("companyId"),
  });

  React.useEffect(() => {
    if (employeeData) {
      console.log("data is");
      console.log(employeeData);
      var names = []
      employeeData.GetEmployeeForCompany.forEach((x) => {
        names.push({
          name: x.name,
          id: x._id
        })
      })
      setParticipantsO(names)
      // setEmployees(data.GetEmployeForCompany)
    }
  }, [employeeData]);

  const { data: skillData } = useQuery(GET_SKILLS)

  React.useEffect(() => {
    if (skillData) {
      var names = []
      skillData.GetSkills.forEach((x) => {
        names.push({
          name: x.skill,
          id: x._id
        })
      })
      setTagOptions(names)
    }
  }, [skillData])

  const checkPassword = () => {
    addTeam({
      variables: {
        name: teamName,
        participants: participants,
        skill: skills,
        orgId: sessionStorage.getItem("companyId")
      },
    })
  
  };

  if(userrole==='CORE') {
  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={{ display: "flex", ...props.style }}
      >
        {defaultStatus}
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{username}</DialogTitle>
        <DialogContent>
          <DialogContentText>{name}</DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "300px",
            }}
          >
            {/* <TextField
              autoFocus
              margin="dense"
              id="Pname"
              label="Team ID"
              type="text"
              fullWidth
              variant="standard"
              // value={pname}
              // onChange={handlePasswordInput}
              // onKeyDown={handlePasswordInput}
            /> */}
            <TextField
              // autoFocus
              multiline
              margin="dense"
              id="password"
              label="Team Name"
              type="text"
              fullWidth
              variant="standard"
              // value={problemStatement}
              onChange={handleName}
              // onKeyDown={handlePasswordInput}
            />
            {/* <Grid item xs={0}>
              <TextField
                // autoFocus
                multiline
                margin="dense"
                id="password"
                label="Members"
                type="text"
                fullWidth
                variant="standard"
                // value={problemStatement}
                // onChange={handlePasswordInput}
                // onKeyDown={handlePasswordInput}
              />
            </Grid> */}
            <Autocomplete
              multiple
              id="tags-standard"
              options={participantsO}
              getOptionLabel={(option) => option.name}
              onChange={(e, v) => handleParticipantsChange(e,v)}
              //defaultValue={[top100Films[13]]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Select Participants"
                  placeholder="Favorites"
                />
              )}
            />
            <Autocomplete
              multiple
              id="tags-standard"
              options={tagOptions}
              getOptionLabel={(option) => option.name}
              //defaultValue={[top100Films[13]]}
              onChange={(e, v) => handleSkillsChange(e, v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputRef={tagRef}
                  variant="standard"
                  label="Select Skills"
                  placeholder="Favorites"
                />
              )}
            />
            {/* <Autocomplete
              multiple
              id="tags-standard"
              options={tags}
              getOptionLabel={(option) => option.name}
              //defaultValue={[top100Films[13]]}
              onChange={handleTagsChange}
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
          </Box>
          <DialogActions>
            <Button onClick={checkPassword}>Add Team</Button>
          </DialogActions>
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


// const employees = [
//   { name: "Aditya" },
//   { name: "Abhishek" },
//   { name: "Chandan" },
//   { name: "Ross" },
// ];

// const skills = [
//   { name: "Frontend" },
//   { name: "Backend" },
//   { name: "Software Devlopment" },
//   { name: "Python" },
// ];

