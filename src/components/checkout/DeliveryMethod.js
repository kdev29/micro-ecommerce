import React, {useState} from 'react'
import PropTypes from 'prop-types'
import PickupStore from './PickupStore'
import { Grid } from '@material-ui/core'
import DeliveryAddressForm from './DeliveryAddressForm'

const stores = [
    {id: 0, name: "Store 1", workingHours: "9AM - 9PM", address: "Dunsmuir St. #15, Vancouver, B.C.", mapsLocation:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2602.9262175360723!2d-123.12885708408622!3d49.27779527903744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673d467a4e355%3A0x149c9acfdb0bd88b!2s1188%20Howe%20St%2C%20Vancouver%2C%20BC%20V6Z%202S8%2C%20Canada!5e0!3m2!1sen!2smx!4v1588683562606!5m2!1sen!2smx"},
    {id: 1, name: "Store 2", workingHours: "10AM - 5PM", address: "Granville St. #10, Vancouver, B.C.", mapsLocation:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2602.636774587736!2d-123.11830888408605!3d49.28327947864896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54867178cb681717%3A0x29e11a32dcbe845d!2sGranville!5e0!3m2!1sen!2smx!4v1588684178995!5m2!1sen!2smx"},
    {id: 2, name: "Store 3", workingHours: "7AM - 7PM", address: "Howe St. #174, Vancouver, B.C.", mapsLocation:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2602.7188409097403!2d-123.11567768408622!3d49.28172457875924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb9df0be6adeff97b!2sVancouver%20Public%20Library%2C%20Central%20Library!5e0!3m2!1sen!2smx!4v1588684374062!5m2!1sen!2smx"}
]

const styles = {
    mapStyle : {
        width: "100%",
        height: "450px",
        border: "0",
        margin: '10px 0'
    },
    inlineDiv: {
        display: 'inlineBlock'
    }
}
 

export default function DeliveryMethod({deliveryMethod, onSelectDeliveryLocation}) {

    const [mapLocation, setmapLocation] = useState("");
    
    const handleViewMap = (store) => {
        setmapLocation(() => store.mapsLocation);
    };

    const handleSelectStore = (store) => {
        onSelectDeliveryLocation({ value: store, deliveryMethod});
    }

    return (        
        <Grid container>
            
            {deliveryMethod.id == 1 ? 
                    (stores.map(s => 
                         (<Grid item xs={4}>
                                <PickupStore 
                             onSelectStore={handleSelectStore} 
                             onViewMap={handleViewMap} 
                             store={s} 
                             key={s.id}>
                         </PickupStore>
                         </Grid>
                         ))  
                     ) 
                     : <DeliveryAddressForm onConfirmAddress={handleSelectStore}></DeliveryAddressForm> }
            
            <Grid container>
                <Grid item xs={3}></Grid>
                <Grid xs={6}>{ mapLocation !== "" &&
                 (<div style={styles.inlineDiv}>
                     <iframe allowFullScreen="" tabIndex="0" frameBorder="0" style={styles.mapStyle} src={mapLocation} 
                     ></iframe>
                 </div>)}</Grid>
                <Grid xs={3}></Grid>

           
            </Grid>
        </Grid>
    )
}

DeliveryMethod.propTypes = {
    deliveryMethod: PropTypes.object.isRequired
}
