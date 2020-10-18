import React from 'react'
import { Navbar, NavItem, DropdownMenu, NavButtonNP, NavButtonPlay } from '../Navbar'
import { FiMenu } from 'react-icons/fi'
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
                    <NavButtonNP next={false} />
                    <NavButtonPlay />
                    <NavButtonNP next={true} />
                    <NavItem icon={<FiMenu />}>
                        <DropdownMenu />
                    </NavItem></div>

            </Navbar>
        </div>
    )
}