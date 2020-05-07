import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ShoppingCartSavedItems({savedItems, onAddItem}) {

    const [currentSavedItems, setCurrentSavedItems] = useState(savedItems);

    const handleAddToCart = (e, item) => {
        
        let newSavedItems = removeFromSaved(item);
        setCurrentSavedItems(newSavedItems);
        onAddItem(item);
    }

    const removeFromSaved =(item) => {
        
        const match = currentSavedItems.find(i => {
            return i.name == item.name;
        });

        var tempArray = [...currentSavedItems];

        tempArray.splice(currentSavedItems.indexOf(match), 1);

        return tempArray;
    }

    

    return (
        <div>
            
            { currentSavedItems.length > 0 && (
                <>
                <h1>Saved items</h1>
                <ul>
    
                {currentSavedItems.map(item => (
                    <li> {item.name} - ${item.finalPrice} <button onClick={(e) => handleAddToCart(e, item)}>Add to cart</button></li>
                ))}
                </ul>
                </>
            )}

        {
            currentSavedItems.length == 0 && (
                <div>

                <h1>Your don't have saved elements :(</h1>
                <div>
                    <Link to='/'>

                        Click here to go shopping
                    </Link>
                </div>
                </div>
            )
        }

            
        </div>
    )
}

ShoppingCartSavedItems.propTypes = {
    savedItems: PropTypes.array.isRequired,
    onAddItem: PropTypes.func.isRequired
}