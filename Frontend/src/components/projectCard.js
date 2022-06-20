import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import CardActions from "@mui/material/CardActions";
import tile from "../data/projectPH.png";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import CardActionArea from "@mui/material/CardActionArea";
// import IconButton from "@mui/material/IconButton";
// import { Download as DownloadIcon } from "../icons/download";
// import EditIcon from "@mui/icons-material/Edit";
// import Module from "./pages/module";
// import { useNavigate } from "react-router-dom";
// import LanguageIcon from '@mui/icons-material/Language';
// import MailOutlineIcon from '@mui/icons-material/MailOutline';
// import { LocalPhoneOutlined } from "@material-ui/icons";
// import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

const truncate = (desc) => {
  const num = 32;
  if (desc.length <= num) {
    return desc;
  }
  return desc.slice(0, num) + "...";
};
const truncateTitle = (desc) => {
  const num = 30;
  if (desc.length <= num) {
    return desc;
  }
  return desc.slice(0, num) + "...";
};

export const ProjectCard = ({ product, ...rest }) => {
  let navigate = useNavigate();

  const handleChange = () => {
    console.log(product);
    /* sessionStorage.setItem("type", "ngo"); */
    sessionStorage.setItem("projectId", product.id);
    navigate(`/module/${product.project_Id}`, {
      state: {
        id: product.project_Id,
        name: product.name,
        desc: product.problem_statement,
        ngo: product.ngo,
        progress: product.progress,
      },
    });
  };

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
      <CardActionArea onClick={handleChange}>
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
        {/*  <img src={tile} alt="BigCo Inc. logo" style={{ borderRadius: '8%', marginTop: "1px" }} /> */}
        <CardHeader
          title={truncateTitle(product.name)}
          subheader={product.ngo}
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            height: 100,
            width: "100%",
          }}
        />
        <Box sx={{ flexGrow: 0 }}>
          <CardContent>
            <Typography
              style={{ fontSize: "22px", height: 100 }}
              color="text.secondary"
              sx={{ height: 75, width: "100%" }}
            >
              {truncate(product.problem_statement)}
            </Typography>
          </CardContent>
        </Box>
        <Stack
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
        </Stack>
        <Divider />
        <CardActions disableSpacing style={{ marginBottom: 0 }}>
          {/* <Chip
            label={`Progress: ${product.progress} %`}
            variant="outlined"
            size="small"
            sx={{ margin: 1 }}
            color="secondary"
          /> */}
          <Typography
            color="textSecondary"
            // display="inline"
            sx={{ marginRight: "auto", marginLeft: "3px" }}
            variant="body2"
          >
            {`Progress: ${product.progress} %`}
          </Typography>
          <Typography
            color="textSecondary"
            // display="inline"
            sx={{ marginLeft: "auto", marginRight: "3px" }}
            variant="body2"
          >
            {/* <Chip
              label={`No Of Modules: ${product.noOfModules}`}
              //{product.no_ofModules}
              variant="outlined"
              size="small"
              sx={{ margin: 1 }}
              color="default"
            /> */}
            {`No Of Modules: ${product.noOfModules}`}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
