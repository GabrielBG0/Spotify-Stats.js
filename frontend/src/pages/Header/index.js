import React, { useEffect } from 'react'
import { Navbar, NavItem, DropdownMenu, NavButton } from '../Navbar'
import { FiMenu, FiPlay, FiSkipForward, FiSkipBack, FiPause } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './index.css'

export default function Header() {

    return (
        <div>
            <Navbar className="header">
                <div className="title-and-search">
                    <Link to='/'>
                        <h1 className="header-title">Spotify Stats</h1>
                    </Link>
                </div>
                <div className="menu-butons">
                    <NavItem icon={<FiMenu />}>
                        <DropdownMenu />
                    </NavItem></div>

            </Navbar>
        </div>
    )
}