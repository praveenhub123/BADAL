import React from "react";
import { Card, Chip, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Avatar from "@mui/material/Avatar";
//import LanguageIcon from "@mui/icons-material/Language";
//import GitHubIcon from "@mui/icons-material/GitHub";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SKILLS, GET_USER_DATA } from "../../graphQL/query"
import { GLOBAL_SKILL_ADD, GLOBAL_SKILL_REMOVE } from "../../graphQL/mutations"
import { Cancel, Tag } from "@mui/icons-material";
import { FormControl, Stack, TextField } from "@mui/material";
import { useRef, useState } from "react";

const Tags = ({ data, handleDelete }) => {
  return (
    <Box
      sx={{
        background: "#283240",
        height: "100%",
        display: "flex",
        padding: "0.4rem",
        margin: "0 0.5rem 0 0",
        justifyContent: "center",
        alignContent: "center",
        color: "#ffffff",
      }}
    >
      <Stack direction="row" gap={1}>
        <Typography>{data}</Typography>
        <Cancel
          sx={{ cursor: "pointer" }}
          onClick={() => {
            handleDelete(data);
          }}
        />
      </Stack>
    </Box>
  );
};

export default function BoxSx() {
  const [tags, SetTags] = useState([]);
  const tagRef = useRef();

  const handleDelete = (value) => {
    console.log(value);
    removeSkill({
      variables: {
        skills: [value],
      },
    });
    const newtags = tags.filter((val) => val !== value);
    SetTags(newtags);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(tagRef.current.value);
    addSkill({
      variables: {
        skills: [tagRef.current.value],
      },
    });
    SetTags([...tags, tagRef.current.value]);
    tagRef.current.value = "";
    console.log(tags);
  };

  const { data } = useQuery(GET_SKILLS);
  const { data: userData } = useQuery(GET_USER_DATA);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [orgName, setOrgName] = useState("");

  const [addSkill] = useMutation(GLOBAL_SKILL_ADD, {
    onCompleted: () => {
      alert("New Skill Added");
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const [removeSkill] = useMutation(GLOBAL_SKILL_REMOVE, {
    onCompleted: () => {
      alert("New Skill Removed");
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  React.useEffect(() => {
    if (data) {
      var s = [];
      data.GetSkills.forEach((x) => {
        s.push(x.skill);
      });
      SetTags(s);
    }
  }, [data]);

  React.useEffect(() => {
    if (userData) {
      setType(userData.GetUserData.type);
      setName(userData.GetUserData.name);
      setEmail(userData.GetUserData.email);
      setAddress(userData.GetUserData.address);

      if (userData.GetUserData.coreId?.name) {
        setOrgName(userData.GetUserData.coreId.name);
      } else if (userData.GetUserData.ngoId?.name) {
        setOrgName(userData.GetUserData.ngoId.name);
      } else if (userData.GetUserData.orgId?.name) {
        setOrgName(userData.GetUserData.orgId.name);
      }
    }
  }, [userData]);

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "#f4f8fd",
        }}
      >
        <ul marginLeft="-40">
          <li
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                marginTop: "40px",
              }}
            >
              {name.charAt(0).toUpperCase()}
            </Avatar>
          </li>
          <li
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              marginTop: "10px",
            }}
          >
            <Chip label={type} />
          </li>
          <li>
            <Typography
              variant="h4"
              sx={{
                display: "flex",
                marginTop: "20px",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              {name.split(" ")[0]}
            </Typography>
          </li>
          <li>
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                marginTop: "10px",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              Full Stack Developer
            </Typography>
          </li>
          <li>
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                marginTop: "10px",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              {orgName}
            </Typography>
          </li>
          <li>
            <List sx={{ width: "600px" }}>
              <ListItem divider>
                <ListItemText>Full Name</ListItemText>
                <ListItemText
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  {name}
                </ListItemText>
              </ListItem>
              <ListItem divider>
                <ListItemText>Email</ListItemText>
                <ListItemText
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  {email}
                </ListItemText>
              </ListItem>
              <ListItem divider>
                <ListItemText>Phone</ListItemText>
                <ListItemText
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  (320) 380-4539
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Address</ListItemText>
                <ListItemText
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  {address}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Team</ListItemText>
                <ListItemText
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  {address}
                </ListItemText>
              </ListItem>
            </List>
          </li>
          <li
            style={{
              marginTop: "10px",
              marginBottom: "40px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                display: "flex",
                marginTop: "10px",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              Admin Panel
            </Typography>
            <Box sx={{ flexGrow: 1, width: "600px", paddingLeft: "20px" }}>
              <form onSubmit={handleOnSubmit}>
                <TextField
                  inputRef={tagRef}
                  fullWidth
                  variant="standard"
                  size="small"
                  sx={{ margin: "1rem 0" }}
                  margin="none"
                  placeholder={tags?.length < 5 ? "Enter tags" : ""}
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
                        {tags?.map((data, index) => {
                          return (
                            <Tags
                              data={data}
                              handleDelete={handleDelete}
                              key={index}
                            />
                          );
                        })}
                      </Box>
                    ),
                  }}
                />
              </form>
            </Box>
          </li>
        </ul>
      </Card>
    </Box>
  );
}

{
  /* <Grid container spacing={0.5}>
      <Grid item xs={4}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignContent: "center",
              backgroundColor: "#f4f8fd",
            }}
          >
            <ul>
              <li
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    marginTop: "150px",
                  }}
                >
                  {name.charAt(0).toUpperCase()}
                </Avatar>
              </li>
              <li
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  marginTop: "10px",
                }}
              >
                <Chip label={type} />
              </li>
              <li>
                <Typography
                  variant="h4"
                  sx={{
                    display: "flex",
                    marginTop: "20px",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  {name.split(" ")[0]}
                </Typography>
              </li>
              <li>
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    marginTop: "10px",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  Full Stack Developer
                </Typography>
              </li>
              <li
                style={{
                  marginBottom: "180px",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    marginTop: "10px",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  {orgName}
                </Typography>
              </li>
            </ul>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <ul>
          <li>
            <Box
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card
                sx={{
                  display: "inline",
                  width: "100%",
                  justifyContent: "center",
                  alignContent: "center",
                  marginTop: "50px",
                  backgroundColor: "#f4f8fd",
                }}
              >
                <List sx={{ width: "100%" }}>
                  <ListItem divider>
                    <ListItemText sx={{ width: "190px" }}>
                      Full Name
                    </ListItemText>
                    <ListItemText>{name}</ListItemText>
                  </ListItem>
                  <ListItem divider>
                    <ListItemText sx={{ width: "190px" }}>Email</ListItemText>
                    <ListItemText>{email}</ListItemText>
                  </ListItem>
                  <ListItem divider>
                    <ListItemText sx={{ width: "190px" }}>Phone</ListItemText>
                    <ListItemText>(320) 380-4539</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText sx={{ width: "190px" }}>Address</ListItemText>
                    <ListItemText>{address}</ListItemText>
                  </ListItem>
                </List>
              </Card>
            </Box>
          </li>
          <li>
            <Box
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card
                sx={{
                  display: "inline",
                  width: "100%",
                  justifyContent: "center",
                  alignContent: "center",
                  marginTop: "50px",
                  backgroundColor: "#f4f8fd",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ paddingTop: "5px", paddingLeft: "10px" }}
                >
                  Admin Panel
                </Typography>
                <Box sx={{ flexGrow: 1, width: "500px", paddingLeft: "20px" }}>
                  <form onSubmit={handleOnSubmit}>
                    <TextField
                      inputRef={tagRef}
                      fullWidth
                      variant="standard"
                      size="small"
                      sx={{ margin: "1rem 0" }}
                      margin="none"
                      placeholder={tags?.length < 5 ? "Enter tags" : ""}
                      InputProps={{
                        startAdornment: (
                          <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
                            {tags?.map((data, index) => {
                              return (
                                <Tags
                                  data={data}
                                  handleDelete={handleDelete}
                                  key={index}
                                />
                              );
                            })}
                          </Box>
                        ),
                      }}
                    />
                  </form>
                </Box>
              </Card>
            </Box>
          </li>
        </ul>
      </Grid>
    </Grid> */
}

{
  /* <li
                style={{
                  display: "flex",
                  marginTop: "20px",
                }}
              >
                <List sx={{ width: "100%" }}>
                  <ListItem>
                    <ListItemText sx={{ width: "20px" }}>
                      <LanguageIcon />
                    </ListItemText>
                    <ListItemText sx={{ paddingLeft: "20px" }}>
                      www.google.com
                    </ListItemText>
                  </ListItem>
                </List> 
              </li> */
}