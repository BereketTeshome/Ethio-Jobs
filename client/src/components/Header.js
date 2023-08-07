import React from 'react' 
import { ToastContainer } from 'react-toastify'
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  return (
    <header className='header'>
      <form action="/search" method='GET'>
        <input type="search" name='searchTerm' placeholder='Press Enter to Search...'/>
        <button type='submit'><SearchIcon style={{position:'relative', top:'3.5px', left:'1px'}}/></button>
      </form>
      <ToastContainer />
    </header>
  )
}

export default Header
