import React, {useState} from 'react'
import PropTypes from 'prop-types';
import { Select, MenuItem, InputLabel, FormControl, makeStyles } from '@material-ui/core';

const filterOptions = [    
    { id: 2, type: 'Highest Price'},
    { id: 3, type: 'Lowest Price'},
]
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  

export default function ProductsSorter({onSortChange}) {

    const [sortOption, setSortOption] = useState(0);

    const handleChange = (e) => {
        
            const { value } = e.target;
            setSortOption(value);
            onSortChange(value);
    }

    const classes = useStyles()
    return (

        <div>
            <FormControl className={classes.formControl}>

                <InputLabel id="idLabel">Order by</InputLabel>
            <Select labelId="idLabel" onChange={handleChange} value={sortOption} label="Order by">
               {
                   filterOptions.map(o => (<MenuItem key={o.id} value={o.id}>{o.type}</MenuItem>))
               }
            </Select>
            </FormControl>
        </div>
    )
}

ProductsSorter.propTypes = {
    onFilterChange: PropTypes.func.isRequired
};