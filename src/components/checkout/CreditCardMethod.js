import React from 'react'
import { TextField, Button } from '@material-ui/core'

export default function CreditCardMethod({children, onValidatePayment, ...props}) {
    return (
        <div>
            Type your credit card information:
            <TextField></TextField>
            <Button onClick={() => onValidatePayment({})}>Validate</Button>
        <div>
            {children}
        </div>
        </div>
    )
}
