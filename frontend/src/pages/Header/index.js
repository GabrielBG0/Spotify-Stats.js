import React from 'react'
import { Navbar, NavItem, DropdownMenu } from '../Navbar'
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
                    <form className="header-search">
                        {//<textarea></textarea>
                        }
                    </form></div>
                <div className="menu-butons">
                    <NavItem icon={<FiMenu />}>
                        <DropdownMenu>

                        </DropdownMenu>
                    </NavItem></div>

            </Navbar>
        </div>
    )
}