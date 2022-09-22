import React from "react";
import { Box } from "@mui/system";
import "../styles/Article/Article.css";
import { Card, List } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import flexContainer from "../styles/Article/List";
import { Avatar } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import Chip from "@mui/material/Chip";

import { Link } from "react-router-dom";

const Article = (props) => {
  return (
    <Card
      elevation={10}
      sx={{
        display: "flex",
        allignItems: "centre",
        marginTop: "20px",
        maxHeight: "250px",
      }}
    >
      <img
        src={require(`../uploads/${props.object.image}`)}
        alt="user_image"
        className="articleImg"
      />
      <Box mt={1}>
        <Chip label="Travel" />

        <Link to="/article-detail" state={props}>
          <Typography variant="h4" component="h3">
            {props.object.title}
          </Typography>
        </Link>

        <List style={flexContainer}>
          <ListItem className="user">
            <ListItemIcon>
              <Avatar
                src="	https://cdns-images.dzcdn.net/images/artist/77220ccb5a36d0e5df2c9e47f2c89de4/500x500.jpg"
                alt="spongebob"
              />
            </ListItemIcon>
            <ListItemText primary="Spongebob Squarepants" />
          </ListItem>
          <ListItem className="date">
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText primary="12 September 2022" />
          </ListItem>
          <ListItem className="timeToRead">
            <ListItemIcon>
              <QueryBuilderIcon />
            </ListItemIcon>
            <ListItemText primary={`${props.object.timetoRead} Min. To Read`} />
          </ListItem>
        </List>
        <Typography
          variant="h6"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
          }}
        >
          {props.object.body}
        </Typography>
      </Box>
    </Card>
  );
};

export default Article;
