import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


export default function ShoppingCartItemsContainer({items, onRemoveItem}) {
    

    const total = items.length > 0 && items.reduce((acc, current) => {

        return {
            finalPrice: acc.finalPrice + current.finalPrice
        };
    });

    const handleRemoveFromCart = (e, item) => {
        onRemoveItem(item);
    }

    return (
        <>
       { items.length > 0 && (<div>
            

            <h1>Added items</h1>
            <ul>

            {items.map(item => (
                <li> {item.name} - ${item.finalPrice} <button onClick={(e) => handleRemoveFromCart(e, item)}>Remove</button></li>
            ))}
            </ul>
            <div>
                Total: ${total.finalPrice && total.finalPrice.toFixed(2)}
            </div>
        </div>)}

        {
            items.length == 0 && (
                <div>

                <h1>Your cart is empty :(</h1>
                <div>
                    <Link to='/'>

                    Click here to continue shopping
                    </Link>
                </div>
                </div>
            )
        }
        </>
        
    )
}

ShoppingCartItemsContainer.propTypes = {
    items: PropTypes.array.isRequired,
    onRemoveItem: PropTypes.func.isRequired
}
