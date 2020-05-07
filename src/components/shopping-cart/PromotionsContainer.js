import React, { useState } from 'react'
import { TextField, Paper, makeStyles, Button } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import PropTypes from 'prop-types';
import AppliedCoupon from './AppliedCoupon';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';




const styles = makeStyles((theme) => ({
    root: {
        maxWidth: '250px', padding: '5%'
    },
    button: {
        margin: '10px 0'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
}));

export default function PromotionsContainer({onApplyCoupon, couponValidation, appliedCoupons }) {

    const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

    const classes = styles();

    const [coupon, setCoupon] = useState({couponCode: ''});


    const handleCouponChange = (e) => {

        setCoupon({couponCode: e.target.value});

    }

    const handleApply = (coupon) => {
        
        setOpen(true);
        setTimeout(() => {
            
            onApplyCoupon(coupon);
            setOpen(false);
        },1500);
    }

    return (

        <div>

            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
    
            <Paper className={classes.root}>
                {appliedCoupons.length == 0 &&
                    (<>
                        Here you can apply your coupons:

                        <form>
                            <TextField value={coupon.couponCode} label='Coupon' onChange={handleCouponChange}></TextField>
                            <Button disabled={coupon.couponCode == ''} onClick={() => handleApply(coupon)} className={classes.button} type='button' variant="contained" color="primary">Apply</Button>
                            {
                                couponValidation && (
                                    <div>
                                    {
                                    couponValidation.isValid ? 
                                        (<CheckCircleIcon style={{color: 'green'}}></CheckCircleIcon>) 
                                        : (<ErrorIcon style={{color: 'red'}}></ErrorIcon>)
                                    }
                                    <span>{couponValidation.message}</span>
                                    </div>
                                )
                            }
                        </form>
                        </>)}
                            <>
                            {                                
                                appliedCoupons.length > 0 && (
                                    <div>
                                        <h2>Applied coupons</h2> 
                                        {appliedCoupons.map(c => (<AppliedCoupon coupon={c}></AppliedCoupon>))}
                                    </div>
                                )
                            }
                            </>
            </Paper>
        </div>
    )
}
 
PromotionsContainer.propTypes = {
    onApplyCoupon:  PropTypes.func.isRequired,
    couponValidation: PropTypes.object,
    appliedCoupons: PropTypes.array
}