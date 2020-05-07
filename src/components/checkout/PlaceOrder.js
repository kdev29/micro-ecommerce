import React, {useEffect} from 'react'
import { Paper, makeStyles } from '@material-ui/core'
import { connect } from 'react-redux';
import { clearShoppingCart } from '../../redux/actions/shoppingCartActions'
import { bindActionCreators } from 'redux';

const useStyles = makeStyles({root: {
    backgroundColor: '#c0e8ff',
    maxWidth: '50%',
    margin: '0 auto',
    padding: '20px 0',
    textAlign: 'center',
    fontSize: '2em',
    color: 'black',
}})

function PlaceOrder({actions}) {
    const classes = useStyles();

    useEffect(() => {
        actions.clearShoppingCart()
    });

    return (
        <div>
            <h1>Your order has been placed</h1>
            <Paper className={classes.root}>Order ID: #151515156156</Paper>            
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            clearShoppingCart:  bindActionCreators(clearShoppingCart, dispatch)
        }
    }
}

export default connect(() => {}, mapDispatchToProps)(PlaceOrder);
