import React from 'react'
import withLayout from '../layout/WithLayout';
import ShoppingCartComponent from './ShoppingCartComponent';

const ShoppingCartPageComponentWrapper = withLayout(ShoppingCartComponent)

export default function ShoppingCartPage(props) {
    return <ShoppingCartPageComponentWrapper />
}

