import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ShoppingCartItemsContainer from './ShoppingCartItemsContainer';
import {generateProducts} from '../product-listing/products-helpers';
import ShoppingCartSavedItems from './ShoppingCartSavedItems';
import Badge from '@material-ui/core/Badge';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeItemFromCart, addItemToCart, applyCoupon, clearShoppingCart } from '../../redux/actions/shoppingCartActions';
import PromotionsContainer from './PromotionsContainer';
import { Button } from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';
import { Link } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear';


const savedItems = generateProducts(5);


  

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

// export default 
function ShoppingCartComponent({cart, actions, coupons, ...props}) {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [couponValidation, setCouponValidation] = useState(null);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddedItem = (item) => {
            
        removeFromSaved(item);
        
        actions.addToCart(item);
  }

  const removeFromSaved = (item) => {
    const match = savedItems.find(i => {
        return i.name == item.name;
    });

    savedItems.splice(savedItems.indexOf(match), 1);
  }

  const handleApplyCoupon = (coupon) => {

    setCouponValidation( {
        
         message: "The coupon is valid",
         isValid: true
     });

     actions.applyCoupon({...coupon, type:'DISCOUNT', value: 0.85});
  }

  const handleClearCart = () => {
    let sure = window.confirm('This will erase all your items, are you sure?');
    if(sure)
    {
      actions.clearShoppingCart();
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
            <Tab label="Saved items" icon={<Badge badgeContent={cart.length} color="primary">
             <ShoppingBasket />
            </Badge>} {...a11yProps(1)} {...a11yProps(4)} />
            <Tab label="Saved items" icon={<Badge badgeContent={savedItems.length} color="primary">
            <FavoriteIcon />
            </Badge>} {...a11yProps(1)} {...a11yProps(1)} />


        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ShoppingCartItemsContainer onRemoveItem={actions.removeFromCart} items={cart}></ShoppingCartItemsContainer>
        {
        (cart && cart.length > 0) && (
          <>
          <PromotionsContainer appliedCoupons={coupons}  couponValidation={couponValidation} onApplyCoupon={handleApplyCoupon}></PromotionsContainer>
          <Link to="/checkout">
            <Button
              variant="contained"
              color="secondary"
              size="large"                  
              startIcon={<PaymentIcon />}
              type='button'                
              >
              CHECKOUT
              </Button>
          </Link>
          <Button
              variant="contained"
              color="secondary"
              onClick={handleClearCart}
              size="large"                  
              startIcon={<ClearIcon />}
              type='button'                
              >
             CLEAR
            </Button>
        </>)
      }
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShoppingCartSavedItems onAddItem={handleAddedItem} savedItems={savedItems}></ShoppingCartSavedItems>
      </TabPanel>
     
      
      
      
    </div>
  );
}

ShoppingCartComponent.propTypes = {
    cart: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    coupons: PropTypes.array
};

const mapStateToProps = (state) => {
    return {
        cart: state.shoppingCart,
        coupons: state.appliedCoupons
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            removeFromCart: bindActionCreators(removeItemFromCart,dispatch),
            addToCart: bindActionCreators(addItemToCart, dispatch),
            applyCoupon: bindActionCreators(applyCoupon, dispatch),
            clearShoppingCart: bindActionCreators(clearShoppingCart, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartComponent)
