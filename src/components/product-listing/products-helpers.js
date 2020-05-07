export function getElements(products, filters) {

    if(filters.length > 0) {

        //review which filter is inclusive or exclusive
        let orderedFilters = [];

        filters.forEach(innerFilter => {

            let filterType = filters.filter(f => innerFilter.type == f.type).length == 1 ? "exclusive" : "inclusive";

            orderedFilters.push({...innerFilter, filterType, executionOrder: filterType == "exclusive" ? 1 : 2 });
        })

        //order filters by filter type
        orderedFilters.sort((a, b) => {
     
            if (a.executionOrder > b.executionOrder) {
                return 1
              }
              if (a.executionOrder < b.executionOrder) {
                return -1;
              }              
              return 0;
        })

        let isFirstLoop = true;            
        let temporalFilter = [];
        let universe = [...products];
        let subUniverses = [];
        var currentFilterTypeSum = 0;

        orderedFilters.forEach(currentFilter => {

            currentFilterTypeSum = orderedFilters.filter(f => currentFilter.type == f.type).length;
            
            if(isFirstLoop) { //opera sobre universo       
                                
                if(currentFilter.filterType == "exclusive") {
                    universe = universe.filter(p => reducerAlgorithm[currentFilter.type](p, currentFilter.value));                     
                }
                else
                    temporalFilter = universe.filter(p => reducerAlgorithm[currentFilter.type](p, currentFilter.value)); 

            } else { //opera sobre filtro previo

                if(currentFilter.filterType == "exclusive") { //aunque no sea primer loop, los exclusivos generan nuevo universo
                    universe = universe.filter(p => reducerAlgorithm[currentFilter.type](p, currentFilter.value));                     
                }
                else
                    temporalFilter = universe.filter(p => reducerAlgorithm[currentFilter.type](p, currentFilter.value));   
            }

            if(temporalFilter.length > 0)
                subUniverses.push([...temporalFilter]);

            temporalFilter = [];
            isFirstLoop = false;
        });

        if(subUniverses.length > 0)
            return subUniverses.flat();
        else
            return universe;
    }
    else {
        return products;
    }
}


export function generateProducts(count) {
    
const itemsInBasket = [
    
];

for(let i = 1; i <= count; i++) {
    itemsInBasket.push(
    {   
        name: 'Product ' + i, 
        price: i * 120, 
        finalPrice: (i * 120) * .88, 
        brand: brands[Math.floor((Math.random() * 3))],
        genre:  genres[Math.floor((Math.random() * genres.length))],
        src: 'https://via.placeholder.com/150x200'
    }
  );
}
  return itemsInBasket;
}

const reducerAlgorithm = { 
    'BY_BRAND': (product, filterValue) => {
        return product.brand.includes(filterValue);
    },
    'BY_RANGE': (product, filterValue) => {
        const { min, max} = filterValue;

        return (parseInt(product.finalPrice) >= min && parseInt(product.finalPrice) <= max);        
    },
    'GENRE': (product, filterValue) => {
        return product.genre.includes(filterValue);
    },
}

export const BY_BRAND = 'BY_BRAND';
export const BY_RANGE = 'BY_RANGE';
export const GENRE = 'GENRE';
export const brands = ['Nintendo', 'Sony', 'Xbox'];
export const genres = ['Sports', 'Fighting', 'Adventures', 'Party', 'Racing', 'Shooter'];
