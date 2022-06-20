import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useMutation } from "@apollo/client";
import { ADD_TASK_TO_MODULE_BY_ID } from "../graphQL/mutations"

export default function AddTask(props) {
  const username = "Module Name"; //add from props
  const userId = props.id;
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [status, setStatus] = React.useState(props.status);
  const [password, setPassword] = React.useState("");
  const [defaultStatus, setdefaultStatus] = React.useState(props.status);


  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleDesc = (e) => {
    setDesc(e.target.value)
  }
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

  const [addTask] = useMutation(ADD_TASK_TO_MODULE_BY_ID, {
    onCompleted: () => {
      handleClose()
    },
    onError: (err) => {
      alert(err.message)
    }
  })

  const checkPassword = () => {
    const data = { pass: password, id: userId, status: status };
    console.log(data);

    addTask({
      variables: {
        name: name,
        ModuleId: sessionStorage.getItem("moduleId"),
        description: desc,
      },
    })

  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={{ display: "flex", margin: "auto", marginBottom: "5px" }}
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
              width: "500px",
            }}
          >

            <TextField
              autoFocus
              margin="dense"
              id="Pname"
              label="Task Name"
              type="text"
              fullWidth
              variant="standard"
              // value={pname}
              onChange={handleName}
            // onKeyDown={handlePasswordInput}
            />
            <TextField
              // autoFocus
              multiline
              margin="dense"
              id="password"
              label="Task Description"
              type="text"
              fullWidth
              variant="standard"
              // value={problemStatement}
              onChange={handleDesc}
            // onKeyDown={handlePasswordInput}
            />
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
                <MenuItem value="ONGOING">Ongoing</MenuItem>
                <MenuItem value="COMPLETED">Completed</MenuItem>
              </Select>
            </FormControl> */}
            {/* {error ? (
                            <Alert severity="error">{errorMsg}</Alert>
                        ) : (
                            <Alert severity="success">{errorMsg}</Alert>
                        )} */}
            <DialogActions>
              <Button onClick={checkPassword}>Done</Button>
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
