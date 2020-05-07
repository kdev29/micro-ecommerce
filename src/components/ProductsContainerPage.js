import React, {useState} from 'react';
import { Grid, Snackbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';import Paper from '@material-ui/core/Paper';
import FiltersContainer from './product-listing/FiltersContainer';
import ProductVisualizer from './product-listing/ProductVisualizer';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addItemToCart } from '../redux/actions/shoppingCartActions';
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
function ProductsContainerPage({actions}) {

    const [appliedFilters, setAppliedFilters] = useState([]);
    const [open, setOpen] = React.useState(false);
 
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
        <Grid container>
          <Grid item xs={3}>         
            <FiltersContainer onClearFilters={handleClearFilters} filters={appliedFilters} onFilterChange={handleFilterChange}></FiltersContainer>        
          </Grid>
          {/* <Grid item xs={9}>

          <video class="a-blpPictureBrandThree__video hugo__video" width="100%" muted="" playsinline="playsinline" autoplay="" loop="" data-video="0">
                          <source src="https://assetspwa.liverpool.com.mx/assets/digital/landing/plp/vidojuegos_nintendo.mp4" type="video/mp4" />
              </video>
          </Grid> */}
          <ProductVisualizer onAddToCart={handleAddToCart} actions={actions} filters={appliedFilters}></ProductVisualizer>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
               <Link style={{textDecoration: 'none', color: 'white'}} to='/cart'> Product added to cart</Link>
            </Alert>
          </Snackbar>        
        </Grid>
    )
}

ProductsContainerPage.propTypes = {
  actions: PropTypes.func.isRequired
}

const mapDispatchToActions = (dispatch) => {
  return {
    actions: {
      addToCart: bindActionCreators(addItemToCart, dispatch)
    }
  };
};

export default connect(() => {}, mapDispatchToActions)(ProductsContainerPage)