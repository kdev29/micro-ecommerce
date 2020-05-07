import React from 'react'
import { Grid } from '@material-ui/core';
import PriceRangeSlider from './PriceRangeFilter';
import AppliedFilters from './AppliedFilters';
import Subcategories from './filters/Subcategories';
import FilterByBrand from './filters/FilterByBrand';
import PropTypes from 'prop-types';

export default function FiltersContainer({onFilterChange, filters, onClearFilters}) {

    const handleRemoveFilter = (filter) => {
        onFilterChange(filter);
    }
    
    return (       
        <Grid container>
            <AppliedFilters onClearFilters={onClearFilters} onRemoveFilter={handleRemoveFilter} filters={filters}></AppliedFilters>
            <FilterByBrand  filters={filters} onFilterChange={onFilterChange}></FilterByBrand>             
            <PriceRangeSlider onFilterChange={onFilterChange}></PriceRangeSlider>                         
            <Subcategories  filters={filters} onFilterChange={onFilterChange}></Subcategories>         
        </Grid>
    )
}

FiltersContainer.propTypes = {
    onFilterChange: PropTypes.func.isRequired
}

