import React, {useState, useEffect} from 'react';
import { Grid, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FiltersContainer from './product-listing/FiltersContainer';
import ProductVisualizer from './product-listing/ProductVisualizer';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addItemToCart, getProducts } from '../redux/actions/shoppingCartActions';

import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';

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
  
// export default 
function ProductsContainerPage({actions, products}) {

    const [appliedFilters, setAppliedFilters] = useState([]);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
      if(products.length == 0)
        actions.loadProducts();
    }, []);
 
    const classes = useStyles();

    const handleFilterChange = (filterOption) => {

        
        if(filterOption.action == 'remove') {
            const newFilters = [...appliedFilters];

            var matchIndex = newFilters.findIndex((element, index) => {
                return element.value == filterOption.value ;    
            });

            newFilters.splice(matchIndex, 1);

            setAppliedFilters([...newFilters]);
        } else {            
            setAppliedFilters([...appliedFilters, filterOption]);
        }

    }

    function handleClearFilters() {
      setAppliedFilters([]);
    }

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const handleClick = () => {
      setOpen(true);
    };

    const handleAddToCart = () => {
      setOpen(true);
    }

    return (
       

        <Grid container className={classes.rootContainer}>                    
        <Grid container>
            <Grid item xs={12}  md={3}>
            <FiltersContainer onClearFilters={handleClearFilters} filters={appliedFilters} onFilterChange={handleFilterChange}></FiltersContainer>        
            </Grid>
            <Grid item xs={12}  md={9}>
            <ProductVisualizer onAddToCart={handleAddToCart} actions={actions} universoProductos={products} filters={appliedFilters}></ProductVisualizer>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
               <Link style={{textDecoration: 'none', color: 'white'}} to='/cart'> Product added to cart</Link>
            </Alert>
          </Snackbar>
            </Grid>
        </Grid>
      </Grid>
    )
}

ProductsContainerPage.propTypes = {
  actions: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired
}

const mapDispatchToActions = (dispatch) => {
  return {
    actions: {
      addToCart: bindActionCreators(addItemToCart, dispatch),
      loadProducts: bindActionCreators(getProducts, dispatch)
    }
  };
};

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps, mapDispatchToActions)(ProductsContainerPage)