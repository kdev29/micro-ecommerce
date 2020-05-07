import React from 'react'

const styles = {
    width: '90%',
    height: '35px'
}

export default function SearchBox() {
    return (
        <div>
            <input style={styles} type='search' placeholder='Search an item' />
        </div>
    )
}
