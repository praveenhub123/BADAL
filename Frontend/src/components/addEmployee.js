import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphQL/mutations"
import { GET_SKILLS } from "../graphQL/query"

export default function AddEmployee(props) {
  const username = "Add New Employee"; //add from props
  const userId = props.id;
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [status, setStatus] = React.useState(props.status);
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("Enter Password");
  const [defaultStatus, setdefaultStatus] = React.useState(props.status);
  const userrole = sessionStorage.getItem('userRole')

  const { data } = useQuery(GET_SKILLS)
  var [tagOptions, setTagOptions] = React.useState([])
  var [Tags, setTags] = React.useState([])

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

  const [name, setName] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")

  const handleName = (e) => {
    setName(e.target.value)
    console.log(name)
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

  const handleTags = (v) => {
    var s = []
    v.forEach((x) => {
      s.push(x.id)
    })
    setTags(s);
  }

  const handleDelete = (value) => {    
    const newtags = Tags.filter((val) => val !== value);
    setTags(newtags);
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

  const [addUser] = useMutation(CREATE_USER, {
    onCompleted: () => {
      handleClose()
    },
    onError: (err) => {
      alert(err.message)
    }
  })

  const checkPassword = () => {
    addUser({  
      variables: {
        name: name,
        email: email,
        phoneNumber: phone,
        skill: Tags,
        address: address,
        isAdmin: "NO",
      }
    })
    setPassword("");
    setError(false);
  };

  if(userrole==='COMP') {

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
          <DialogContentText>
            
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
              label="Employee Name"
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
              label="Address"
              type="text"
              fullWidth
              variant="standard"
              // value={problemStatement}
              onChange={handleAddress}
              // onKeyDown={handlePasswordInput}
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
            <DialogActions>
              <Button onClick={checkPassword}>Add</Button>
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
