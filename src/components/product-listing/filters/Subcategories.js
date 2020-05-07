import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import { Paper, Grid, Typography } from '@material-ui/core';
import {genres} from '../products-helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '10px 0'
  },
}));



export default function Genres({onFilterChange, filters}) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    
    let filter = { value, type: 'GENRE', action: 'add', filterType: 'inclusive' };

    if(containsFilter(value))
      filter.action = 'remove';
    
    onFilterChange(filter);
  };

  function containsFilter(value){
    return filters.findIndex(f => f.value == value) !== -1;
  }
  

  return (

<Grid item xs={12}>

      <Paper className={classes.paper} elevation={3}>
            
            <Typography variant="h6">Genre</Typography>
            <List className={classes.root}>
            {genres.map((g) => {
                const labelId = `checkbox-list-label-${g}`;

                return (
                <ListItem key={labelId} role={undefined} dense button onClick={handleToggle(g)}>
                    <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={containsFilter(g)}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={g} />
                </ListItem>
                );
            })}
            </List>
      </Paper>
</Grid>
  );
}
