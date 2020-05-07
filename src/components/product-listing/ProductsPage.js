import React from 'react';
import ProductsContainerPage from '../../components/ProductsContainerPage';
import withLayout from '../layout/WithLayout';


const ProductPageWrapper =  withLayout(ProductsContainerPage)  

export default function ProductsPage() {
  return (
    <ProductPageWrapper />        
  );
}