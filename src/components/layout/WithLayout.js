import React from 'react'
import Header from './Header';
import Departments from './Departamentos';

const withLayout = (Component) =>  {

    const applyLayout = (props) => {
        return (
                    <>
                        <Header />
                        <Departments />
                        <Component {...props} />                 
                    </>
                )
    }

    return applyLayout;
    
}

export default withLayout;