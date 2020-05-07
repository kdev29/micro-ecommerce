import React from 'react'
import { Paper, makeStyles, Button, Grid, Typography } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import PropTypes from 'prop-types'


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
    },
    chip: {
        margin: '2px'
    }
  }));



export default function AppliedFilters({filters, onRemoveFilter, onClearFilters}) {

    const classes = useStyles();

    function handleDelete(filter) {
        onRemoveFilter({
            ...filter,
            action: 'remove'
        });
    }

    return (
        filters.length > 0 && (
        <Grid item xs={12}>
             <Paper elevation={3} className={classes.paper}>
             <Typography variant="h5">Applied filters</Typography>
                 {
                     filters.length > 0 && (<Button onClick={onClearFilters} style ={{display: 'inlineBlock'}} color="secondary" size="small">Clear filters</Button>)
                 }
                 <div>
                 {
                     filters && filters.map(f => (                        
                         <Chip title="aa" 
                            className={classes.chip} 
                            label={`${f.type}: ${f.printValue ?  f.printValue(): f.value}`} 
                            onDelete={() => handleDelete(f)} 
                            color="primary" 
                            variant="outlined" />        
                     ))
                }  
                </div>
            </Paper>
        </Grid>)
    )
}

AppliedFilters.propTypes = {
    filters: PropTypes.array,
    onRemoveFilter: PropTypes.func.isRequired,
    onClearFilters: PropTypes.func.isRequired
}
