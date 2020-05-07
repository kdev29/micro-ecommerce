import React from 'react'
import { TextField, Button } from '@material-ui/core'

export default function DeliveryAddressForm({onConfirmAddress}) {
    return (
        <div>
            <TextField label="Type your address"></TextField>
            <Button onClick={onConfirmAddress}>OK</Button>
        </div>
    )
}
