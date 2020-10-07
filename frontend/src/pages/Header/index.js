import React from 'react'
import { Navbar, NavItem, DropdownMenu } from '../Navbar'
import { MdDetails, MdFastForward, MdFastRewind } from 'react-icons/md'
import './index.css'

export default function Header() {
    return (
        <div>
            <Navbar className="header">
                <div className="title-and-search"><h1 className="header-title">Spotify Stats</h1>
                    <form className="header-search">
                        {//<textarea></textarea>
                        }
                    </form></div>
                <div className="menu-butons"><NavItem icon={<MdFastRewind />} />
                    <NavItem icon={<MdFastForward />} />
                    <NavItem icon={<MdDetails />}>
                        <DropdownMenu>

                        </DropdownMenu>
                    </NavItem></div>

            </Navbar>
        </div>
    )
}