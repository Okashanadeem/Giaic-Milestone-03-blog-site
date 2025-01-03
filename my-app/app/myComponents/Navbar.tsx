'use client'
import React, { useState } from 'react'
import { MobileNavbar} from './MobileNav'
import DesktopNavbar from './DesktopNavbar';

const Navbar = () => {
    return (
        <div>
            {/* Nvabar  */}
        <div>
            {/* mobile nav  */}
            <div className='md:hidden flex justify-end m-3'>
                <MobileNavbar/>
            </div>
            {/* Desktop Nav  */}
            <div className='hidden md:block'>
            <DesktopNavbar/>
            </div>
        </div>
        
        </div>
    )
}

export default Navbar