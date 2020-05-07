import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import CreditCardIcon from '@material-ui/icons/CreditCard';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';


const useStyles = makeStyles({
    creditCard: {
        backgroundColor: 'purple',
        color: 'white'
    },
    cash: {
        backgroundColor: 'green',
        color: 'white'
    },
    giftCard: {
        backgroundColor: 'red',
        color: 'white'
    },
    general: {
        margin: '10px '
    }
});

const paymentMethods = [
    { id: 0, name: 'CREDIT CARD', icon: CreditCardIcon, cssClass: 'creditCard' },
    { id: 1, name: 'GIFT CARD', icon: CardGiftcardIcon, cssClass: 'giftCard' },
    { id: 2, name: 'CASH', icon: LocalAtmIcon, cssClass: 'cash' },
];


export default function SelectPaymentMethod({onMethodSelected}) {

    const classes = useStyles();

    return (
        <div>
            Select your payment method:
            <div>

                {
                    paymentMethods.map(p => (
                        
                        <Button className={[classes[p.cssClass],classes.general].join(" ")} 
                                onClick={(e) => onMethodSelected(e, p)}
                                variant="contained" 
                                size="large" 
                                key={p.id}
                                color="primary" 
                                startIcon={<p.icon />}>
                            {p.name}
                        </Button>
                    ))
                }
            </div>
        </div>
    )
}
