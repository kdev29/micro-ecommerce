import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SearchBox from '../SearchBox';
import logo from '../../logo.png';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import {connect} from 'react-redux'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { IconButton, Tooltip } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';

const useStyles = makeStyles((theme) => ({
    grid: {
        backgroundColor: '#e10098'
    },
    paper: {
      padding: theme.spacing(2),
      minHeight: '40px',
      textAlign: 'center',    
      backgroundColor: '#0c5375'
    },
  }));



 function Header({cart}) {

    const classes = useStyles();

    return (
        <Grid container >
         
        <Grid item xs={3}>
          <div className={classes.paper}>
          <Link to="/"> 
            <img style={{maxHeight: '35px'}} src={logo} />
          </Link>
            </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.paper}><SearchBox></SearchBox></div>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.paper}>              
              <Tooltip title="Mis pedidos"> 
                <IconButton style={{padding: '0', margin: '0 5px'}} aria-label="delete">
                  <InboxIcon style={{color: 'white'}} fontSize="large"  /> 
                </IconButton>
              </Tooltip>
              <Tooltip title="Login"> 
                <IconButton style={{padding: '0', margin: '0 5px'}} aria-label="delete">
                <AccountCircleIcon style={{color: 'white'}} fontSize="large"  /> 
                </IconButton>
              </Tooltip>
              <Link to="/cart">
                <Tooltip title="Shopping cart">
                <Badge badgeContent={cart.length} color="primary">
                  <ShoppingCartIcon style={{color: 'white', fontSize: '35px', cursor: 'pointer'}}></ShoppingCartIcon>
                </Badge>
                </Tooltip>
              </Link>
          </div>
        </Grid>

        </Grid>
    )
}

const mapStateToProps = (state) => {
  return {
    cart: state.shoppingCart
  }
};
  
 export default connect(mapStateToProps)(Header);
