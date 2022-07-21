import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Button,
  Chip,
  Typography,
} from "@mui/material";
//import tile from "../data/Tile.jpg";
import tile from "../data/placeHolder.jpg";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import { Users as UsersIcon } from "../icons/users";
import NgoDetails from "./ngoDetails";
import { useNavigate } from "react-router-dom";

/* let [selectedOption, setselectedOption] = useState("");

const handleChange = (sOption) => {
  setselectedOption(sOption);
  sessionStorage.setItem("type", "ngo");
  sessionStorage.setItem("entity", sOption.value);
};
 */
export function NgoCard({ product, ...rest }) {
  let navigate = useNavigate();
  const login = sessionStorage.getItem('LoginStatus');

  const truncate = (desc) => {
    const num = 32;
    if (desc.length <= num) {
      return desc;
    }
    return desc.slice(0, num) + "...";
  };
  const truncateName = (name) => {
    const num = 16;
    if (name.length <= num) {
      return name;
    }
    return name.slice(0, num) + "...";
  };

  const handleChange = () => {
    console.log(product);
    /* sessionStorage.setItem("type", "ngo"); */
    sessionStorage.setItem("entity", product.name);
    sessionStorage.setItem("ngoId", product.id);
    if ( login === 'true') {
      navigate(`/projects`);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f2fffe", 
        height: "100%",
        // borderRadius: "5%",
      }}
      {...rest}
    >
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
      <CardHeader
        title={truncateName(product.name)}
        sx={{ fontSize: "24px", fontWeight: "bold" }}
      />
      <Box sx={{ flexGrow: 0 }}>
        <CardContent>
          <Typography
            style={{ fontSize: "22px", height: 100 }}
            color="text.secondary"
          >
            {truncate(product.company_description)}
            <NgoDetails id={product.id} ngo={product} />
          </Typography>
        </CardContent>
      </Box>
      <Divider />
      <CardActions disableSpacing>
        <Button
          //href="/projects"
          variant="outlined"
          size="small"
          onClick={handleChange}
          sx={{ marginRight: 1 }}
        >
          {product.projects} Projects
        </Button>

        <Typography
          color="textSecondary"
          display="inline"
          sx={{ marginLeft: "auto" }}
          variant="body2"
        >
          {`No of Projects: ${
            parseInt(product.NumberOfcompletedProjects) +
            parseInt(product.NumberOfOnGoingProjects)
          }`}
        </Typography>
      </CardActions>
    </Card>
  );
}
