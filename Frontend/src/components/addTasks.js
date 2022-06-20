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
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Paper from '@mui/material/Paper';
// import axios from 'axios';


export default function AddTasks(props) {
    const username = props.taskName;//add from props
    const userId = props.id;
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [tasks, setTasks] = React.useState(props.tasks);
    const [addTaskFields, setAddTaskFields] = React.useState(false);
    const [newTask, setNewTask] = React.useState("");


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const newTaskKeyCheck = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            addNewTask();
        }
    }

    const addTaskFieldsHandle = () => {
        console.log(addTaskFields);
        setAddTaskFields(!addTaskFields)
    }

    const newTaskHandle = (event) => {
        setNewTask(event.target.value)
    }

    const addNewTask = () => {
        if (newTask === "")
            return
        const data = { task_name: newTask };
        setTasks([...tasks, data]);
        setNewTask("");
    }

    return (
        <React.Fragment>
            <Chip
                variant="outlined"
                label={username}
                onClick={handleClickOpen}
                color="primary"
                icon={<ModeEditOutlineOutlinedIcon />}
            // style={{ display: "flex", margin: "auto", marginBottom: "5px" }}
            />
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{username}</DialogTitle>

                <DialogContent>
                    <Paper elevation={0}>
                        <DialogContentText>
                            {/* Current Status : {defaultStatus} */}
                            {tasks.map((task) => (
                                <Button
                                    // label={task.task_name}
                                    variant='outlined'
                                    color="primary"
                                    style={{ margin: "15px", }}
                                >
                                    {task.task_name}
                                </Button>
                            ))}
                        </DialogContentText>
                    </Paper>
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
                        {addTaskFields ? (
                            <>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="Tname"
                                    label="Add New Task"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    style={{ marginTop: "30px" }}
                                    value={newTask}
                                    onChange={newTaskHandle}
                                    onKeyDown={newTaskKeyCheck}
                                />
                                <DialogActions>

                                    <Button onClick={addNewTask} variant="outlined">
                                        Add
                                    </Button>
                                    <Button onClick={addTaskFieldsHandle} variant="outlined" color="error">
                                        Cancel
                                    </Button>
                                </DialogActions>
                            </>
                        ) : (
                            <DialogActions>
                                <Button onClick={addTaskFieldsHandle}>
                                    Add Task
                                </Button>
                            </DialogActions>
                        )}
                    </Box>
                </DialogContent>
                <Button onClick={handleClose} color="error" style={{ margin: "10px", display: "block" }}>
                    Done
                </Button>
            </Dialog>
        </React.Fragment >
    );
}
