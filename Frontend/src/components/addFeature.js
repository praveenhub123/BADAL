import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import axios from 'axios';



export default function AddFeature(props) {
    // const username = props.taskName;//add from props
    const project_Id = props.project_Id;
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('lg');
    // const [status, setStatus] = React.useState(props.status);
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("Enter Password");
    // const [defaultStatus, setdefaultStatus] = React.useState(props.status);


    //delete unused vars abv

    const [pname, setPname] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [problemStatement, setProblemStatement] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const handleStatusChange = (event) => {
    //     setStatus(
    //         // @ts-expect-error autofill of arbitrary value is not handled.
    //         event.target.value,
    //     );
    // };

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };


    return (
        <React.Fragment>
            <Chip
                label="Add new feature"
                onClick={handleClickOpen}
                // color="error"
                icon={<AddIcon />}
                style={{ display: "flex", margin: "22px", justifyContent: "center", alignItems: "center" }}
            // style={{ display: "flex", margin: "auto", marginBottom: "5px" }}
            />
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
            >
                {/* <DialogTitle>{username}</DialogTitle> */}
                <DialogContent>
                    <DialogContentText>
                        Add a new Feature
                    </DialogContentText>
                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: '500px',
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
                            label="Project Name"
                            type="text"
                            fullWidth
                            variant="standard"
                        // value={pname}
                        // onChange={handlePasswordInput}
                        // onKeyDown={handlePasswordInput}
                        />
                        <TextField
                            // autoFocus
                            multiline
                            margin="dense"
                            id="password"
                            label="Problem Statement"
                            type="text"
                            fullWidth
                            variant="standard"
                        // value={problemStatement}
                        // onChange={handlePasswordInput}
                        // onKeyDown={handlePasswordInput}
                        />
                        <TextField
                            // autoFocus
                            multiline
                            margin="dense"
                            id="password"
                            label="Brief Description"
                            type="text"
                            fullWidth
                            variant="standard"
                        // value={desc}
                        // onChange={handlePasswordInput}
                        // onKeyDown={handlePasswordInput}
                        />
                        {/* {error ? (
                            <Alert severity="error">{errorMsg}</Alert>
                        ) : (
                            <Alert severity="success">{errorMsg}</Alert>
                        )} */}
                        <DialogActions>
                            <Button>Done</Button>
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
