import React, {useState} from 'react'
import { Button } from '@material-ui/core'
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PropTypes from 'prop-types';
import * as paymentMethods from './paymentMethods';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import StoreIcon from '@material-ui/icons/Store';
import CreditCardMethod from './CreditCardMethod';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

  const deliveryMethods = [
      {id: 0, name:'Address', label: 'CONTINUE TO ADDRESS DETAILS', icon: HomeWorkIcon },
      {id: 1, name:'PickUp', label: 'IN-STORE PICK UP', icon: StoreIcon },
  ]



function renderPaymentMethodDetails(paymentMethod, classes, renderDeliveryMethods, isPaymentValid, validatePaymentMethod) {

    switch(paymentMethod.name) {
        case paymentMethods.CASH: 
            return (
                <>
                <form>
                    <h2>You will pay with Cash</h2>
                    {
                        renderDeliveryMethods(true)
                    }
                </form>
                </>
                )
            break;
        case paymentMethods.GIFT_CARD: 
            return (
                <>
                <form>
                    <h2>You will pay with Gift Card</h2>
                    
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="input-with-icon-adornment">Gift card number (12 digits)</InputLabel>
                        <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                        />
                    </FormControl>      
                    <Button onClick={() => validatePaymentMethod({paymentMethod, value: "test"})} 
                            startIcon={<SearchIcon />} 
                            variant="contained" 
                            label="CONTINUE TO ADDRESS DETAILS">VALIDATE</Button> 
                    <div>
                        
                    {
                        renderDeliveryMethods(isPaymentValid)
                    }
                        </div>            
                </form>
                </>
                )
            break;
            case paymentMethods.CREDIT_CARD: 
                 return (<CreditCardMethod onValidatePayment={validatePaymentMethod}>{renderDeliveryMethods(isPaymentValid)}</CreditCardMethod>)
            break;
        default:
            return (<div>This payment method is not supported yet :(</div>)
            break;
    }
  
}

export default function PaymentMethodDetails({paymentMethod, onDeliveryMethodSelected}) {

    const classes = useStyles();
    const [isPaymentValid, setIsPaymentValid] = useState(false);

    function validatePaymentMethod(method) {
        setIsPaymentValid(true);
    }

    const renderDeliveryMethods = (isPaymentMethodValid) => {
        if(isPaymentMethodValid)
            return (deliveryMethods.map(d => (
                <div style={{margin: '10px 0'}}>
                    <Button onClick={(e) => onDeliveryMethodSelected(e, d)} key={d.id} startIcon={<d.icon />} variant="contained">{d.label}</Button>
                </div>
            )));
    }
    
    return (
        <div>
            {paymentMethod && renderPaymentMethodDetails(paymentMethod, classes, renderDeliveryMethods, isPaymentValid, validatePaymentMethod)}
        </div>
    )
}

PaymentMethodDetails.propTypes = {
    paymentMethod: PropTypes.object.isRequired,
    onDeliveryMethodSelected: PropTypes.func.isRequired
}
