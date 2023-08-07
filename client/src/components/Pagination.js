import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Pagination = ({totalPost, postPerPage, setCurrentPage, currentPage}) => {
    let pages = []

    for (let i = 1; i <= Math.ceil(totalPost/postPerPage); i++) {
        pages.push(i)
    }

  return (
    <div className='pagination'>
        {
          pages.map((page, index)=> {
              return <button className={page === currentPage ? 'active pagination-btn' : 'pagination-btn'} key={index} onClick={()=> setCurrentPage(page)}>{page}</button>
          })
        }
    </div>
  )
}

export default Pagination
