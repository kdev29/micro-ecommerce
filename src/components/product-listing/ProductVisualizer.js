import React, {useState, useEffect} from 'react'
import { Grid, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import ProductSorters from './ProductSorters';
import { getElements } from './products-helpers';
import VisibleProducts from './VisibleProducts';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 230,
    margin: '10px 20px',
    padding: '10px 0',
    display: 'inline-block',
    cursor: 'pointer'
  },
  container: {
    textAlign: 'center',
    
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  finalPrice: {
    color: 'green'
  },
  paginator: {
    padding: theme.spacing(2)
  }
}));




export default function ProductVisualizer({filters, actions, onAddToCart, universoProductos}) {

    const classes = useStyles();

    let universoFiltradoRaw = getElements(universoProductos, filters);

    const [universoFiltrado, setUniversoFiltrado] = useState([...universoFiltradoRaw]);    
    const [universiVisible, setUniversoVisible] = useState([...universoFiltrado].slice(0, 10));
    const [currentIndex, setCurrentIndex] = useState(1);
    

    if(universoFiltradoRaw.length != universoFiltrado.length) {
        setUniversoFiltrado(universoFiltradoRaw);
        setUniversoVisible([...universoFiltradoRaw].slice(0, 10));
    }
    

    const handleChange = (e, index) => {
      const newElements = universoFiltrado.slice(((index -1) * 10), index * 10);
      setUniversoVisible(newElements);
      setCurrentIndex(index);
    }

    const handleSortByChange = (option) => {
      let orderedItems = [];
      
      if(option == 2) {


        orderedItems = universoFiltrado.sort((x, y) => {
          if (x.finalPrice > y.finalPrice) {
            return -1;
          }
          if (x.finalPrice < y.finalPrice) {
            return 1;
          }
          return 0;
        })
      } else 
      {
        //menor a mayor
        orderedItems = universoFiltrado.sort((x, y) => {
          if (x.finalPrice < y.finalPrice) {
            return -1;
          }
          if (x.finalPrice > y.finalPrice) {
            return 1;
          }
          return 0;
        })
      }

     setUniversoVisible(universoFiltrado.slice(0, 10));
     setCurrentIndex(1);
  }

  const handleAddToCart = (item) => {
    actions.addToCart(item); //redux store notification
    onAddToCart(); //snackbar notification
  }

    const paginationLimit = parseInt(universoFiltrado.length / 10) + 1;

    return (       
        <Grid className={classes.container} item xs={12}>
           <Grid item xs={12}>            
            <ProductSorters onSortChange={handleSortByChange}></ProductSorters>
          </Grid>
          <VisibleProducts onAddToCart={handleAddToCart} products={universiVisible}></VisibleProducts>
          <Grid container justify="center">            
            <Pagination className={classes.paginator} page={currentIndex} onChange={handleChange} count={paginationLimit} color="primary" />
          </Grid>          
        </Grid>
    )
}

ProductVisualizer.propTypes = {
  actions: PropTypes.object.isRequired,
  filters: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  universoProductos: PropTypes.array.isRequired
}

