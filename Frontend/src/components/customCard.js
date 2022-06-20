import {
  Box,
  Card,
  CardContent,
  Divider,
  // Button,
  Chip,
  Typography,
  Button
} from "@mui/material";
import tile from "../data/placeHolder.jpg";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
// import { Users as UsersIcon } from "../icons/users";
import { useHref, useNavigate, Redirect } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { LocalPhoneOutlined } from "@material-ui/icons";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import CompanyDetails from "./companyDetails";

export const CustomCard = ({ product, ...rest }) => {
  let navigate = useNavigate();

  const handleChange = () => {
    console.log(product) 
    /* sessionStorage.setItem("type", "ngo"); */
    sessionStorage.setItem("companyId", product._id);
    navigate("/team")
  };

  const truncate = (desc) => {
    const num = 100;
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
      {/* 
      <img
        src={tile}
        alt="BigCo Inc. logo"
        style={{ borderRadius: "8%", marginTop: "1px" }}
      /> */}
      <CardHeader
        title={truncateName(product.name)}
        sx={{ fontSize: "24px", fontWeight: "bold" }}
      />
      <Box sx={{ flexGrow: 0 }}>
        <CardContent style={{ width: "100%", height: "100%" }}>
          <Typography
            style={{ fontSize: "22px", height: 100 }}
            color="text.secondary"
            sx={{ width: "100%" }}
            //noWrap
          >
            {truncate(product.company_description)}
            {/* {product.company_description} */}
          </Typography>
        </CardContent>
      </Box>
      <Divider />
      <CardActions disableSpacing>
        <CompanyDetails company={product} />

        {/* <Chip
          onClick={() => navigate("#")}
          icon={<LanguageIcon />}
          style={{
            width: "40px",
            height: "30px",
            paddingLeft: "15px",
            margin: "5px",
          }}
        />
        <Chip
          // onClick={() => Linking.openURL('mailto:support@example.com')}
          icon={<MailOutlineIcon />}
          style={{
            width: "40px",
            height: "30px",
            paddingLeft: "15px",
            margin: "5px",
          }}
        >
          <Button href={`mailto:${product.email}`}> </Button>
        </Chip>
        <Chip
          onClick={() => navigate("#")}
          icon={<LocalPhoneOutlined />}
          style={{
            width: "40px",
            height: "30px",
            paddingLeft: "15px",
            margin: "5px",
          }}
        /> */}

        <Typography
          color="textSecondary"
          display="inline"
          sx={{ marginLeft: "auto", marginRight: "3px" }}
          variant="body2"
        >
          {/* <Chip
            clickable
            onClick={handleChange}
            icon={<PeopleOutlineIcon />}
            value={product.size}
            label={product.size}
          /> */}
          {/* {"Size : " + product.size} */}
        </Typography>
      </CardActions>
    </Card>
  );
};