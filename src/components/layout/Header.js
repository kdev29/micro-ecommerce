import React, { useState} from 'react'
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
import { IconButton, Tooltip, Drawer, List, ListItem, ListItemIcon, ListItemText, Hidden, Divider } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import MenuIcon from '@material-ui/icons/Menu';

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

  const menuElements = [
    { id: 0, label: 'My orders', icon: InboxIcon },
    { id: 1, label: 'Login', icon: AccountCircleIcon },
  ]; 


 function Header({cart}) {

    const classes = useStyles();

    const [showMenu, setShowMenu] = useState(false);


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
            <Hidden mdDown>
              <Tooltip title="My orders"> 
                <IconButton style={{padding: '0', margin: '0 2px'}} aria-label="delete">
                  <InboxIcon style={{color: 'white'}} fontSize="large"  /> 
                </IconButton>
              </Tooltip>
              <Tooltip title="Login"> 
                <IconButton style={{padding: '0', margin: '0 2px'}} aria-label="delete">
                <AccountCircleIcon style={{color: 'white'}} fontSize="large"  /> 
                </IconButton>
              </Tooltip>
            </Hidden>           
              <Link to="/cart">
                <Tooltip title="Shopping cart">
                <Badge badgeContent={cart.length} color="primary">
                  <ShoppingCartIcon style={{color: 'white', fontSize: '30px', cursor: 'pointer'}}></ShoppingCartIcon>
                </Badge>
                </Tooltip>
              </Link>
              <Hidden lgUp> 

              <IconButton onClick={() =>{ setShowMenu(prev => !prev) }} style={{padding: '0', margin: '0 2px'}} aria-label="delete">
                  <MenuIcon style={{color: 'white'}} fontSize="large"  /> 
                </IconButton>
              </Hidden>
          </div>
        </Grid>
        <Drawer anchor={"right"} open={showMenu} onClose={() => setShowMenu(prev => false)}>
          <List>
          {menuElements.map((menuItem) => (
            <>
              <ListItem button key={menuItem.id}>
                <ListItemIcon> <menuItem.icon style={{color: '#0c5375'}} fontSize="large"  /> </ListItemIcon>
                <ListItemText primary={menuItem.label} />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
        </Drawer>

        </Grid>
    )
}

const mapStateToProps = (state) => {
  return {
    cart: state.shoppingCart
  }
};
  
 export default connect(mapStateToProps)(Header);
