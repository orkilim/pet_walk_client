import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100px'
  },
}));

export default function SelectTextField() {
  const classes = useStyles();

  return (   
    <TextField 
    classes={{root:classes.root}}
    select
    name="name" 
    id="id" 
    variant="outlined" 
    label="test"
    SelectProps={{
      multiple: true,
      value: []
    }}
    >
      <MenuItem>1</MenuItem>
      <MenuItem>2</MenuItem>
    </TextField>
    );
}
