import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AdjustIcon from "@material-ui/icons/Adjust";
import {
  TextField,
  Dialog,
  DialogTitle,
  ListItemText,
  ListItem,
  ListItemIcon,
  Button
} from "@material-ui/core";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClick = value => {
    onClose(value);
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  let [inputValue, setInputValue] = React.useState(50);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Set size of buffer</DialogTitle>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="meters"
          variant="outlined"
          type="number"
          onChange={event => setInputValue(event.target.value)}
        />
      </form>
      <Button onClick={() => (handleClick(inputValue))}>Done</Button>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const BufferDialog = ({ analysisTriggered }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
    analysisTriggered({ type: "buffer", value: value });
  };

  return (
    <div>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <AdjustIcon />
        </ListItemIcon>
        <ListItemText
          primary="Buffer"
          secondary="Create polygon of all within X meters"
        />
      </ListItem>
      <SimpleDialog
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};


export default BufferDialog;
