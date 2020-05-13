import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Paper, Typography, Grid } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '95%',
    },
  },
  button: {
      
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '10px 0'
  },
}));

export default function PriceRangeFilter({onFilterChange}) {
  const classes = useStyles();

  const [range, setRange] = useState({ min: 0, max: 0 });

  const handleSubmit = (e) => {
      e.preventDefault();

      let filter = { value: range, type: 'BY_RANGE', action: 'add', printValue: () => { return "$" + range.min + " - $" + range.max } };

      onFilterChange(filter);
  }

  const handleChange = (e) => {
      const {value, name } = e.target;

      setRange((previous) => {
          
          const newRange = { 
              ...previous,
              [name]: value
          };
          
          return newRange;

      })
  }

  return (
    <Grid item xs={12}>
    <Paper elevation={3} className={classes.paper}>
      <Typography variant="h6">Price</Typography>
      <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">        
        <TextField onChange={handleChange} name='min' value={range.min} size="small" id="outlined-basic" label="$ Minimum" variant="outlined" />
        <TextField onChange={handleChange} name='max' value={range.max}  size="small" id="outlined-basic" label="$ Maximum" variant="outlined" /> 
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon />}
            type='submit'
            disabled={range.max <= 0 || range.min > range.max}
          >
            APPLY
          </Button>
        </div>        
      </form>
    </Paper>
</Grid>
  );
}

PriceRangeFilter.propTypes = {
    onFilterChange: PropTypes.func.isRequired
};