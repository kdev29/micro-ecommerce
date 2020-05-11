import React from 'react';
import ProductsContainerPage from '../../components/ProductsContainerPage';
import withLayout from '../layout/WithLayout';
import ProductsContainerPageResponsive from '../ProductsContainerPageResponsive';

const ProductPageWrapper =  withLayout(ProductsContainerPageResponsive)  

export default function ProductsPage() {
  return (
    <ProductPageWrapper />        
  );
}