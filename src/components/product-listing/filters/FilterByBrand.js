import React from 'react'
import { Paper, makeStyles, Grid, Typography } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({ 
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      margin: '10px 0'
    },
    subfilterSelected: {
        fontWeight: 'bold', 
        textDecoration: 'underline',
        cursor: 'pointer',
        display: 'block'
    },
    subFilterDefault: {
        cursor: 'pointer', 
        display: 'block'
    }
  }));

export default function FilterByBrand({onFilterChange, filters}) {

    const handleSelection = (filterOption) => {

        let isAddFilter = !containsFilter(filterOption);
        let filter = { value: filterOption, type: 'BY_BRAND', action: isAddFilter ? 'add' : 'remove', filterType: 'inclusive' };

        onFilterChange(filter);
    }

    const containsFilter = (value) => {

        let exists = filters.filter(filter => {
            return filter.value == value;
        })

        return exists.length > 0;
    }

    const classes = useStyles();

    return (
        <Grid item xs={12}>

        <Paper elevation={3} className={classes.paper}>
        <Typography variant="h6">Brand</Typography>
              <div onClick={() => handleSelection('Xbox')}><span className={containsFilter('Xbox') ? classes.subfilterSelected : classes.subFilterDefault}>Xbox</span></div>
              <div onClick={() => handleSelection('Nintendo')}><span className={containsFilter('Nintendo') ? classes.subfilterSelected : classes.subFilterDefault}>Nintendo</span></div>
              <div onClick={() => handleSelection('Sony')}><span className={containsFilter('Sony') ? classes.subfilterSelected : classes.subFilterDefault}>Sony</span></div>              
          </Paper>
        </Grid>
    )
}
