import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DialogTitle from "@mui/material/DialogTitle";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_MODULE_TO_PROJECT_BY_ID } from "../graphQL/mutations"
import { GET_SKILLS } from "../graphQL/query"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from "@mui/material/Autocomplete";
import { Divider } from "@mui/material";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export default function AddModule(props) {
  const username = "Org Name"; //add from props
  const userId = props.id;
  const Name = props.name;
  const [open, setOpen] = React.useState(false);
  const [Complexity, setComplexity] = React.useState('');
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [status, setStatus] = React.useState(props.status);
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("Enter Password");
  const [defaultStatus, setdefaultStatus] = React.useState(props.status);


  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [sub, setSub] = React.useState("")
  const [problemStatement, setProblemStatement] = React.useState("");
  const [value, setValue] = React.useState(new Date());
  const { data } = useQuery(GET_SKILLS)
  var [tagOptions, setTagOptions] = React.useState([])
  var [Tags, setTags] = React.useState([])
  const userrole = sessionStorage.getItem('userRole')

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

  const handleComplexity = (event) => {
    setComplexity(event.target.value);
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

  if(userrole==='CORE') {
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
        // fullWidth={fullWidth}
        // maxWidth={md}
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
              // m: "auto",
              width: "400px",
            }}
          >

            <TextField
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

             <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{my:1}}>
                            <Grid item xs={6}>
                            <TextField
                                // id="input-with-icon-textfield"
                                label="Required"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Divider orientation="vertical"/>
                                      Hours
                                    </InputAdornment>
                                  ),
                                }}
                                variant="outlined"
                              />
                            </Grid>

                            <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>

                            <DatePicker
                                  variant="standard"
                                  disablePast
                                  views={['year', 'month']}
                                  label="Deadline"
                                  value={value}
                                  onChange={(newValue) => {
                                    setValue(newValue);
                                  }}
                                  renderInput={(params) => <TextField {...params} helperText={null} />}
                                />
                           </LocalizationProvider>
                            </Grid>

                           
            </Grid>

           
            <FormControl variant="standard" fullWidth>
                              <InputLabel id="demo-simple-select-autowidth-label">Complexity</InputLabel>            
                              <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={Complexity}
                              label="Complexity"
                              onChange={handleComplexity}
                              >
                            <MenuItem value={10}>Low</MenuItem>
                            <MenuItem value={20}>Medium</MenuItem>
                            <MenuItem value={30}>High</MenuItem>
                            </Select>
            </FormControl>                           
            
            <TextField
              id="Pname"
              label="Sub Directory Link"
              type="link"
              fullWidth
              variant="standard"
              onChange={handleSub}
            />
           
           <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{my:1}}>
            <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              style={{
                marginTop: 8,
                maxHeight: 28,
              }}
              component="label"
            >
              <AddIcon /> Requirements
              <input type="file" id="req" hidden />
            </Button>
            </Grid>

            <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              style={{
                marginTop: 8,
                maxHeight: 28,
              }}
              component="label"
            >
              <AddIcon /> UI Screens
              <input type="file" id="ui" hidden />
            </Button>
            </Grid>
           
            <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              style={{
                marginTop: 8,
                maxHeight: 28,
              }}
              component="label"
            >
              <AddIcon /> API Build
              <input type="file" id="api" hidden />
            </Button>
            </Grid>
           
            <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              style={{
                marginTop: 8,
                maxHeight: 28,
              }}
              component="label"
            >
              {" "}
              <AddIcon /> DB Build
              <input type="file" id="db" hidden />
            </Button>
            </Grid>
          </Grid>

            <DialogActions>
              <Button onClick={checkPassword}>Done</Button>
            </DialogActions>
          </Box>
        </DialogContent>
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