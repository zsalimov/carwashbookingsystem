import React from 'react'
import { Search } from '@mui/icons-material';
import './header.css'

export default function SearchBar() {
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
    }
    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults(users)

        const resultsArray = users.filter(u => u.title.includes(e.target.value) || u.body.includes(e.target.value))

        setSearchResults(resultsArray)
        console.log(resultsArray)
    }

    return (
        <div className="topbarCenter">            
                <form className= 'searchbar'onSubmit={handleSubmit}>
                <Search className='searchbarIcon' />
                <input type='search' className='searchInput' onChange={handleSearchChange} placeholder='Search' />
                </form>
            
        </div>
    )
}
