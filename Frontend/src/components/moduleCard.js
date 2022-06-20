// import PropTypes from 'prop-types';
import { Card, CardContent, Box, Typography, Divider } from "@mui/material";
import { Download as DownloadIcon } from "../icons/download";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import tile from "../data/placeHolder.jpg";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import { CardActionArea } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Button } from "bootstrap";
import { useMutation } from "@apollo/client";
import { ASSIGN_MODULE_TO_TEAM } from "../graphQL/mutations"

export const ModuleCard = ({ product, ...rest }) => {
  let navigate = useNavigate();

  const truncate = (desc) => {
    const num = 32;
    if (desc.length <= num) {
      return desc;
    }
    return desc.slice(0, num) + "...";
  };

  const truncateTitle = (name) => {
    const num = 18;
    if (name.length <= num) {
      return name;
    }
    return name.slice(0, num) + "...";
  };

  const q = sessionStorage.getItem("type");
  let q1 = "ngo";

  const [assignTeam] = useMutation(ASSIGN_MODULE_TO_TEAM, {
    onCompleted: () => {
      alert("Team has been assigned")
    },
    onError: (err) => {
      alert(err.message)
    }
  })

  const handleSelect = (e) => {
    if (window.confirm("Are you sure you want to assign this module to your team?")) {
      assignTeam({
        variables: {
          teamId: sessionStorage.getItem("teamId"),
          moduleId: product._id
        }
      })
    } 
  }

  const handleClick = () => {
    if (q !== q1) {
      console.log(product.module_Id)
      sessionStorage.setItem("moduleId", product._id)
      navigate(`/tasks`, {
        state: {
          id: product._id,
          name: product.name,
          desc: product.description,
          status: product.status,
          tag: product.tags,
          assigned_to: product.assigned_to,
          created_at: product.created_at,
          updated_at: product.updated_at,
        },
      })
    }
  }

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f2fffe",
        // height: "100%",
        // borderRadius: "5%",
        marginBottom: 5,
      }}
      {...rest}
    >
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="fit-content"
          image={tile}
          sx={{
            borderBottomLeftRadius: "8%",
            borderBottomRightRadius: "8%",
            backgroundSize: "cover",
          }}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ marginLeft: 1, marginRight: 1, marginTop: 2 }}
        >
          <Typography variant="body2" color="text.secondary">
            {product.assigned_to ? (
              <Chip
                icon={<PeopleAltIcon />}
                label={`Assigned To: ${product.assigned_to.name}`}
                variant="outlined"
              />
            ) : (
              <Chip
                // icon={<PeopleAltIcon />}
                label="Not Alloted"
                variant="outlined"
              />
            )}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.status_bol ? (
              <Chip
                icon={<DonutSmallIcon />}
                label={product.status}
                variant="outlined"
              />
            ) : null}
          </Typography>
        </Stack>
        <CardHeader
          title={truncateTitle(product.name)}
          // title={product.name}
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            height: 50,
            width: "100%",
          }}
          subheader={product.project_name}
        />
        <Box sx={{ flexGrow: 0 }}>
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "22px", height: 75, width: "100%" }}
            >
              {truncate(product.description)}
            </Typography>
          </CardContent>
        </Box>
        {/* <Stack
          direction="row"
          spacing={1}
          sx={{ marginLeft: 1, marginBottom: 3 }}
        >
          {product.tags.map((pr) => (
            <Chip
              label={pr}
              variant="outlined"
              size="small"
              style={{ width: "20%" }}
            />
          ))}
        </Stack> */}
      </CardActionArea>
      <Divider />
      <CardActions disableSpacing style={{ marginBottom: 0 }}>
        {product.assigned_to ? null : (
          <Chip
            // icon={<DonutSmallIcon />}
            label="Select"
            onClick={(e) => handleSelect(e)}
            variant="outlined"
            color="primary"
            style={{ borderRadius: 5 }}
          />
        )}
        <Typography
          color="textSecondary"
          // display="inline"
          sx={{ marginLeft: "auto" }}
          variant="body2"
        >
          {/* <Chip
            label={`Ongoing: ${product.noOfOngoingTasks}`}
            //{product.no_ofModules}
            variant="outlined"
            size="small"
            sx={{ margin: 1 }}
            color="default"
          /> */}
          {`Ongoing: ${product.noOfOngoingTasks}`}
          &nbsp; &nbsp;
          {/* <Chip
            label={`Done: ${product.noOfCompletedTasks}`}
            //{product.no_ofModules}
            variant="outlined"
            size="small"
            sx={{ margin: 1 }}
            color="default"
          /> */}
          {`Done: ${product.noOfCompletedTasks}`}
        </Typography>
        {/* <IconButton aria-label="download">
          <DownloadIcon color="action" />
        </IconButton>
        <IconButton aria-label="download">
          <EditIcon color="action" />
        </IconButton> */}
      </CardActions>
    </Card>
  );
};
