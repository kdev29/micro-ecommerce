import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from './components/layout/Header';
import Departamentos from './components/layout/Departamentos'
import ProductsContainerPage from './components/ProductsContainerPage';
import ProductsPage from './components/product-listing/ProductsPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ShoppingCartPage from './components/shopping-cart/ShoppingCartPage';
import CheckOutPage from './components/checkout/CheckOutPage';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <Switch>
          <Route path='/cart' component={ShoppingCartPage} />
          <Route path='/checkout' component={CheckOutPage} />
          <Route path='/' component={ProductsPage} />
        </Switch>
      </Router>      
    </div>
  );
}