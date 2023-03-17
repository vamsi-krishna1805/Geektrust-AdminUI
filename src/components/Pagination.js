import React, { useState, useEffect } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const Pagination = ({ pages, setCurrentPage }) => {

    const numberOfPages = [];
    for (let i = 1; i <= pages; i++) {
        numberOfPages.push(i);
    }

    const [currentButton, setCurrentButton] = useState(1);
    useEffect(() => {
        setCurrentPage(currentButton);
    }, [currentButton, setCurrentPage])

    return (
        <div>
            <ul className='pagination'>
                <li><a href='#!' className='page-link' onClick={() => setCurrentButton(1)}><KeyboardDoubleArrowLeftIcon fontSize="large" /></a></li>
                <li className={`${currentButton === 1 ? 'page-item disabled' : 'page-item'}`}><a href='#' className='page-link' onClick={() => setCurrentButton((prev) => prev == 1 ? prev : prev - 1)}><NavigateBeforeIcon fontSize="large" /></a></li>
                {numberOfPages.map((page, index) => (
                    <li key={index} className={`${currentButton === page ? 'page-item active' : 'page-item'}`}><a href='#' className='page-link' onClick={() => setCurrentButton(page)}>{page}</a></li>
                )

                )}
                <li className={`${currentButton === numberOfPages.length ? 'page-item disabled' : 'page-item'}`}><a href='#' className='page-link' onClick={() => setCurrentButton((next) => next == numberOfPages.length ? next : next + 1)}><NavigateNextIcon fontSize="large" /></a></li>
                <li><a href='#!' className='page-link' onClick={() => setCurrentButton(numberOfPages.length)}><KeyboardDoubleArrowRightIcon fontSize="large" /></a></li>
            </ul>
        </div>
    )
}

export default Pagination