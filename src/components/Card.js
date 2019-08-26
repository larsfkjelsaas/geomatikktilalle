import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from "@material-ui/core/";

//Use makeStyles instead of styled components for easier compability with material-ui
const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  content: {
    paddingTop: 4,
    paddingBottom: 0
  },
  actions: {
    paddingTop: 0
  }
});

const MenuCard = ({ title, name, origin, text }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography variant="h6" component="h2">
          {name}
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {title + " (" + origin + ")"}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size="small">Details</Button>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
};

export default MenuCard;
