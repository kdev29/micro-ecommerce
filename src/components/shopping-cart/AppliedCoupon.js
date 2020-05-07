import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


export default function AppliedCoupon({coupon}) {
    return (
        <div>
            <div>
                Code: {coupon.couponCode}
            </div>
            <div>
                Type: {coupon.type}
            </div>
            <div>
                Discount: {coupon.value}
            </div>
            <div>
                <Button
                  variant="contained"
                  color="secondary"
                  size="SMALL"
                  // className={classes.button}
                  startIcon={<DeleteIcon />}
                  type='button'
                  
                >
                  REMOVE
              </Button>
            </div>
        </div>
    )
}

AppliedCoupon.propTypes = {
    coupon: PropTypes.object.isRequired
}