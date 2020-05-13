import React, {useState} from 'react'
import { Grid, Hidden, Drawer, Button } from '@material-ui/core';
import PriceRangeSlider from './PriceRangeFilter';
import AppliedFilters from './AppliedFilters';
import Subcategories from './filters/Subcategories';
import FilterByBrand from './filters/FilterByBrand';
import PropTypes from 'prop-types';
import FilterListIcon from '@material-ui/icons/FilterList';

export default function FiltersContainer({onFilterChange, filters, onClearFilters}) {

    const handleRemoveFilter = (filter) => {
        onFilterChange(filter);
    }

    const [showDrawer, setshowDrawer] = useState(false);

    
    return (       
        <Grid container> 
            <Hidden mdUp>
                <Grid container >

                    <Grid container justify="center">

                        <Button startIcon={<FilterListIcon />} color="primary" onClick={() => { setshowDrawer(true) }}>Show Filters</Button>
                    </Grid>
                    <Drawer  anchor={"top"} open={showDrawer} onClose={() => { setshowDrawer(false) }}>
                        <Grid container style={{padding: '24px'}}> 
                        <Button color="primary" onClick={() => { setshowDrawer(false) }}>{"<" + " BACK"}</Button>
                        <AppliedFilters onClearFilters={onClearFilters} onRemoveFilter={handleRemoveFilter} filters={filters}></AppliedFilters>
                        <FilterByBrand  filters={filters} onFilterChange={onFilterChange}></FilterByBrand>             
                        <PriceRangeSlider onFilterChange={onFilterChange}></PriceRangeSlider>                         
                        <Subcategories  filters={filters} onFilterChange={onFilterChange}></Subcategories>         
                        </Grid>
                    </Drawer>
                </Grid>
             </Hidden>
        <Hidden smDown>
     
        <Grid style={{padding: '8px'}} container>

            <AppliedFilters onClearFilters={onClearFilters} onRemoveFilter={handleRemoveFilter} filters={filters}></AppliedFilters>
            <FilterByBrand  filters={filters} onFilterChange={onFilterChange}></FilterByBrand>             
            <PriceRangeSlider onFilterChange={onFilterChange}></PriceRangeSlider>                         
            <Subcategories  filters={filters} onFilterChange={onFilterChange}></Subcategories>         
        </Grid>
       
        </Hidden>
            
      
        </Grid>
    )
}

FiltersContainer.propTypes = {
    onFilterChange: PropTypes.func.isRequired
}

